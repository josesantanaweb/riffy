import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Plan } from './entities/plan.entity';
import { CreatePlanInput } from './inputs/create-plan.input';
import { UpdatePlanInput } from './inputs/update-plan.input';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los plans registradas en la base de datos.
   * @returns Arreglo de plans
   */
  async findAll(): Promise<Plan[]> {
    const plans = await this.prisma.plan.findMany({});
    return plans;
  }

  /**
   * Busca un plan por su ID.
   * @param id ID del plan a buscar
   * @throws NotFoundException si el plan no existe
   * @returns el plan encontrado
   */
  async findOne(id: string): Promise<Plan> {
    const plan = await this.prisma.plan.findUnique({
      where: {
        id,
      },
    });

    if (!plan) {
      throw new NotFoundException(`Plan with id ${id} not found`);
    }

    return plan;
  }

  /**
   * Crea un nuevo plan.
   * @param data Datos del nuevo plan
   * @returns El plan creado
   */
  async create(data: CreatePlanInput): Promise<Plan> {
    const plan = await this.prisma.plan.create({
      data,
    });

    return plan;
  }

  /**
   * Actualiza los datos de un plan existente.
   * @param id ID del plan a actualizar
   * @param data Datos nuevos para el plan
   * @returns El plan actualizado
   */
  async update(id: string, data: UpdatePlanInput): Promise<Plan> {
    await this.findOne(id);
    return await this.prisma.plan.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina los datos de un plan existente.
   * @param id ID del plan a eliminar
   * @returns El plan eliminado
   */
  async delete(id: string): Promise<Plan> {
    const plan = await this.findOne(id);
    await this.prisma.plan.delete({
      where: {
        id,
      },
    });
    return plan;
  }
}
