import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethod } from './entities/payment-method.entity';
import { CreatePaymentMethodInput } from './inputs/create-payment-method.input';
import { UpdatePaymentMethodInput } from './inputs/update-payment-method.input';
import { PaymentMethodCreateData, PaymentMethodUpdateData } from './types';
import { Role } from '@prisma/client';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los métodos de pago registrados en la base de datos.
   * @param user Usuario logueado con su domain y rol
   * @param ownerDomain (opcional) Dominio del owner para filtrar
   * @returns Arreglo de métodos de pago
   */
  async findAll(
    user?: { role: Role; domain: string },
    ownerDomain?: string,
  ): Promise<PaymentMethod[]> {
    let where = {};

    if (ownerDomain) {
      where = {
        owner: {
          domain: ownerDomain,
        },
      };
    } else if (user) {
      if (user.role !== Role.ADMIN) {
        where = {
          owner: {
            domain: user.domain,
          },
        };
      }
    }

    return await this.prisma.paymentMethod.findMany({
      where,
      include: {
        owner: true,
      },
    });
  }

  /**
   * Busca un método de pago por su ID.
   * @param id ID del método de pago a buscar
   * @throws NotFoundException si el método de pago no existe
   * @returns el método de pago encontrado
   */
  async findOne(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
      },
    });

    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with id ${id} not found`);
    }

    return paymentMethod;
  }

  /**
   * Crea un nuevo método de pago.
   * El propietario (ownerId) se asigna automáticamente al usuario logueado.
   * Valida que los campos requeridos estén presentes según el tipo.
   * Si no se proporciona nombre, se asigna automáticamente según el tipo:
   * - PAGO_MOVIL → "Pago Móvil"
   * - BINANCE_PAY → "Binance"
   * - PAYPAL → "PayPal"
   * @param data Datos del nuevo método de pago (sin ownerId)
   * @param user Usuario logueado que será el propietario del método de pago
   * @returns El método de pago creado
   * @throws BadRequestException si faltan campos requeridos
   */
  async create(
    data: CreatePaymentMethodInput,
    user: { id: string; role: Role },
  ): Promise<PaymentMethod> {
    this.validateRequiredFields(data);

    const finalName = data.name || this.getNameByType(data.type);

    const ownerId = user.id;

    const paymentMethodData = this.formatCreateData(data, finalName, ownerId);

    return await this.prisma.paymentMethod.create({
      data: paymentMethodData,
      include: {
        owner: true,
      },
    });
  }

  /**
   * Actualiza los datos de un método de pago existente.
   * @param id ID del método de pago a actualizar
   * @param data Datos nuevos para el método de pago
   * @param user Usuario que actualiza el método de pago
   * @returns El método de pago actualizado
   * @throws BadRequestException si faltan campos requeridos
   */
  async update(
    id: string,
    data: UpdatePaymentMethodInput,
    user: { id: string; role: Role },
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.findOne(id);

    if (user.role !== Role.ADMIN && paymentMethod.ownerId !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar este método de pago',
      );
    }

    if (data.type) {
      this.validateRequiredFields(data as CreatePaymentMethodInput);
    }

    const finalName =
      data.type && !data.name ? this.getNameByType(data.type) : data.name;
    const paymentMethodData = this.formatUpdateData(data, finalName);

    return await this.prisma.paymentMethod.update({
      where: { id },
      data: paymentMethodData,
      include: {
        owner: true,
      },
    });
  }

  /**
   * Elimina los datos de un método de pago existente.
   * @param id ID del método de pago a eliminar
   * @param user Usuario que elimina el método de pago
   * @returns El método de pago eliminado
   */
  async delete(
    id: string,
    user: { id: string; role: Role },
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.findOne(id);

    if (user.role !== Role.ADMIN && paymentMethod.ownerId !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este método de pago',
      );
    }

    await this.prisma.paymentMethod.delete({
      where: {
        id,
      },
    });
    return paymentMethod;
  }

  /**
   * Obtiene el nombre automático según el tipo de método de pago.
   * @param type Tipo de método de pago
   * @returns Nombre del método de pago
   */
  private getNameByType(type: string): string {
    switch (type) {
      case 'PAGO_MOVIL':
        return 'Pago Móvil';
      case 'BINANCE_PAY':
        return 'Binance';
      case 'PAYPAL':
        return 'PayPal';
      default:
        return 'Método de Pago';
    }
  }

  /**
   * Convierte los datos del input a formato Prisma para creación.
   * @param data Datos del input
   * @param finalName Nombre final a usar
   * @param ownerId ID del propietario
   * @returns Datos formateados para Prisma
   */
  private formatCreateData(
    data: CreatePaymentMethodInput,
    finalName: string,
    ownerId: string,
  ): PaymentMethodCreateData {
    return {
      name: finalName,
      type: data.type,
      bankName: data.bankName || null,
      phoneNumber: data.phoneNumber || null,
      nationalId: data.nationalId || null,
      binanceId: data.binanceId || null,
      paypalEmail: data.paypalEmail || null,
      ownerId,
    };
  }

  /**
   * Convierte los datos del input a formato Prisma para actualización.
   * @param data Datos del input
   * @param finalName Nombre final a usar (opcional)
   * @returns Datos formateados para Prisma
   */
  private formatUpdateData(
    data: UpdatePaymentMethodInput,
    finalName?: string,
  ): PaymentMethodUpdateData {
    return {
      ...(finalName !== undefined && { name: finalName }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.bankName !== undefined && {
        bankName: data.bankName || null,
      }),
      ...(data.phoneNumber !== undefined && {
        phoneNumber: data.phoneNumber || null,
      }),
      ...(data.nationalId !== undefined && {
        nationalId: data.nationalId || null,
      }),
      ...(data.binanceId !== undefined && {
        binanceId: data.binanceId || null,
      }),
      ...(data.paypalEmail !== undefined && {
        paypalEmail: data.paypalEmail || null,
      }),
    };
  }

  /**
   * Valida que los campos requeridos estén presentes según el tipo de método de pago.
   * @param data Datos del método de pago
   * @throws BadRequestException si faltan campos requeridos
   */
  private validateRequiredFields(data: CreatePaymentMethodInput): void {
    switch (data.type) {
      case 'PAGO_MOVIL':
        if (!data.bankName || !data.phoneNumber || !data.nationalId) {
          throw new BadRequestException(
            'Pago Móvil requires bankName, phoneNumber, and nationalId',
          );
        }
        break;
      case 'BINANCE_PAY':
        if (!data.binanceId) {
          throw new BadRequestException('Binance Pay requires binanceId');
        }
        break;
      case 'PAYPAL':
        if (!data.paypalEmail) {
          throw new BadRequestException('PayPal requires paypalEmail');
        }
        break;
    }
  }
}
