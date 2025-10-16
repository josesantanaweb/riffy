import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './inputs/create-notification.input';
import { NotificationStatus, Role } from '@prisma/client';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los notifications registradas en la base de datos.
   * @param user Usuario autenticado
   * @returns Arreglo de notifications
   */
  async findAll(user: User): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return notifications;
  }

  /**
   * Busca un notification por su ID.
   * @param id ID del notification a buscar
   * @param user Usuario autenticado
   * @throws NotFoundException si el notification no existe
   * @returns el notification encontrado
   */
  async findOne(id: string, user: User): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }

    if (notification.ownerId !== user.id) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }

    return notification;
  }

  /**
   * Crea una nueva notification.
   * @param data Datos del nuevo notification
   * @returns El notification creado
   */
  async create(
    data: CreateNotificationInput,
    user: { id: string; role: Role },
  ): Promise<Notification> {
    const { description, status } = data;
    return await this.prisma.notification.create({
      data: {
        description: description,
        status: status,
        ownerId: user.id,
      },
    });
  }

  /**
   * Actualiza el estado de múltiples notifications.
   * @param ids Array de IDs de las notifications a actualizar
   * @param status Nuevo estado de las notifications
   * @param user Usuario autenticado
   * @returns El número de notifications actualizadas
   */
  async updateManyStatus(
    ids: string[],
    status: NotificationStatus,
    user: User,
  ): Promise<{ count: number }> {
    const result = await this.prisma.notification.updateMany({
      where: {
        id: {
          in: ids,
        },
        ownerId: user.id,
      },
      data: { status },
    });

    return result;
  }

  /**
   * Actualiza el estado de una sola notification (método de compatibilidad).
   * @param id ID del notification a actualizar
   * @param status Nuevo estado del notification
   * @param user Usuario autenticado
   * @returns El notification actualizado
   */
  async updateSingleStatus(
    id: string,
    status: NotificationStatus,
    user: User,
  ): Promise<Notification> {
    await this.findOne(id, user);

    const updatedNotification = await this.prisma.notification.update({
      where: { id },
      data: { status },
    });

    return updatedNotification;
  }
}
