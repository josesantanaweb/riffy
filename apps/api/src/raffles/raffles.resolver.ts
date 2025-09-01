import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as Role } from '../auth/enums/roles.enum';
import { RafflesService } from './raffles.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Raffle } from './entities/raffle.entity';
import { UpdateRaffleInput } from './inputs/update-raffle.input';
import { CreateRaffleInput } from './inputs/create-raffle.input';

@Resolver()
export class RafflesResolver {
  constructor(private readonly rafflesService: RafflesService) {}

  /**
   * Obtiene todos las rifas registradas.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Raffle
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => [Raffle], { name: 'raffles' })
  getAll(): Promise<Raffle[]> {
    return this.rafflesService.findAll();
  }

  /**
   * Obtiene una rifa por su ID.
   * No necesita autenticación
   * @param id ID de la rifa a buscar
   * @returns Un objeto Raffle si existe, si no lanza NotFoundException
   */
  @Query(() => Raffle, { name: 'raffle' })
  getOne(@Args('id', { type: () => String }) id: string): Promise<Raffle> {
    return this.rafflesService.findOne(id);
  }

  /**
   * Crea una nueva rifa.
   * Roles requeridos: ADMIN
   * @param input Datos de la nueva rifa
   * @returns El objeto Raffle creado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Raffle, { name: 'createRaffle' })
  create(
    @Args('input', { type: () => CreateRaffleInput }) input: CreateRaffleInput,
  ): Promise<Raffle> {
    return this.rafflesService.create(input);
  }

  /**
   * Actualiza los datos de una rifa.
   * Roles requeridos: ADMIN
   * @param id ID de la rifa a actualizar
   * @param input Datos nuevos para la rifa
   * @returns El objeto Raffle actualizado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Raffle, { name: 'updateRaffle' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateRaffleInput }) input: UpdateRaffleInput,
  ): Promise<Raffle> {
    return this.rafflesService.update(id, input);
  }

  /**
   * Elimina una rifa por su ID.
   * Roles requeridos: ADMIN
   * @param id ID de la rifa a eliminar
   * @returns El objeto Raffle eliminado
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Raffle, { name: 'deleteRaffle' })
  delete(@Args('id', { type: () => String }) id: string): Promise<Raffle> {
    return this.rafflesService.delete(id);
  }
}
