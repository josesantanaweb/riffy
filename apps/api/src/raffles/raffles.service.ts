import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Raffle } from './entities/raffle.entity';
import { CreateRaffleInput } from './inputs/create-raffle.input';
import { UpdateRaffleInput } from './inputs/update-raffle.input';
import { TicketStatus, Role } from '@prisma/client';

@Injectable()
export class RafflesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todas las rifas registradas en la base de datos.
   * Los usuarios ADMIN ven todas las rifas, los OWNER solo ven las suyas.
   * @param user Usuario logueado con su ID y rol
   * @param ownerDomain (opcional) Dominio del owner para filtrar
   * @returns Arreglo de rifas con información de tickets (vendidos, disponibles, progreso)
   */
  async findAll(user?: { role: Role; domain: string }): Promise<Raffle[]> {
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

    const raffles = await this.prisma.raffle.findMany({
      where,
      include: {
        tickets: true,
        owner: true,
      },
    });

    return raffles.map((raffle) => {
      const totalTickets = raffle.tickets.length;
      const sold = raffle.tickets.filter(
        (t) => t.status === TicketStatus.SOLD,
      ).length;
      const available = raffle.tickets.filter(
        (t) => t.status === TicketStatus.AVAILABLE,
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
        owner: true,
      },
    });

    if (!raffle) {
      throw new NotFoundException(`Raffle with id ${id} not found`);
    }

    return raffle;
  }

  /**
   * Crea una nueva rifa.
   * El propietario (ownerId) se asigna automáticamente al usuario logueado.
   * Genera automáticamente todos los tickets numerados para la rifa.
   * @param data Datos de la nueva rifa (sin ownerId)
   * @param user Usuario logueado que será el propietario de la rifa
   * @returns La rifa creada con todos sus tickets
   */
  async create(
    data: CreateRaffleInput,
    user: { id: string; role: Role },
  ): Promise<Raffle> {
    const { totalTickets } = data;

    const ownerId = user.id;

    const raffleData = { ...data, ownerId };

    const raffle = await this.prisma.raffle.create({ data: raffleData });

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
   * @param user Usuario que actualiza la rifa
   * @returns La rifa actualizada
   */
  async update(
    id: string,
    data: UpdateRaffleInput,
    user: { id: string; role: Role },
  ): Promise<Raffle> {
    const raffle = await this.findOne(id);

    if (user.role !== Role.ADMIN && raffle.ownerId !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar esta rifa',
      );
    }

    return await this.prisma.raffle.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina los datos de una rifa existente.
   * @param id ID de la rifa a eliminar
   * @param user Usuario que elimina la rifa
   * @returns La rifa eliminada
   */
  async delete(id: string, user: { id: string; role: Role }): Promise<Raffle> {
    const raffle = await this.findOne(id);

    if (user.role !== Role.ADMIN && raffle.ownerId !== user.id) {
      throw new ForbiddenException('No tienes permiso para eliminar esta rifa');
    }

    await this.prisma.raffle.delete({
      where: {
        id,
      },
    });
    return raffle;
  }
}
