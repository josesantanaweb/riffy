import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanUsageService } from '../plan-usage/plan-usage.service';
import { Bingo } from './entities/bingo.entity';
import { CreateBingoInput } from './inputs/create-bingo.input';
import { UpdateBingoInput } from './inputs/update-bingo.input';
import { BoardStatus, Role } from '@prisma/client';

@Injectable()
export class BingosService {
  constructor(
    private prisma: PrismaService,
    private planUsageService: PlanUsageService,
  ) {}

  /**
   * Obtiene todos los bingos registrados en la base de datos.
   * Los usuarios ADMIN ven todos los bingos, los OWNER solo ven los suyos.
   * @param user Usuario logueado con su ID y rol
   * @param ownerDomain (opcional) Dominio del owner para filtrar
   * @returns Arreglo de bingos con información de boards (vendidos, disponibles, progreso)
   */
  async findAll(user?: { role: Role; domain: string }): Promise<Bingo[]> {
    let where = {};
    if (user) {
      if (user.role !== Role.ADMIN) {
        where = {
          owner: {
            domain: user.domain,
          },
        };
      }
    }

    const bingos = await this.prisma.bingo.findMany({
      where,
      include: {
        boards: true,
        owner: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return bingos.map((bingo) => {
      const totalBoards = bingo.boards.length;
      const sold = bingo.boards.filter(
        (b) => b.status === BoardStatus.SOLD,
      ).length;
      const available = bingo.boards.filter(
        (b) => b.status === BoardStatus.AVAILABLE,
      ).length;
      const progress = totalBoards > 0 ? (sold / totalBoards) * 100 : 0;

      return {
        ...bingo,
        sold,
        available,
        progress: Number(progress.toFixed(2)),
        boards: bingo.boards
          .sort((a, b) => parseInt(a.number) - parseInt(b.number))
          .map((board) => ({
            ...board,
            number: board.number.toString(),
          })),
      };
    });
  }

  /**
   * Busca un bingo por su ID.
   * @param id ID del bingo a buscar
   * @throws NotFoundException si el bingo no existe
   * @returns el bingo encontrado
   */
  async findOne(id: string): Promise<Bingo> {
    const bingo = await this.prisma.bingo.findUnique({
      where: {
        id,
      },
      include: {
        boards: true,
        owner: true,
      },
    });

    if (!bingo) {
      throw new NotFoundException(`Bingo with id ${id} not found`);
    }

    const totalBoards = bingo.boards.length;
    const sold = bingo.boards.filter(
      (b) => b.status === BoardStatus.SOLD,
    ).length;
    const available = bingo.boards.filter(
      (b) => b.status === BoardStatus.AVAILABLE,
    ).length;
    const progress = totalBoards > 0 ? (sold / totalBoards) * 100 : 0;

    return {
      ...bingo,
      sold,
      available,
      progress: Number(progress.toFixed(2)),
      boards: bingo.boards
        .sort((a, b) => parseInt(a.number) - parseInt(b.number))
        .map((board) => ({
          ...board,
          number: board.number.toString(),
        })),
    };
  }

  /**
   * Crea un nuevo bingo.
   * El propietario (ownerId) se asigna automáticamente al usuario logueado.
   * Genera automáticamente todos los boards numerados para el bingo.
   * Valida y actualiza automáticamente el uso del plan del usuario.
   * @param data Datos del nuevo bingo (sin ownerId)
   * @param user Usuario logueado que será el propietario del bingo
   * @returns El bingo creado con todos sus boards
   */
  async create(
    data: CreateBingoInput,
    user: { id: string; role: Role },
  ): Promise<Bingo> {
    const { totalBoards } = data;
    const ownerId = user.id;

    const bingoValidation = await this.planUsageService.canCreateBingo(ownerId);
    if (!bingoValidation.canCreate) {
      throw new BadRequestException(bingoValidation.message);
    }

    const boardValidation = await this.planUsageService.canCreateBoards(
      ownerId,
      totalBoards,
    );
    if (!boardValidation.canCreate) {
      throw new BadRequestException(boardValidation.message);
    }

    const bingo = await this.prisma.$transaction(async (tx) => {
      const bingoData = { ...data, ownerId, drawnNumbers: [] };
      const newBingo = await tx.bingo.create({ data: bingoData });

      const maxLength = totalBoards.toString().length;
      const boards = Array.from({ length: totalBoards }, (_, i) => ({
        number: `${i + 1}`.padStart(maxLength, '0'),
        bingoId: newBingo.id,
      }));

      await tx.board.createMany({ data: boards });

      await this.planUsageService.incrementBingos(ownerId);
      await this.planUsageService.incrementBoards(ownerId, totalBoards);

      return newBingo;
    });

    return bingo;
  }

  /**
   * Actualiza los datos de un bingo existente.
   * @param id ID del bingo a actualizar
   * @param data Datos nuevos para el bingo
   * @param user Usuario que actualiza el bingo
   * @returns El bingo actualizado
   */
  async update(
    id: string,
    data: UpdateBingoInput,
    user: { id: string; role: Role },
  ): Promise<Bingo> {
    const bingo = await this.findOne(id);

    if (user.role !== Role.ADMIN && bingo.ownerId !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar este bingo',
      );
    }

    return await this.prisma.bingo.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina los datos de un bingo existente.
   * Esto eliminará automáticamente todos los boards asociados y
   * los pagos que queden huérfanos (sin boards asociados).
   * @param id ID del bingo a eliminar
   * @param user Usuario que elimina el bingo
   * @returns El bingo eliminado
   */
  async delete(id: string, user: { id: string; role: Role }): Promise<Bingo> {
    const bingo = await this.findOne(id);

    if (user.role !== Role.ADMIN && bingo.ownerId !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este bingo',
      );
    }

    return await this.prisma.$transaction(async (tx) => {
      const boards = await tx.board.findMany({
        where: { bingoId: id },
        select: { paymentId: true },
      });

      await tx.bingo.delete({
        where: { id },
      });

      const paymentIds = boards.map((b) => b.paymentId).filter(Boolean);

      if (paymentIds.length > 0) {
        await tx.payment.deleteMany({
          where: {
            id: { in: paymentIds },
            boards: { none: {} },
          },
        });
      }

      return bingo;
    });
  }
}
