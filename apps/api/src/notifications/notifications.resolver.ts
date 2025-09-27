import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { NotificationStatus, Role } from '@prisma/client';
import { NotificationsService } from './notifications.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Notification } from './entities/notification.entity';

@Resolver()
export class NotificationsResolver {
  constructor(private readonly notificationService: NotificationsService) {}

  /**
   * Obtiene todos los notiications registrados.
   * Roles requeridos: ADMIN, OWNER
   * Retorna: Un array de objetos Notification
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => [Notification], { name: 'notifications' })
  getAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  /**
   * Obtiene un notiication por su ID.
   * Roles requeridos: ADMIN, OWNER
   * @param id ID del notiication a buscar
   * @returns Un objeto Notification si existe, si no lanza NotFoundException
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => Notification, { name: 'notification' })
  getOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Notification> {
    return this.notificationService.findOne(id);
  }

  /**
   * Actualiza el estado de múltiples notifications.
   * Roles requeridos: ADMIN, OWNER
   * @param ids Array de IDs de las notifications a actualizar
   * @param status Nuevo estado de las notifications
   * @returns El número de notifications actualizadas
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'updateNotificationsStatus' })
  async updateManyStatus(
    @Args('ids', { type: () => [String] }) ids: string[],
    @Args('status', { type: () => NotificationStatus })
    status: NotificationStatus,
  ): Promise<string> {
    const result = await this.notificationService.updateManyStatus(ids, status);
    return `Se actualizaron ${result.count} notificaciones`;
  }

  /**
   * Actualiza el estado de una sola notification.
   * Roles requeridos: ADMIN, OWNER
   * @param id ID del notification a actualizar
   * @param status Nuevo estado del notification
   * @returns El notification actualizado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Notification, { name: 'updateNotificationStatus' })
  updateSingleStatus(
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => NotificationStatus })
    status: NotificationStatus,
  ): Promise<Notification> {
    return this.notificationService.updateSingleStatus(id, status);
  }
}
