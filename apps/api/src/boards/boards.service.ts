import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Board } from './entities/boards.entity';
import { CreateBoardInput } from './inputs/create-board.input';
import { UpdateBoardInput } from './inputs/update-board.input';
import { BoardStatus } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los boards registrados en la base de datos.
   * @returns Arreglo de boards
   */
  async findAll(): Promise<Board[]> {
    const boards = await this.prisma.board.findMany({
      include: {
        payment: true,
      },
    });
    return boards;
  }

  /**
   * Obtiene todos los boards registrados en la base de datos por bingo.
   * @returns Arreglo de boards
   */
  async findAllByBingo(bingoId: string): Promise<Board[]> {
    const boards = await this.prisma.board.findMany({
      where: {
        bingoId,
      },
      include: {
        payment: true,
        bingo: true,
      },
      orderBy: {
        number: 'asc',
      },
    });
    return boards;
  }

  /**
   * Obtiene todos los boards registrados en la base de datos por número de cédula.
   * @returns Arreglo de boards
   */
  async findAllByNationalId(
    nationalId: string,
    bingoId?: string,
  ): Promise<Board[]> {
    const boards = await this.prisma.board.findMany({
      where: {
        payment: {
          nationalId,
        },
        bingoId,
      },
      include: {
        payment: true,
      },
    });
    return boards;
  }

  /**
   * Busca un board por su ID.
   * @param id ID del board a buscar
   * @throws NotFoundException si el board no existe
   * @returns el board encontrado
   */
  async findOne(id: string): Promise<Board> {
    const board = await this.prisma.board.findUnique({
      where: {
        id,
      },
      include: {
        payment: true,
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    return board;
  }

  /**
   * Crea un nuevo board.
   * @param data Datos del nuevo board
   * @returns El board creado
   */
  async create(data: CreateBoardInput): Promise<Board> {
    return await this.prisma.board.create({ data });
  }

  /**
   * Actualiza los datos de un board existente.
   * @param id ID del board a actualizar
   * @param data Datos nuevos para el board
   * @returns El board actualizado
   */
  async update(id: string, data: UpdateBoardInput): Promise<Board> {
    await this.findOne(id);
    return await this.prisma.board.update({
      where: { id },
      data,
    });
  }

  /**
   * Actualiza el status de un board existente.
   * @param id ID del board a actualizar
   * @param status Nuevo estado del board
   * @returns El board actualizado
   */
  async updateStatus(id: string, status: BoardStatus): Promise<Board> {
    await this.findOne(id);
    const updatedBoard = await this.prisma.board.update({
      where: { id },
      data: { status },
    });

    return updatedBoard;
  }

  /**
   * Elimina los datos de un board existente.
   * @param id ID del board a eliminar
   * @returns El board eliminado
   */
  async delete(id: string): Promise<Board> {
    const board = await this.findOne(id);
    await this.prisma.board.delete({
      where: {
        id,
      },
    });
    return board;
  }
}
