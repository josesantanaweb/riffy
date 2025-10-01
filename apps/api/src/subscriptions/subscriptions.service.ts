import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionInput } from './inputs/create-subscription.input';
import { UpdateSubscriptionInput } from './inputs/update-subscription.input';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los subscriptions registradas en la base de datos.
   * @returns Arreglo de subscriptions
   */
  async findAll(): Promise<Subscription[]> {
    const subscriptions = await this.prisma.subscription.findMany({
      include: {
        plan: true,
      },
    });
    return subscriptions;
  }

  /**
   * Busca un subscription por su ID.
   * @param id ID del subscription a buscar
   * @throws NotFoundException si el subscription no existe
   * @returns el subscription encontrado
   */
  async findOne(id: string): Promise<Subscription> {
    const subscription = await this.prisma.subscription.findUnique({
      where: {
        id,
      },
      include: {
        plan: true,
      },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${id} not found`);
    }

    return subscription;
  }

  /**
   * Crea un nuevo subscription.
   * @param data Datos del nuevo subscription
   * @returns El subscription creado
   */
  async create(data: CreateSubscriptionInput): Promise<Subscription> {
    const subscription = await this.prisma.subscription.create({
      data,
    });

    return subscription;
  }

  /**
   * Actualiza los datos de un subscription existente.
   * @param id ID del subscription a actualizar
   * @param data Datos nuevos para el subscription
   * @returns El subscription actualizado
   */
  async update(
    id: string,
    data: UpdateSubscriptionInput,
  ): Promise<Subscription> {
    await this.findOne(id);
    return await this.prisma.subscription.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina los datos de un subscription existente.
   * @param id ID del subscription a eliminar
   * @returns El subscription eliminado
   */
  async delete(id: string): Promise<Subscription> {
    const subscription = await this.findOne(id);
    await this.prisma.subscription.delete({
      where: {
        id,
      },
    });
    return subscription;
  }
}
