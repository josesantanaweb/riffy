import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { UpdatePaymentInput } from './inputs/update-payment.input';
import { PaymentStatus, TicketStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los payments registradas en la base de datos.
   * @returns Arreglo de payments
   */
  async findAll(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      include: {
        tickets: true,
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
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
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
          tickets: true,
        },
      });
    });

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
}
