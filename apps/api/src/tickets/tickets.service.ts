import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './inputs/create-ticket.input';
import { UpdateTicketInput } from './inputs/update-ticket.input';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los tickets registradas en la base de datos.
   * @returns Arreglo de tickets
   */
  async findAll(): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany({
      include: {
        payment: true,
      },
    });
    return tickets;
  }

  /**
   * Obtiene todos los tickets registrados en la base de datos por rifa.
   * @returns Arreglo de tickets
   */
  async findAllByRaffle(raffleId: string): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        raffleId,
      },
      include: {
        payment: true,
      },
    });
    return tickets;
  }

  /**
   * Busca un ticket por su ID.
   * @param id ID del ticket a buscar
   * @throws NotFoundException si el ticket no existe
   * @returns el ticket encontrado
   */
  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        payment: true,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }

    return ticket;
  }

  /**
   * Crea un nuevo ticket.
   * @param data Datos del nuevo ticket
   * @returns El ticket creado
   */
  async create(data: CreateTicketInput): Promise<Ticket> {
    return await this.prisma.ticket.create({ data });
  }

  /**
   * Actualiza los datos de un ticket existente.
   * @param id ID del ticket a actualizar
   * @param data Datos nuevos para el ticket
   * @returns El ticket actualizado
   */
  async update(id: string, data: UpdateTicketInput): Promise<Ticket> {
    await this.findOne(id);
    return await this.prisma.ticket.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina los datos de un ticket existente.
   * @param id ID del ticket a eliminar
   * @returns El ticket eliminado
   */
  async delete(id: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    await this.prisma.ticket.delete({
      where: {
        id,
      },
    });
    return ticket;
  }
}
