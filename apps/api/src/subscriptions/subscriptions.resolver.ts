import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { SubscriptionsService } from './subscriptions.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Subscription } from './entities/subscription.entity';
import { UpdateSubscriptionInput } from './inputs/update-subscription.input';
import { CreateSubscriptionInput } from './inputs/create-subscription.input';

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  /**
   * Obtiene todos los subscriptions registrados.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Subscription
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => [Subscription], { name: 'subscriptions' })
  getAll(): Promise<Subscription[]> {
    return this.subscriptionsService.findAll();
  }

  /**
   * Obtiene un subscription por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del subscription a buscar
   * @returns Un objeto Subscription si existe, si no lanza NotFoundException
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => Subscription, { name: 'subscription' })
  getOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Subscription> {
    return this.subscriptionsService.findOne(id);
  }

  /**
   * Crea un nuevo subscription.
   * @param input Datos del nuevo subscription
   * @returns El objeto Subscription creado
   */
  @Mutation(() => Subscription, { name: 'createSubscription' })
  create(
    @Args('input', { type: () => CreateSubscriptionInput })
    input: CreateSubscriptionInput,
  ): Promise<Subscription> {
    return this.subscriptionsService.create(input);
  }

  /**
   * Actualiza los datos de un subscription.
   * Roles requeridos: ADMIN
   * @param id ID del subscription a actualizar
   * @param input Datos nuevos para el subscription
   * @returns El objeto Subscription actualizado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Subscription, { name: 'updateSubscription' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateSubscriptionInput })
    input: UpdateSubscriptionInput,
  ): Promise<Subscription> {
    return this.subscriptionsService.update(id, input);
  }

  /**
   * Elimina un subscription por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del subscription a eliminar
   * @returns El objeto Subscription eliminado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Subscription, { name: 'deleteSubscription' })
  delete(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Subscription> {
    return this.subscriptionsService.delete(id);
  }
}
