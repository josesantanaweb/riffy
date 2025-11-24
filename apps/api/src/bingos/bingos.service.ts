import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanUsageService } from '../plan-usage/plan-usage.service';
import { pubSub } from '../common/pubsub';
import { Bingo } from './entities/bingo.entity';
import { CreateBingoInput } from './inputs/create-bingo.input';
import { UpdateBingoInput } from './inputs/update-bingo.input';
import { BoardStatus, BingoStatus, Role } from '@prisma/client';

@Injectable()
export class BingosService implements OnModuleDestroy {
  private readonly logger = new Logger(BingosService.name);
  private readonly bingoIntervals = new Map<string, NodeJS.Timeout>();
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
      const newBingo = await tx.bingo.create({
        data: {
          title: data.title,
          banner: data.banner,
          totalBoards: data.totalBoards,
          price: data.price,
          award: data.award,
          drawDate: data.drawDate,
          drawnNumbers: [],
          showDate: data.showDate ?? true,
          showProgress: data.showProgress ?? true,
          minBoards: data.minBoards ?? 2,
          status: data.status ?? BingoStatus.ACTIVE,
          owner: {
            connect: { id: ownerId },
          },
        },
      });

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

  /**
   * Extrae un número aleatorio para el bingo especificado.
   * Selecciona un número del 1 al 75 que no haya sido extraído previamente,
   * lo guarda en la base de datos y lo publica mediante PubSub para notificar
   * a los clientes suscritos en tiempo real.
   *
   * @param bingoId ID del bingo del cual se extraerá el número
   * @returns El número extraído (1-75) o null si ya se extrajeron todos los números
   */
  async numberDraw(bingoId: string): Promise<number | null> {
    const bingo = await this.prisma.bingo.findUnique({
      where: { id: bingoId },
      select: { drawnNumbers: true },
    });

    if (!bingo) {
      throw new NotFoundException(`Bingo with id ${bingoId} not found`);
    }

    const drawnNumbers: number[] = bingo.drawnNumbers || [];
    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter(
      (n) => !drawnNumbers.includes(n),
    );

    if (availableNumbers.length === 0) {
      return null;
    }

    const randomNumber =
      availableNumbers[Math.floor(Math.random() * availableNumbers.length)];

    await this.prisma.bingo.update({
      where: { id: bingoId },
      data: {
        drawnNumbers: { push: randomNumber },
      },
    });

    await pubSub.publish(`NUMBER_DRAW_${bingoId}`, {
      numberDraw: randomNumber,
    });

    return randomNumber;
  }

  /**
   * Inicia el sorteo automático de números para un bingo.
   * Extrae números automáticamente cada 4 segundos hasta que se hayan
   * extraído todos los números disponibles (1-75) o hasta que se detenga
   * manualmente con stopAutoNumberDraw.
   *
   * Si ya existe un sorteo automático activo para el bingo, no inicia uno nuevo
   * y retorna false.
   *
   * El sorteo se detiene automáticamente cuando:
   * - Se han extraído todos los números (1-75)
   * - Ocurre un error durante la extracción
   *
   * @param bingoId ID del bingo para el cual iniciar el sorteo automático
   * @returns true si se inició correctamente, false si ya existe un sorteo activo
   */
  async startAutoNumberDraw(bingoId: string): Promise<boolean> {
    if (this.bingoIntervals.has(bingoId)) {
      return false;
    }

    const bingo = await this.prisma.bingo.findUnique({
      where: { id: bingoId },
      select: { id: true },
    });

    if (!bingo) {
      throw new NotFoundException(`Bingo with id ${bingoId} not found`);
    }

    const tick = async (): Promise<void> => {
      try {
        const number = await this.numberDraw(bingoId);

        if (number === null) {
          this.logger.log(
            `Todos los números anunciados para el bingo ${bingoId}. Deteniendo auto draw.`,
          );
          this.stopAutoNumberDraw(bingoId);
        }
      } catch (error) {
        this.logger.error(
          `Error anunciando número para el bingo ${bingoId}`,
          error as Error,
        );
        this.stopAutoNumberDraw(bingoId);
      }
    };

    const interval = setInterval(() => {
      void tick();
    }, 4000);

    this.bingoIntervals.set(bingoId, interval);
    return true;
  }

  /**
   * Detiene el sorteo automático de números para un bingo.
   * Limpia el intervalo asociado y lo elimina del mapa de intervalos activos.
   *
   * @param bingoId ID del bingo para el cual detener el sorteo automático
   * @returns true si se detuvo correctamente, false si no había un sorteo activo
   */
  stopAutoNumberDraw(bingoId: string): boolean {
    const interval = this.bingoIntervals.get(bingoId);

    if (!interval) {
      return false;
    }

    clearInterval(interval);
    this.bingoIntervals.delete(bingoId);
    return true;
  }

  onModuleDestroy(): void {
    this.bingoIntervals.forEach((interval) => clearInterval(interval));
    this.bingoIntervals.clear();
  }
}
