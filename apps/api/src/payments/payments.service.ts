import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { UpdatePaymentInput } from './inputs/update-payment.input';
import {
  PaymentStatus,
  TicketStatus,
  NotificationStatus,
  Role,
} from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

interface PaymentWithTicketsAndRaffle {
  id: string;
  buyerName: string;
  tickets: Array<{
    id: string;
    number: string;
    raffle: {
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
   * @param raffleId Filtro opcional por raffleId
   * @returns Arreglo de payments
   */
  async findAll(raffleId?: string): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: raffleId ? { raffleId } : undefined,
      include: {
        tickets: true,
        raffle: true,
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
   * @throws NotFoundException si el payment no existe
   * @returns el payment encontrado
   */
  async findOne(id: string): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id,
      },
      include: {
        tickets: true,
        raffle: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
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
    const { ticketIds, ...paymentData } = data;

    const payment = await this.prisma.$transaction(async (tx) => {
      const newPayment = await tx.payment.create({
        data: paymentData,
      });

      await tx.ticket.updateMany({
        where: {
          id: {
            in: ticketIds,
          },
        },
        data: {
          status: TicketStatus.SOLD,
          paymentId: newPayment.id,
        },
      });

      return await tx.payment.findUnique({
        where: { id: newPayment.id },
        include: {
          tickets: {
            include: {
              raffle: true,
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
   * @returns El payment actualizado
   */
  async update(id: string, data: UpdatePaymentInput): Promise<Payment> {
    await this.findOne(id);
    return await this.prisma.payment.update({
      where: { id },
      data,
    });
  }

  /**
   * Actualiza el estado de un payment y los tickets asociados.
   * @param id ID del payment a actualizar
   * @param status Nuevo estado del payment
   * @returns El payment actualizado
   */
  async updateStatus(id: string, status: PaymentStatus): Promise<Payment> {
    const payment = await this.findOne(id);

    return await this.prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id },
        data: { status },
        include: {
          tickets: true,
        },
      });

      if (payment.tickets && payment.tickets.length > 0) {
        const ticketIds = payment.tickets.map((ticket) => ticket.id);

        if (status === PaymentStatus.DENIED) {
          await tx.ticket.updateMany({
            where: {
              id: {
                in: ticketIds,
              },
            },
            data: {
              status: TicketStatus.AVAILABLE,
              paymentId: null,
            },
          });
        } else if (status === PaymentStatus.VERIFIED) {
          await tx.ticket.updateMany({
            where: {
              id: {
                in: ticketIds,
              },
            },
            data: {
              status: TicketStatus.SOLD,
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
   * @returns El payment eliminado
   */
  async delete(id: string): Promise<Payment> {
    const payment = await this.findOne(id);
    await this.prisma.payment.delete({
      where: {
        id,
      },
    });
    return payment;
  }

  /**
   * Crea una notificación cuando se realiza un pago.
   * @param payment Payment con tickets y rifa incluidos
   */
  private async createNotificationForPayment(
    payment: PaymentWithTicketsAndRaffle,
  ): Promise<void> {
    if (!payment.tickets || payment.tickets.length === 0) {
      return;
    }

    const raffle = payment.tickets[0]?.raffle;
    if (!raffle) {
      return;
    }

    const ticketNumbers = payment.tickets
      .map((ticket) => `#${ticket.number}`)
      .join(', ');

    const description = `${payment.buyerName} compro el boleto ${ticketNumbers} de la ${raffle.title}`;

    await this.notificationsService.create(
      {
        description,
        status: NotificationStatus.UNREAD,
      },
      {
        id: raffle.ownerId,
        role: Role.OWNER,
      },
    );
  }
}
