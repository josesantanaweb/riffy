import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseInput } from './inputs/create-purchase.input';
import { UpdatePurchaseInput } from './inputs/update-purchase.input';
import { TicketStatus } from '@prisma/client';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los purchases registradas en la base de datos.
   * @returns Arreglo de purchases
   */
  async findAll(): Promise<Purchase[]> {
    const purchases = await this.prisma.purchase.findMany({
      include: {
        ticket: true,
      },
    });
    return purchases;
  }

  /**
   * Busca un purchase por su ID.
   * @param id ID del purchase a buscar
   * @throws NotFoundException si el purchase no existe
   * @returns el purchase encontrado
   */
  async findOne(id: string): Promise<Purchase> {
    const purchase = await this.prisma.purchase.findUnique({
      where: {
        id,
      },
      include: {
        ticket: true,
      },
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }

    return purchase;
  }

  /**
   * Crea un nuevo purchase.
   * @param data Datos del nuevo purchase
   * @returns El purchase creado
   */
  async create(data: CreatePurchaseInput): Promise<Purchase> {
    const purchase = await this.prisma.purchase.create({ data });

    await this.prisma.ticket.update({
      where: { id: data.ticketId },
      data: { status: TicketStatus.SOLD },
    });

    return purchase;
  }

  /**
   * Actualiza los datos de un purchase existente.
   * @param id ID del purchase a actualizar
   * @param data Datos nuevos para el purchase
   * @returns El purchase actualizado
   */
  async update(id: string, data: UpdatePurchaseInput): Promise<Purchase> {
    await this.findOne(id);
    return await this.prisma.purchase.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina los datos de un purchase existente.
   * @param id ID del purchase a eliminar
   * @returns El purchase eliminado
   */
  async delete(id: string): Promise<Purchase> {
    const purchase = await this.findOne(id);
    await this.prisma.purchase.delete({
      where: {
        id,
      },
    });
    return purchase;
  }
}
