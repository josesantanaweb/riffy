import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { BingosService } from './bingos.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Bingo } from './entities/bingo.entity';
import { UpdateBingoInput } from './inputs/update-bingo.input';
import { CreateBingoInput } from './inputs/create-bingo.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class BingosResolver {
  constructor(private readonly bingosService: BingosService) {}

  /**
   * Obtiene todos los bingos registrados.
   * @param user Usuario logueado con su domain y rol
   * @returns Un array de objetos Bingo
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Bingo], { name: 'bingos' })
  getAll(
    @CurrentUser() user: { domain: string; role: Role },
  ): Promise<Bingo[]> {
    return this.bingosService.findAll(user);
  }

  /**
   * Obtiene un bingo por su ID.
   * No necesita autenticación
   * @param id ID del bingo a buscar
   * @returns Un objeto Bingo si existe, si no lanza NotFoundException
   */
  @Query(() => Bingo, { name: 'bingo' })
  getOne(@Args('id', { type: () => String }) id: string): Promise<Bingo> {
    return this.bingosService.findOne(id);
  }

  /**
   * Crea un nuevo bingo.
   * El propietario (ownerId) se asigna automáticamente al usuario logueado.
   * Roles requeridos: ADMIN u OWNER
   * @param input Datos del nuevo bingo (sin ownerId)
   * @param user Usuario logueado que será el propietario del bingo
   * @returns El objeto Bingo creado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bingo, { name: 'createBingo' })
  create(
    @Args('input', { type: () => CreateBingoInput }) input: CreateBingoInput,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Bingo> {
    return this.bingosService.create(input, user);
  }

  /**
   * Actualiza los datos de un bingo.
   * Roles requeridos: ADMIN u OWNER (solo puede actualizar sus propios bingos)
   * @param id ID del bingo a actualizar
   * @param input Datos nuevos para el bingo
   * @returns El objeto Bingo actualizado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bingo, { name: 'updateBingo' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateBingoInput }) input: UpdateBingoInput,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Bingo> {
    return this.bingosService.update(id, input, user);
  }

  /**
   * Elimina un bingo por su ID.
   * Roles requeridos: ADMIN u OWNER (solo puede eliminar sus propios bingos)
   * @param id ID del bingo a eliminar
   * @returns El objeto Bingo eliminado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bingo, { name: 'deleteBingo' })
  delete(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Bingo> {
    return this.bingosService.delete(id, user);
  }
}
