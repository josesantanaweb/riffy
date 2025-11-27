import { Args, Query, Resolver, Mutation, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role, BoardStatus } from '@prisma/client';
import { BoardsService } from './boards.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Board } from './entities/boards.entity';
import { UpdateBoardInput } from './inputs/update-board.input';
import { CreateBoardInput } from './inputs/create-board.input';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  /**
   * Obtiene todos los boards registrados.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Board
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => [Board], { name: 'boards' })
  getAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  /**
   * Obtiene todos los boards registrados por bingo.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Board
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => [Board], { name: 'boardsByBingo' })
  getAllByBingo(
    @Args('bingoId', { type: () => String }) bingoId: string,
  ): Promise<Board[]> {
    return this.boardsService.findAllByBingo(bingoId);
  }

  /**
   * Obtiene todos los boards registrados por número de cédula.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Board
   */
  @Query(() => [Board], { name: 'boardsByNationalId' })
  getAllByNationalId(
    @Args('nationalId', { type: () => String }) nationalId: string,
    @Args('bingoId', { type: () => String }) bingoId: string,
  ): Promise<Board[]> {
    return this.boardsService.findAllByNationalId(nationalId, bingoId);
  }

  /**
   * Obtiene un board por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del board a buscar
   * @returns Un objeto Board si existe, si no lanza NotFoundException
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => Board, { name: 'board' })
  getOne(@Args('id', { type: () => String }) id: string): Promise<Board> {
    return this.boardsService.findOne(id);
  }

  /**
   * Crea un nuevo board.
   * Roles requeridos: ADMIN
   * @param input Datos del nuevo board
   * @returns El objeto Board creado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Board, { name: 'createBoard' })
  create(
    @Args('input', { type: () => CreateBoardInput }) input: CreateBoardInput,
  ): Promise<Board> {
    return this.boardsService.create(input);
  }

  /**
   * Actualiza los datos de un board.
   * Roles requeridos: ADMIN
   * @param id ID del board a actualizar
   * @param input Datos nuevos para el board
   * @returns El objeto Board actualizado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Board, { name: 'updateBoard' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateBoardInput }) input: UpdateBoardInput,
  ): Promise<Board> {
    return this.boardsService.update(id, input);
  }

  /**
   * Actualiza el status de un board.
   * Roles requeridos: ADMIN
   * @param id ID del board a actualizar
   * @param status Nuevo estado del board
   * @returns El objeto Board actualizado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Board, { name: 'updateBoardStatus' })
  updateStatus(
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => BoardStatus }) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateStatus(id, status);
  }

  /**
   * Actualiza los números marcados de un board.
   * @param id ID del board a actualizar
   * @param markedNumbers Matriz con los números marcados
   * @returns El objeto Board actualizado
   */
  @Mutation(() => Board, { name: 'updateBoardMarkedNumbers' })
  updateMarkedNumbers(
    @Args('id', { type: () => String }) id: string,
    @Args('markedNumbers', { type: () => [[Int]] })
    markedNumbers: number[][],
  ): Promise<Board> {
    return this.boardsService.updateMarkedNumbers(id, markedNumbers);
  }

  /**
   * Elimina un board por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del board a eliminar
   * @returns El objeto Board eliminado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Board, { name: 'deleteBoard' })
  delete(@Args('id', { type: () => String }) id: string): Promise<Board> {
    return this.boardsService.delete(id);
  }
}
