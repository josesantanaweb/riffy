import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Raffle } from './entities/raffle.entity';
import { CreateRaffleInput } from './inputs/create-raffle.input';
import { UpdateRaffleInput } from './inputs/update-raffle.input';
import { Status } from '../tickets/enums/status.enum';

@Injectable()
export class RafflesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos las rifas registradas en la base de datos.
   * @returns Arreglo de rifas
   */
  async findAll(): Promise<Raffle[]> {
    const raffles = await this.prisma.raffle.findMany({
      include: {
        tickets: true,
      },
    });
    return raffles.map((raffle) => {
      const totalTickets = raffle.tickets.length;
      const sold = raffle.tickets.filter(
        (t) => t.status === Status.SOLD,
      ).length;

      const available = raffle.tickets.filter(
        (t) => t.status === Status.AVAILABLE,
      ).length;
      const progress = totalTickets > 0 ? (sold / totalTickets) * 100 : 0;

      return {
        ...raffle,
        sold,
        available,
        progress: Number(progress.toFixed(2)),
      };
    });
  }

  /**
   * Busca una rifa por su ID.
   * @param id ID de la rifa a buscar
   * @throws NotFoundException si la rifa no existe
   * @returns la rifa encontrada
   */
  async findOne(id: string): Promise<Raffle> {
    const raffle = await this.prisma.raffle.findUnique({
      where: {
        id,
      },
      include: {
        tickets: true,
      },
    });

    if (!raffle) {
      throw new NotFoundException(`Raffle with id ${id} not found`);
    }

    return raffle;
  }

  /**
   * Crea una nueva rifa.
   * @param data Datos de la nueva rifa
   * @returns La rifa creada
   */
  async create(data: CreateRaffleInput): Promise<Raffle> {
    const { totalTickets } = data;
    const raffle = await this.prisma.raffle.create({ data });

    const maxLength = totalTickets.toString().length;

    const tickets = Array.from({ length: totalTickets }, (_, i) => ({
      number: `${i + 1}`.padStart(maxLength, '0'),
      raffleId: raffle.id,
    }));

    await this.prisma.ticket.createMany({ data: tickets });

    return raffle;
  }

  /**
   * Actualiza los datos de una rifa existente.
   * @param id ID de la rifa a actualizar
   * @param data Datos nuevos para la rifa
   * @returns La rifa actualizada
   */
  async update(id: string, data: UpdateRaffleInput): Promise<Raffle> {
    await this.findOne(id);
    return await this.prisma.raffle.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina los datos de una rifa existente.
   * @param id ID de la rifa a eliminar
   * @returns La rifa eliminada
   */
  async delete(id: string): Promise<Raffle> {
    const raffle = await this.findOne(id);
    await this.prisma.raffle.delete({
      where: {
        id,
      },
    });
    return raffle;
  }
}
