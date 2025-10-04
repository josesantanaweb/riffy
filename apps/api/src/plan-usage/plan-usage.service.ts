import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanUsageInput } from './inputs/create-plan-usage.input';
import { PlanUsage } from './entities/plan-usage.entity';
import { PlanUsageStatus } from '@prisma/client';

@Injectable()
export class PlanUsageService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo registro de uso de plan para un usuario.
   * Verifica que el usuario y plan existan, y que no exista ya un registro de uso.
   * @param data Datos del nuevo registro de uso de plan
   * @throws BadRequestException si el usuario ya tiene un registro de uso
   * @throws BadRequestException si el usuario o plan no existen
   * @returns El registro de PlanUsage creado
   */
  async create(data: CreatePlanUsageInput): Promise<PlanUsage> {
    const existingUsage = await this.prisma.planUsage.findUnique({
      where: { ownerId: data.ownerId },
    });

    if (existingUsage) {
      throw new BadRequestException(
        'El usuario ya tiene un registro de uso de plan',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: data.ownerId },
      include: { plan: true },
    });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (!user.plan) {
      throw new BadRequestException('El usuario no tiene un plan asignado');
    }

    const planUsage = await this.prisma.planUsage.create({
      data: {
        ownerId: data.ownerId,
        planId: data.planId,
        currentRaffles: data.currentRaffles,
        currentTickets: data.currentTickets || 0,
        status: PlanUsageStatus.ACTIVE, // Status inicial siempre ACTIVE
      },
      include: {
        owner: true,
        plan: true,
      },
    });

    const newStatus = this.calculatePlanUsageStatus(planUsage);
    if (newStatus !== planUsage.status) {
      return this.prisma.planUsage.update({
        where: { id: planUsage.id },
        data: { status: newStatus },
        include: {
          owner: true,
          plan: true,
        },
      });
    }

    return planUsage;
  }

  /**
   * Busca el registro de uso de plan de un usuario específico.
   * @param userId ID del usuario del cual obtener el uso de plan
   * @returns El registro de PlanUsage del usuario o null si no existe
   */
  async findByUserId(userId: string): Promise<PlanUsage | null> {
    return await this.prisma.planUsage.findUnique({
      where: { ownerId: userId },
      include: {
        owner: true,
        plan: true,
      },
    });
  }

  /**
   * Valida si un usuario puede crear una nueva rifa según los límites de su plan.
   * Crea automáticamente un registro de uso si no existe.
   * @param userId ID del usuario a validar
   * @returns Objeto con resultado de validación y mensaje opcional
   */
  async canCreateRaffle(
    userId: string,
  ): Promise<{ canCreate: boolean; message?: string }> {
    const usage = await this.findByUserId(userId);

    if (!usage) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { plan: true },
      });

      if (!user?.plan) {
        return {
          canCreate: false,
          message: 'El usuario no tiene un plan asignado',
        };
      }

      await this.create({
        ownerId: userId,
        planId: user.plan.id,
        currentRaffles: 0,
        currentTickets: 0,
      });

      return { canCreate: true };
    }

    if (usage.plan.maxRaffles === null || usage.plan.maxRaffles === 0) {
      return { canCreate: true };
    }

    if (usage.currentRaffles >= usage.plan.maxRaffles) {
      return {
        canCreate: false,
        message: `Has alcanzado el límite de ${usage.plan.maxRaffles} rifas de tu plan ${usage.plan.name}. Actualiza tu plan para crear más rifas.`,
      };
    }

    return { canCreate: true };
  }

  /**
   * Valida si un usuario puede crear la cantidad solicitada de tickets según los límites de su plan.
   * @param userId ID del usuario a validar
   * @param requestedTickets Cantidad de tickets que se desea crear
   * @returns Objeto con resultado de validación y mensaje opcional
   */
  async canCreateTickets(
    userId: string,
    requestedTickets: number,
  ): Promise<{ canCreate: boolean; message?: string }> {
    const usage = await this.findByUserId(userId);

    if (!usage) {
      return {
        canCreate: false,
        message: 'No se encontró información de uso del plan',
      };
    }

    if (usage.plan.maxTickets === null || usage.plan.maxTickets === 0) {
      return { canCreate: true };
    }

    const newTotal = usage.currentTickets + requestedTickets;
    if (newTotal > usage.plan.maxTickets) {
      const available = usage.plan.maxTickets - usage.currentTickets;
      return {
        canCreate: false,
        message: `Solo puedes crear ${available} tickets más con tu plan actual. Has usado ${usage.currentTickets}/${usage.plan.maxTickets} tickets.`,
      };
    }

    return { canCreate: true };
  }

  /**
   * Incrementa el contador de rifas creadas por el usuario y actualiza el status.
   * @param userId ID del usuario
   */
  async incrementRaffles(userId: string): Promise<void> {
    await this.prisma.planUsage.update({
      where: { ownerId: userId },
      data: {
        currentRaffles: {
          increment: 1,
        },
      },
    });
    await this.updatePlanUsageStatus(userId);
  }

  /**
   * Incrementa el contador de tickets creados por el usuario y actualiza el status.
   * @param userId ID del usuario
   * @param amount Cantidad de tickets a incrementar
   */
  async incrementTickets(userId: string, amount: number): Promise<void> {
    await this.prisma.planUsage.update({
      where: { ownerId: userId },
      data: {
        currentTickets: {
          increment: amount,
        },
      },
    });

    await this.updatePlanUsageStatus(userId);
  }

  /**
   * Valida límites de rifas e incrementa el contador automáticamente.
   * Método combinado para usar en servicios que crean rifas.
   * @param userId ID del usuario
   * @throws BadRequestException si el usuario ha alcanzado el límite de rifas
   */
  async validateAndIncrementRaffles(userId: string): Promise<void> {
    const validation = await this.canCreateRaffle(userId);

    if (!validation.canCreate) {
      throw new BadRequestException(validation.message);
    }

    await this.incrementRaffles(userId);
  }

  /**
   * Valida límites de tickets e incrementa el contador automáticamente.
   * Método combinado para usar en servicios que crean tickets.
   * @param userId ID del usuario
   * @param amount Cantidad de tickets a crear
   * @throws BadRequestException si el usuario excedería el límite de tickets
   */
  async validateAndIncrementTickets(
    userId: string,
    amount: number,
  ): Promise<void> {
    const validation = await this.canCreateTickets(userId, amount);

    if (!validation.canCreate) {
      throw new BadRequestException(validation.message);
    }

    await this.incrementTickets(userId, amount);
  }

  /**
   * Resetea los contadores de uso de un usuario (útil para renovaciones de plan).
   * Si no existe un registro de uso, crea uno nuevo con contadores en 0.
   * @param userId ID del usuario
   * @throws BadRequestException si el usuario no tiene un plan asignado
   * @returns El registro de PlanUsage actualizado o creado
   */
  async resetUsage(userId: string): Promise<PlanUsage> {
    const existingUsage = await this.prisma.planUsage.findUnique({
      where: { ownerId: userId },
      include: { owner: { include: { plan: true } }, plan: true },
    });

    if (existingUsage) {
      const updatedUsage = await this.prisma.planUsage.update({
        where: { ownerId: userId },
        data: {
          currentRaffles: 0,
          currentTickets: 0,
          status: PlanUsageStatus.ACTIVE,
        },
        include: {
          owner: true,
          plan: true,
        },
      });

      const newStatus = this.calculatePlanUsageStatus(updatedUsage);
      if (newStatus !== updatedUsage.status) {
        return this.prisma.planUsage.update({
          where: { ownerId: userId },
          data: { status: newStatus },
          include: {
            owner: true,
            plan: true,
          },
        });
      }

      return updatedUsage;
    } else {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { plan: true },
      });

      if (!user?.plan) {
        throw new BadRequestException('El usuario no tiene un plan asignado');
      }

      const newUsage = await this.prisma.planUsage.create({
        data: {
          ownerId: userId,
          planId: user.plan.id,
          currentRaffles: 0,
          currentTickets: 0,
          status: PlanUsageStatus.ACTIVE, // Status inicial
        },
        include: {
          owner: true,
          plan: true,
        },
      });

      const newStatus = this.calculatePlanUsageStatus(newUsage);
      if (newStatus !== newUsage.status) {
        return this.prisma.planUsage.update({
          where: { id: newUsage.id },
          data: { status: newStatus },
          include: {
            owner: true,
            plan: true,
          },
        });
      }

      return newUsage;
    }
  }

  /**
   * Actualiza manualmente el status del plan usage de un usuario.
   * Útil para sincronizar el status cuando cambia el plan del usuario.
   * @param userId ID del usuario
   * @returns PlanUsage actualizado
   */
  async updateStatus(userId: string): Promise<PlanUsage> {
    return this.updatePlanUsageStatus(userId);
  }

  /**
   * Calcula el status del plan usage basado en los límites del plan
   * @param planUsage Registro de plan usage con plan incluido
   * @returns PlanUsageStatus calculado
   */
  private calculatePlanUsageStatus(planUsage: PlanUsage): PlanUsageStatus {
    const { plan, currentRaffles, currentTickets } = planUsage;

    if (
      plan?.type === 'PREMIUM' ||
      (plan?.maxRaffles === null && plan?.maxTickets === null)
    ) {
      return PlanUsageStatus.UNLIMITED;
    }

    const isRafflesExhausted =
      plan?.maxRaffles && currentRaffles >= plan.maxRaffles;
    const isTicketsExhausted =
      plan?.maxTickets && currentTickets >= plan.maxTickets;

    if (isRafflesExhausted || isTicketsExhausted) {
      return PlanUsageStatus.EXHAUSTED;
    }

    return PlanUsageStatus.ACTIVE;
  }

  /**
   * Actualiza el status del plan usage basado en los límites actuales
   * @param userId ID del usuario
   * @returns PlanUsage actualizado
   */
  private async updatePlanUsageStatus(userId: string): Promise<PlanUsage> {
    const planUsage = await this.prisma.planUsage.findUnique({
      where: { ownerId: userId },
      include: { plan: true },
    });

    if (!planUsage) {
      throw new BadRequestException('Plan usage no encontrado');
    }

    const newStatus = this.calculatePlanUsageStatus(planUsage);

    return this.prisma.planUsage.update({
      where: { ownerId: userId },
      data: { status: newStatus },
      include: { plan: true, owner: true },
    });
  }
}
