import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RafflesService } from './raffles.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Raffle } from './entities/raffle.entity';
import { UpdateRaffleInput } from './inputs/update-raffle.input';
import { CreateRaffleInput } from './inputs/create-raffle.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class RafflesResolver {
  constructor(private readonly rafflesService: RafflesService) {}

  /**
   * Obtiene todas las rifas registradas.
   * @param user Usuario logueado con su domain y rol
   * @returns Un array de objetos Raffle
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Raffle], { name: 'raffles' })
  getAll(
    @CurrentUser() user: { domain: string; role: Role },
  ): Promise<Raffle[]> {
    return this.rafflesService.findAll(user);
  }

  /**
   * Obtiene todas las rifas registradas por un owner.
   * Retorna: Un array de objetos Raffle
   * @param domain del owner
   * @returns Un array de objetos Raffle
   */
  @Query(() => [Raffle], { name: 'rafflesByDomain' })
  findByDomain(
    @Args('domain', { type: () => String }) domain: string,
  ): Promise<Raffle[]> {
    return this.rafflesService.findAll(undefined, domain);
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
   * El propietario (ownerId) se asigna automáticamente al usuario logueado.
   * Roles requeridos: ADMIN u OWNER
   * @param input Datos de la nueva rifa (sin ownerId)
   * @param user Usuario logueado que será el propietario de la rifa
   * @returns El objeto Raffle creado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Raffle, { name: 'createRaffle' })
  create(
    @Args('input', { type: () => CreateRaffleInput }) input: CreateRaffleInput,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Raffle> {
    return this.rafflesService.create(input, user);
  }

  /**
   * Actualiza los datos de una rifa.
   * Roles requeridos: ADMIN u OWNER (solo puede actualizar sus propias rifas)
   * @param id ID de la rifa a actualizar
   * @param input Datos nuevos para la rifa
   * @returns El objeto Raffle actualizado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Raffle, { name: 'updateRaffle' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateRaffleInput }) input: UpdateRaffleInput,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Raffle> {
    return this.rafflesService.update(id, input, user);
  }

  /**
   * Elimina una rifa por su ID.
   * Roles requeridos: ADMIN u OWNER (solo puede eliminar sus propias rifas)
   * @param id ID de la rifa a eliminar
   * @returns El objeto Raffle eliminado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Raffle, { name: 'deleteRaffle' })
  delete(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Raffle> {
    return this.rafflesService.delete(id, user);
  }
}
