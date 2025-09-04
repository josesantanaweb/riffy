import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PaymentsService } from './payments.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Payment } from './entities/payment.entity';
import { UpdatePaymentInput } from './inputs/update-payment.input';
import { CreatePaymentInput } from './inputs/create-payment.input';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly PaymentService: PaymentsService) {}

  /**
   * Obtiene todos los payments registrados.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Payment
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => [Payment], { name: 'payments' })
  getAll(): Promise<Payment[]> {
    return this.PaymentService.findAll();
  }

  /**
   * Obtiene un payment por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del payment a buscar
   * @returns Un objeto Payment si existe, si no lanza NotFoundException
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => Payment, { name: 'payment' })
  getOne(@Args('id', { type: () => String }) id: string): Promise<Payment> {
    return this.PaymentService.findOne(id);
  }

  /**
   * Crea un nuevo payment.
   * Roles requeridos: ADMIN
   * @param input Datos del nuevo payment
   * @returns El objeto Payment creado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment, { name: 'createPayment' })
  create(
    @Args('input', { type: () => CreatePaymentInput })
    input: CreatePaymentInput,
  ): Promise<Payment> {
    return this.PaymentService.create(input);
  }

  /**
   * Actualiza los datos de un payment.
   * Roles requeridos: ADMIN
   * @param id ID del payment a actualizar
   * @param input Datos nuevos para el payment
   * @returns El objeto Payment actualizado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment, { name: 'updatePayment' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdatePaymentInput })
    input: UpdatePaymentInput,
  ): Promise<Payment> {
    return this.PaymentService.update(id, input);
  }

  /**
   * Elimina un payment por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del payment a eliminar
   * @returns El objeto Payment eliminado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment, { name: 'deletePayment' })
  delete(@Args('id', { type: () => String }) id: string): Promise<Payment> {
    return this.PaymentService.delete(id);
  }
}
