import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PlansService } from './plans.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Plan } from './entities/plan.entity';
import { UpdatePlanInput } from './inputs/update-plan.input';
import { CreatePlanInput } from './inputs/create-plan.input';

@Resolver()
export class PlansResolver {
  constructor(private readonly plansService: PlansService) {}

  /**
   * Obtiene todos los plans registrados.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Plan
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => [Plan], { name: 'plans' })
  getAll(): Promise<Plan[]> {
    return this.plansService.findAll();
  }

  /**
   * Obtiene un plan por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del plan a buscar
   * @returns Un objeto Plan si existe, si no lanza NotFoundException
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => Plan, { name: 'plan' })
  getOne(@Args('id', { type: () => String }) id: string): Promise<Plan> {
    return this.plansService.findOne(id);
  }

  /**
   * Crea un nuevo plan.
   * @param input Datos del nuevo plan
   * @returns El objeto Plan creado
   */
  @Mutation(() => Plan, { name: 'createPlan' })
  create(
    @Args('input', { type: () => CreatePlanInput })
    input: CreatePlanInput,
  ): Promise<Plan> {
    return this.plansService.create(input);
  }

  /**
   * Actualiza los datos de un plan.
   * Roles requeridos: ADMIN
   * @param id ID del plan a actualizar
   * @param input Datos nuevos para el plan
   * @returns El objeto Plan actualizado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Plan, { name: 'updatePlan' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdatePlanInput })
    input: UpdatePlanInput,
  ): Promise<Plan> {
    return this.plansService.update(id, input);
  }

  /**
   * Elimina un plan por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del plan a eliminar
   * @returns El objeto Plan eliminado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Plan, { name: 'deletePlan' })
  delete(@Args('id', { type: () => String }) id: string): Promise<Plan> {
    return this.plansService.delete(id);
  }
}
