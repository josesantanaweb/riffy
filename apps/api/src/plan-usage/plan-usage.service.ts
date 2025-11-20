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
        currentBingos: data.currentBingos,
        currentBoards: data.currentBoards || 0,
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
   * Valida si un usuario puede crear un nuevo bingo según los límites de su plan.
   * Crea automáticamente un registro de uso si no existe.
   * @param userId ID del usuario a validar
   * @returns Objeto con resultado de validación y mensaje opcional
   */
  async canCreateBingo(
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
        currentBingos: 0,
        currentBoards: 0,
      });

      return { canCreate: true };
    }

    if (usage.plan.maxBingos === null || usage.plan.maxBingos === 0) {
      return { canCreate: true };
    }

    if (usage.currentBingos >= usage.plan.maxBingos) {
      return {
        canCreate: false,
        message: `Has alcanzado el límite de ${usage.plan.maxBingos} bingos de tu plan ${usage.plan.name}. Actualiza tu plan para crear más bingos.`,
      };
    }

    return { canCreate: true };
  }

  /**
   * Valida si un usuario puede crear la cantidad solicitada de boards según los límites de su plan.
   * @param userId ID del usuario a validar
   * @param requestedBoards Cantidad de boards que se desea crear
   * @returns Objeto con resultado de validación y mensaje opcional
   */
  async canCreateBoards(
    userId: string,
    requestedBoards: number,
  ): Promise<{ canCreate: boolean; message?: string }> {
    const usage = await this.findByUserId(userId);

    if (!usage) {
      return {
        canCreate: false,
        message: 'No se encontró información de uso del plan',
      };
    }

    if (usage.plan.maxBoards === null || usage.plan.maxBoards === 0) {
      return { canCreate: true };
    }

    const newTotal = usage.currentBoards + requestedBoards;
    if (newTotal > usage.plan.maxBoards) {
      const available = usage.plan.maxBoards - usage.currentBoards;
      return {
        canCreate: false,
        message: `Solo puedes crear ${available} boards más con tu plan actual. Has usado ${usage.currentBoards}/${usage.plan.maxBoards} boards.`,
      };
    }

    return { canCreate: true };
  }

  /**
   * Incrementa el contador de bingos creados por el usuario y actualiza el status.
   * @param userId ID del usuario
   */
  async incrementBingos(userId: string): Promise<void> {
    await this.prisma.planUsage.update({
      where: { ownerId: userId },
      data: {
        currentBingos: {
          increment: 1,
        },
      },
    });
    await this.updatePlanUsageStatus(userId);
  }

  /**
   * Incrementa el contador de boards creados por el usuario y actualiza el status.
   * @param userId ID del usuario
   * @param amount Cantidad de boards a incrementar
   */
  async incrementBoards(userId: string, amount: number): Promise<void> {
    await this.prisma.planUsage.update({
      where: { ownerId: userId },
      data: {
        currentBoards: {
          increment: amount,
        },
      },
    });

    await this.updatePlanUsageStatus(userId);
  }

  /**
   * Valida límites de bingos e incrementa el contador automáticamente.
   * Método combinado para usar en servicios que crean bingos.
   * @param userId ID del usuario
   * @throws BadRequestException si el usuario ha alcanzado el límite de bingos
   */
  async validateAndIncrementBingos(userId: string): Promise<void> {
    const validation = await this.canCreateBingo(userId);

    if (!validation.canCreate) {
      throw new BadRequestException(validation.message);
    }

    await this.incrementBingos(userId);
  }

  /**
   * Valida límites de boards e incrementa el contador automáticamente.
   * Método combinado para usar en servicios que crean boards.
   * @param userId ID del usuario
   * @param amount Cantidad de boards a crear
   * @throws BadRequestException si el usuario excedería el límite de boards
   */
  async validateAndIncrementBoards(
    userId: string,
    amount: number,
  ): Promise<void> {
    const validation = await this.canCreateBoards(userId, amount);

    if (!validation.canCreate) {
      throw new BadRequestException(validation.message);
    }

    await this.incrementBoards(userId, amount);
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
          currentBingos: 0,
          currentBoards: 0,
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
          currentBingos: 0,
          currentBoards: 0,
          status: PlanUsageStatus.ACTIVE,
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
    const { plan, currentBingos, currentBoards } = planUsage;

    if (
      plan?.type === 'PREMIUM' ||
      (plan?.maxBingos === null && plan?.maxBoards === null)
    ) {
      return PlanUsageStatus.UNLIMITED;
    }

    const isBingosExhausted =
      plan?.maxBingos && currentBingos >= plan.maxBingos;
    const isBoardsExhausted =
      plan?.maxBoards && currentBoards >= plan.maxBoards;

    if (isBingosExhausted || isBoardsExhausted) {
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
