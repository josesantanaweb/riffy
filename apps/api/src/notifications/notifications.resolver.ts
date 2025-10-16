import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { NotificationStatus } from '@prisma/client';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Resolver()
export class NotificationsResolver {
  constructor(private readonly notificationService: NotificationsService) {}

  /**
   * Obtiene todas las notificaciones del usuario logueado.
   * @param user Usuario autenticado
   * Retorna: Un array de objetos Notification
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Notification], { name: 'notifications' })
  getAll(@CurrentUser() user: User): Promise<Notification[]> {
    return this.notificationService.findAll(user);
  }

  /**
   * Obtiene una notificación por su ID.
   * @param user Usuario autenticado
   * @param id ID del notiication a buscar
   * @returns Un objeto Notification si existe, si no lanza NotFoundException
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => Notification, { name: 'notification' })
  getOne(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ): Promise<Notification> {
    return this.notificationService.findOne(id, user);
  }

  /**
   * Actualiza el estado de múltiples notifications.
   * @param user Usuario autenticado
   * @param ids Array de IDs de las notifications a actualizar
   * @param status Nuevo estado de las notifications
   * @returns El número de notifications actualizadas
   */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'updateNotificationsStatus' })
  async updateManyStatus(
    @CurrentUser() user: User,
    @Args('ids', { type: () => [String] }) ids: string[],
    @Args('status', { type: () => NotificationStatus })
    status: NotificationStatus,
  ): Promise<string> {
    const result = await this.notificationService.updateManyStatus(
      ids,
      status,
      user,
    );
    return `Se actualizaron ${result.count} notificaciones`;
  }

  /**
   * Actualiza el estado de una sola notification.
   * @param user Usuario autenticado
   * @param id ID del notification a actualizar
   * @param status Nuevo estado del notification
   * @returns El notification actualizado
   */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Notification, { name: 'updateNotificationStatus' })
  updateSingleStatus(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => NotificationStatus })
    status: NotificationStatus,
  ): Promise<Notification> {
    return this.notificationService.updateSingleStatus(id, status, user);
  }
}
