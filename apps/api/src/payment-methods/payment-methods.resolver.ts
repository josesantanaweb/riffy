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

@Resolver()
export class PaymentMethodsResolver {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  /**
   * Obtiene todos los métodos de pago registrados.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos PaymentMethod
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => [PaymentMethod], { name: 'paymentMethods' })
  getAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodsService.findAll();
  }

  /**
   * Obtiene los métodos de pago de un usuario específico.
   * Roles requeridos: OWNER (solo puede ver sus propios métodos) o ADMIN
   * @param ownerId ID del propietario
   * @returns Un array de objetos PaymentMethod del usuario
   */
  // @Roles(Role.ADMIN, Role.OWNER)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => [PaymentMethod], { name: 'paymentMethodsByOwner' })
  getByOwnerId(
    @Args('ownerId', { type: () => String }) ownerId: string,
  ): Promise<PaymentMethod[]> {
    return this.paymentMethodsService.findByOwnerId(ownerId);
  }

  /**
   * Obtiene un método de pago por su ID.
   * Roles requeridos: OWNER (solo puede ver sus propios métodos) o ADMIN
   * @param id ID del método de pago a buscar
   * @returns Un objeto PaymentMethod si existe, si no lanza NotFoundException
   */
  // @Roles(Role.ADMIN, Role.OWNER)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => PaymentMethod, { name: 'paymentMethod' })
  getOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.findOne(id);
  }

  /**
   * Crea un nuevo método de pago.
   * El nombre se asigna automáticamente según el tipo si no se proporciona.
   * Roles requeridos: OWNER (solo puede crear para sí mismo) o ADMIN
   * @param input Datos del nuevo método de pago
   * @returns El objeto PaymentMethod creado
   * @throws BadRequestException si faltan campos requeridos según el tipo
   */
  // @Roles(Role.ADMIN, Role.OWNER)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentMethod, { name: 'createPaymentMethod' })
  create(
    @Args('input', { type: () => CreatePaymentMethodInput })
    input: CreatePaymentMethodInput,
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.create(input);
  }

  /**
   * Actualiza los datos de un método de pago.
   * Roles requeridos: OWNER (solo puede actualizar sus propios métodos) o ADMIN
   * @param id ID del método de pago a actualizar
   * @param input Datos nuevos para el método de pago
   * @returns El objeto PaymentMethod actualizado
   * @throws BadRequestException si faltan campos requeridos según el tipo
   */
  // @Roles(Role.ADMIN, Role.OWNER)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentMethod, { name: 'updatePaymentMethod' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdatePaymentMethodInput })
    input: UpdatePaymentMethodInput,
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.update(id, input);
  }

  /**
   * Elimina un método de pago por su ID.
   * Roles requeridos: OWNER (solo puede eliminar sus propios métodos) o ADMIN
   * @param id ID del método de pago a eliminar
   * @returns El objeto PaymentMethod eliminado
   */
  // @Roles(Role.ADMIN, Role.OWNER)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentMethod, { name: 'deletePaymentMethod' })
  delete(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.delete(id);
  }
}
