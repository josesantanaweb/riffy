import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PaymentMethodsService } from './payment-methods.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaymentMethod } from './entities/payment-method.entity';
import { UpdatePaymentMethodInput } from './inputs/update-payment-method.input';
import { CreatePaymentMethodInput } from './inputs/create-payment-method.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class PaymentMethodsResolver {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  /**
   * Obtiene todos los métodos de pago registrados.
   * @param user Usuario logueado con su domain y rol
   * @returns Un array de objetos PaymentMethod
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [PaymentMethod], { name: 'paymentMethods' })
  getAll(
    @CurrentUser() user: { domain: string; role: Role },
  ): Promise<PaymentMethod[]> {
    return this.paymentMethodsService.findAll(user);
  }

  /**
   * Obtiene todos los métodos de pago registrados por un owner.
   * Retorna: Un array de objetos PaymentMethod
   * @param domain del owner
   * @returns Un array de objetos PaymentMethod
   */
  @Query(() => [PaymentMethod], { name: 'paymentMethodsByDomain' })
  findByDomain(
    @Args('domain', { type: () => String }) domain: string,
  ): Promise<PaymentMethod[]> {
    return this.paymentMethodsService.findAll(undefined, domain);
  }

  /**
   * Obtiene un método de pago por su ID.
   * Roles requeridos: OWNER (solo puede ver sus propios métodos) o ADMIN
   * @param id ID del método de pago a buscar
   * @returns Un objeto PaymentMethod si existe, si no lanza NotFoundException
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => PaymentMethod, { name: 'paymentMethod' })
  getOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.findOne(id);
  }

  /**
   * Crea un nuevo método de pago.
   * El propietario (ownerId) se asigna automáticamente al usuario logueado.
   * El nombre se asigna automáticamente según el tipo si no se proporciona.
   * Roles requeridos: ADMIN u OWNER
   * @param input Datos del nuevo método de pago (sin ownerId)
   * @param user Usuario logueado que será el propietario del método de pago
   * @returns El objeto PaymentMethod creado
   * @throws BadRequestException si faltan campos requeridos según el tipo
   */
  @Roles(Role.OWNER, Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentMethod, { name: 'createPaymentMethod' })
  create(
    @Args('input', { type: () => CreatePaymentMethodInput })
    input: CreatePaymentMethodInput,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.create(input, user);
  }

  /**
   * Actualiza los datos de un método de pago.
   * Roles requeridos: ADMIN u OWNER (solo puede actualizar sus propios métodos)
   * @param id ID del método de pago a actualizar
   * @param input Datos nuevos para el método de pago
   * @param user Usuario que actualiza el método de pago
   * @returns El objeto PaymentMethod actualizado
   * @throws BadRequestException si faltan campos requeridos según el tipo
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentMethod, { name: 'updatePaymentMethod' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdatePaymentMethodInput })
    input: UpdatePaymentMethodInput,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.update(id, input, user);
  }

  /**
   * Elimina un método de pago por su ID.
   * Roles requeridos: ADMIN u OWNER (solo puede eliminar sus propios métodos)
   * @param id ID del método de pago a eliminar
   * @param user Usuario que elimina el método de pago
   * @returns El objeto PaymentMethod eliminado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentMethod, { name: 'deletePaymentMethod' })
  delete(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.delete(id, user);
  }
}
