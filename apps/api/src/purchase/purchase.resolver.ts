import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PurchaseService } from './purchase.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Purchase } from './entities/purchase.entity';
import { UpdatePurchaseInput } from './inputs/update-purchase.input';
import { CreatePurchaseInput } from './inputs/create-purchase.input';

@Resolver()
export class PurchaseResolver {
  constructor(private readonly PurchaseService: PurchaseService) {}

  /**
   * Obtiene todos los purchases registrados.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Purchase
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => [Purchase], { name: 'purchases' })
  getAll(): Promise<Purchase[]> {
    return this.PurchaseService.findAll();
  }

  /**
   * Obtiene un purchase por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del purchase a buscar
   * @returns Un objeto Purchase si existe, si no lanza NotFoundException
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => Purchase, { name: 'purchase' })
  getOne(@Args('id', { type: () => String }) id: string): Promise<Purchase> {
    return this.PurchaseService.findOne(id);
  }

  /**
   * Crea un nuevo purchase.
   * Roles requeridos: ADMIN
   * @param input Datos del nuevo purchase
   * @returns El objeto Purchase creado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Purchase, { name: 'createPurchase' })
  create(
    @Args('input', { type: () => CreatePurchaseInput })
    input: CreatePurchaseInput,
  ): Promise<Purchase> {
    return this.PurchaseService.create(input);
  }

  /**
   * Actualiza los datos de un purchase.
   * Roles requeridos: ADMIN
   * @param id ID del purchase a actualizar
   * @param input Datos nuevos para el purchase
   * @returns El objeto Purchase actualizado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Purchase, { name: 'updatePurchase' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdatePurchaseInput })
    input: UpdatePurchaseInput,
  ): Promise<Purchase> {
    return this.PurchaseService.update(id, input);
  }

  /**
   * Elimina un purchase por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del purchase a eliminar
   * @returns El objeto Purchase eliminado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Purchase, { name: 'deletePurchase' })
  delete(@Args('id', { type: () => String }) id: string): Promise<Purchase> {
    return this.PurchaseService.delete(id);
  }
}
