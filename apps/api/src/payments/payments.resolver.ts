import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaymentStatus, Role } from '@prisma/client';
import { PaymentsService } from './payments.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Payment } from './entities/payment.entity';
import { UpdatePaymentInput } from './inputs/update-payment.input';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { User } from '../users/entities/user.entity';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Obtiene todos los payments registrados.
   * Roles requeridos: ADMIN, OWNER
   * @param user Usuario autenticado
   * @param bingoId Filtro opcional por bingoId
   * Retorna: Un array de objetos Payment
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => [Payment], { name: 'payments' })
  getAll(
    @CurrentUser() user: User,
    @Args('bingoId', { type: () => String, nullable: true })
    bingoId?: string,
  ): Promise<Payment[]> {
    return this.paymentsService.findAll(user, bingoId);
  }

  /**
   * Obtiene un payment por su ID.
   * Roles requeridos: ADMIN, OWNER
   * @param user Usuario autenticado
   * @param id ID del payment a buscar
   * @returns Un objeto Payment si existe, si no lanza NotFoundException
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => Payment, { name: 'payment' })
  getOne(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ): Promise<Payment> {
    return this.paymentsService.findOne(id, user);
  }

  /**
   * Obtiene un payment por su número de cédula.
   * @param nationalId Número de cédula a buscar
   * @returns Un objeto Payment si existe, si no lanza NotFoundException
   */
  @Query(() => Payment, { name: 'paymentByNationalId' })
  getByNationalId(
    @Args('nationalId', { type: () => String }) nationalId: string,
  ): Promise<Payment> {
    return this.paymentsService.findByNationalId(nationalId);
  }

  /**
   * Crea un nuevo payment.
   * @param input Datos del nuevo payment
   * @returns El objeto Payment creado
   */
  @Mutation(() => Payment, { name: 'createPayment' })
  create(
    @Args('input', { type: () => CreatePaymentInput })
    input: CreatePaymentInput,
  ): Promise<Payment> {
    return this.paymentsService.create(input);
  }

  /**
   * Actualiza los datos de un payment.
   * Roles requeridos: ADMIN
   * @param user Usuario autenticado
   * @param id ID del payment a actualizar
   * @param input Datos nuevos para el payment
   * @returns El objeto Payment actualizado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment, { name: 'updatePayment' })
  update(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdatePaymentInput })
    input: UpdatePaymentInput,
  ): Promise<Payment> {
    return this.paymentsService.update(id, input, user);
  }

  /**
   * Actualiza el estado de un payment.
   * Roles requeridos: ADMIN, OWNER
   * @param user Usuario autenticado
   * @param id ID del payment a actualizar
   * @param status Nuevo estado del payment
   * @returns El payment actualizado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment, { name: 'updatePaymentStatus' })
  updateStatus(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => PaymentStatus }) status: PaymentStatus,
  ): Promise<Payment> {
    return this.paymentsService.updateStatus(id, status, user);
  }

  /**
   * Elimina un payment por su ID.
   * Roles requeridos: ADMIN
   * @param user Usuario autenticado
   * @param id ID del payment a eliminar
   * @returns El objeto Payment eliminado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment, { name: 'deletePayment' })
  delete(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ): Promise<Payment> {
    return this.paymentsService.delete(id, user);
  }
}
