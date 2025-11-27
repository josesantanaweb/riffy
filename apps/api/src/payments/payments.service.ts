import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { UpdatePaymentInput } from './inputs/update-payment.input';
import {
  PaymentStatus,
  BoardStatus,
  NotificationStatus,
  Role,
} from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { User } from '../users/entities/user.entity';

interface PaymentWithBoardsAndBingo {
  id: string;
  buyerName: string;
  boards: Array<{
    id: string;
    number: number;
    bingo: {
      id: string;
      title: string;
      ownerId: string;
    };
  }>;
}

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  /**
   * Obtiene todos los payments registradas en la base de datos.
   * @param user Usuario autenticado
   * @param bingoId Filtro opcional por bingoId
   * @returns Arreglo de payments
   */
  async findAll(user: User, bingoId?: string): Promise<Payment[]> {
    let whereClause: Record<string, unknown> = {};

    if (user.role !== Role.ADMIN) {
      whereClause = {
        ...whereClause,
        boards: {
          some: {
            bingo: {
              ownerId: user.id,
            },
          },
        },
      };
    }

    if (bingoId) {
      whereClause = {
        ...whereClause,
        bingoId,
      };
    }

    const payments = await this.prisma.payment.findMany({
      where: whereClause,
      include: {
        boards: true,
        bingo: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return payments;
  }

  /**
   * Busca un payment por su ID.
   * @param id ID del payment a buscar
   * @param user Usuario autenticado
   * @throws NotFoundException si el payment no existe
   * @returns el payment encontrado
   */
  async findOne(id: string, user: User): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id,
      },
      include: {
        boards: true,
        bingo: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    if (user.role !== Role.ADMIN) {
      const isOwner = payment.bingo.ownerId === user.id;

      if (!isOwner) {
        throw new NotFoundException(`Payment with id ${id} not found`);
      }
    }

    return payment;
  }

  /**
   * Busca un payment por su número de cédula.
   * @param nationalId Número de cédula a buscar
   * @returns el payment encontrado
   */
  async findByNationalId(nationalId: string): Promise<Payment> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        nationalId,
      },
    });

    if (!payment) {
      throw new NotFoundException(
        `Payment with national id ${nationalId} not found`,
      );
    }

    return payment;
  }

  /**
   * Crea un nuevo payment.
   * @param data Datos del nuevo payment
   * @returns El payment creado
   */
  async create(data: CreatePaymentInput): Promise<Payment> {
    const { boardIds, ...paymentData } = data;

    const payment = await this.prisma.$transaction(async (tx) => {
      const newPayment = await tx.payment.create({
        data: paymentData,
      });

      await tx.board.updateMany({
        where: {
          id: {
            in: boardIds,
          },
        },
        data: {
          status: BoardStatus.SOLD,
          paymentId: newPayment.id,
        },
      });

      return await tx.payment.findUnique({
        where: { id: newPayment.id },
        include: {
          boards: {
            include: {
              bingo: true,
            },
          },
        },
      });
    });

    await this.createNotificationForPayment(payment);

    return payment;
  }

  /**
   * Actualiza los datos de un payment existente.
   * @param id ID del payment a actualizar
   * @param data Datos nuevos para el payment
   * @param user Usuario autenticado
   * @returns El payment actualizado
   */
  async update(
    id: string,
    data: UpdatePaymentInput,
    user: User,
  ): Promise<Payment> {
    await this.findOne(id, user);
    return await this.prisma.payment.update({
      where: { id },
      data,
    });
  }

  /**
   * Actualiza el estado de un payment y los boards asociados.
   * @param id ID del payment a actualizar
   * @param status Nuevo estado del payment
   * @param user Usuario autenticado
   * @returns El payment actualizado
   */
  async updateStatus(
    id: string,
    status: PaymentStatus,
    user: User,
  ): Promise<Payment> {
    const payment = await this.findOne(id, user);

    return await this.prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id },
        data: { status },
        include: {
          boards: true,
        },
      });

      if (payment.boards && payment.boards.length > 0) {
        const boardIds = payment.boards.map((board) => board.id);

        if (status === PaymentStatus.DENIED) {
          await tx.board.updateMany({
            where: {
              id: {
                in: boardIds,
              },
            },
            data: {
              status: BoardStatus.AVAILABLE,
              paymentId: null,
            },
          });
        } else if (status === PaymentStatus.VERIFIED) {
          await tx.board.updateMany({
            where: {
              id: {
                in: boardIds,
              },
            },
            data: {
              status: BoardStatus.SOLD,
            },
          });
        }
      }

      return updatedPayment;
    });
  }

  /**
   * Elimina los datos de un payment existente.
   * @param id ID del payment a eliminar
   * @param user Usuario autenticado
   * @returns El payment eliminado
   */
  async delete(id: string, user: User): Promise<Payment> {
    const payment = await this.findOne(id, user);
    await this.prisma.payment.delete({
      where: {
        id,
      },
    });
    return payment;
  }

  /**
   * Crea una notificación cuando se realiza un pago.
   * @param payment Payment con boards y rifa incluidos
   */
  private async createNotificationForPayment(
    payment: PaymentWithBoardsAndBingo,
  ): Promise<void> {
    if (!payment.boards || payment.boards.length === 0) {
      return;
    }

    const bingo = payment.boards[0]?.bingo;
    if (!bingo) {
      return;
    }

    const boardNumbers = payment.boards
      .map((board) => `#${board.number}`)
      .join(', ');

    const description = `${payment.buyerName} compro el boleto ${boardNumbers} de la ${bingo.title}`;

    await this.notificationsService.create(
      {
        description,
        status: NotificationStatus.UNREAD,
      },
      {
        id: bingo.ownerId,
        role: Role.OWNER,
      },
    );
  }
}
