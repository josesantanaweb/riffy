import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { Role, TicketStatus } from '@prisma/client';
import { User } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private subscriptionsService: SubscriptionsService,
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
        subscription: {
          include: {
            plan: true,
          },
        },
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
        subscription: {
          include: {
            plan: true,
          },
        },
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
    const user = await this.prisma.user.findUnique({
      where: {
        domain,
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
   * También crea automáticamente una suscripción con el plan básico.
   * @param data Datos del nuevo usuario
   * @returns El usuario creado
   */
  async create(data: CreateUserInput): Promise<User> {
    const { password, ...user } = data;
    const hashedPassword = await hash(password);

    return await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          password: hashedPassword,
          ...user,
        },
      });

      const basicPlan = await tx.plan.findFirst({
        where: {
          type: 'BASIC',
        },
      });

      if (basicPlan) {
        await tx.subscription.create({
          data: {
            ownerId: newUser.id,
            planId: basicPlan.id,
            status: 'ACTIVE',
          },
        });
      }

      return newUser;
    });
  }

  /**
   * Actualiza los datos de un usuario existente.
   * Si se proporciona planId, también actualiza la suscripción del usuario.
   * @param id ID del usuario a actualizar
   * @param data Datos nuevos para el usuario
   * @returns El usuario actualizado
   */
  async update(id: string, data: UpdateUserInput): Promise<User> {
    const { planId, password, ...userData } = data;

    if (planId) {
      return await this.prisma.$transaction(async (tx) => {
        const updatedUser = await tx.user.update({
          where: { id },
          data: userData,
        });

        if (password) {
          const hashedPassword = await hash(password);
          await tx.user.update({
            where: { id },
            data: { password: hashedPassword },
          });
        }

        const existingSubscription = await tx.subscription.findUnique({
          where: { ownerId: id },
        });

        if (existingSubscription) {
          await tx.subscription.update({
            where: { ownerId: id },
            data: { planId },
          });
        } else {
          await tx.subscription.create({
            data: {
              ownerId: id,
              planId,
              status: 'ACTIVE',
            },
          });
        }

        return updatedUser;
      });
    }

    const updateData: Partial<CreateUserInput> = { ...userData };

    if (password) {
      updateData.password = await hash(password);
    }

    return await this.prisma.user.update({
      where: { id },
      data: updateData,
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
