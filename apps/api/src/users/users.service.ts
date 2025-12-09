import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, TicketStatus, PlanUsageStatus } from '@prisma/client';
import { User } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { hash } from 'argon2';
import { PlanUsageService } from '../plan-usage/plan-usage.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private planUsageService: PlanUsageService,
  ) {}

  /**
   * Obtiene todos los usuarios registrados en la base de datos, o filtra por rol si se especifica.
   * @param role (Opcional) Rol de usuario para filtrar (ej: 'ADMIN', 'OWNER')
   * @returns Arreglo de usuarios filtrados por rol o todos si no se especifica
   */
  async findAll(role?: Role): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: role ? { role } : {},
      include: {
        plan: true,
        planUsage: true,
      },
    });
  }

  /**
   * Busca un usuario por su ID.
   * @param id ID del usuario a buscar
   * @throws NotFoundException si el usuario no existe
   * @returns El usuario encontrado
   */
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        plan: true,
        planUsage: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  /**
   * Busca un usuario por su dominio.
   * @param domain Dominio del usuario a buscar
   * @throws NotFoundException si el usuario no existe
   * @returns El usuario encontrado con sus rifas
   */
  async findOneByDomain(domain: string): Promise<User> {
    const normalizedDomain = domain.toLowerCase().trim();

    const user = await this.prisma.user.findFirst({
      where: {
        domain: {
          equals: normalizedDomain,
        },
      },
      include: {
        raffles: {
          where: {
            status: {
              not: 'PENDING',
            },
          },
          include: {
            tickets: true,
          },
        },
        paymentMethods: true,
        planUsage: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with domain ${domain} not found`);
    }

    const rafflesWithStats = user.raffles.map((raffle) => {
      const totalTickets = raffle.tickets.length;
      const sold = raffle.tickets.filter(
        (t) => t.status === TicketStatus.SOLD,
      ).length;
      const available = raffle.tickets.filter(
        (t) => t.status === TicketStatus.AVAILABLE,
      ).length;
      const progress = totalTickets > 0 ? (sold / totalTickets) * 100 : 0;

      return {
        ...raffle,
        sold,
        available,
        progress: Number(progress.toFixed(2)),
      };
    });

    return {
      ...user,
      raffles: rafflesWithStats,
    };
  }

  /**
   * Busca un usuario por su email.
   * @param email Email del usuario a buscar
   * @returns El usuario encontrado o null si no existe
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * Crea un nuevo usuario.
   * También asigna automáticamente el plan básico al usuario.
   * @param data Datos del nuevo usuario
   * @returns El usuario creado
   */
  async create(data: CreateUserInput): Promise<User> {
    const { password, planId, ...user } = data;
    const hashedPassword = await hash(password);

    return await this.prisma.$transaction(async (tx) => {
      let finalPlanId = planId;

      if (!finalPlanId) {
        const basicPlan = await tx.plan.findFirst({
          where: {
            type: 'BASIC',
          },
        });
        finalPlanId = basicPlan?.id;
      }

      const newUser = await tx.user.create({
        data: {
          password: hashedPassword,
          ...user,
          planId: finalPlanId,
        },
      });

      if (finalPlanId) {
        await tx.planUsage.create({
          data: {
            ownerId: newUser.id,
            planId: finalPlanId,
            currentRaffles: 0,
            currentTickets: 0,
            status: PlanUsageStatus.ACTIVE,
          },
        });
      }

      return newUser;
    });
  }

  /**
   * Actualiza los datos de un usuario existente.
   * @param id ID del usuario a actualizar
   * @param data Datos nuevos para el usuario
   * @returns El usuario actualizado
   */
  async update(id: string, data: UpdateUserInput): Promise<User> {
    const { password, ...userData } = data;
    const updateData: Partial<CreateUserInput> = { ...userData };

    if (password) {
      updateData.password = await hash(password);
    }

    return await this.prisma.$transaction(async (tx) => {
      const currentUser = await tx.user.findUnique({
        where: { id },
        select: { planId: true },
      });

      const updatedUser = await tx.user.update({
        where: { id },
        data: updateData,
      });

      if (userData.planId && userData.planId !== currentUser?.planId) {
        const existingUsage = await tx.planUsage.findUnique({
          where: { ownerId: id },
        });

        if (existingUsage) {
          await tx.planUsage.update({
            where: { ownerId: id },
            data: {
              planId: userData.planId,
            },
          });
        } else {
          await tx.planUsage.create({
            data: {
              ownerId: id,
              planId: userData.planId,
              currentRaffles: 0,
              currentTickets: 0,
              status: PlanUsageStatus.ACTIVE,
            },
          });
        }

        setImmediate((): void => {
          void (async (): Promise<void> => {
            try {
              await this.planUsageService.updateStatus(id);
            } catch {
              // console.error('Error updating plan usage status:', error);
            }
          })();
        });
      }

      return updatedUser;
    });
  }

  /**
   * Elimina los datos de un usuario existente.
   * @param id ID del usuario a eliminar
   * @returns El usuario eliminado
   */
  async delete(id: string): Promise<User> {
    const user = await this.findOne(id);
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
