import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethod } from './entities/payment-method.entity';
import { CreatePaymentMethodInput } from './inputs/create-payment-method.input';
import { UpdatePaymentMethodInput } from './inputs/update-payment-method.input';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los métodos de pago registrados en la base de datos.
   * @returns Arreglo de métodos de pago
   */
  async findAll(): Promise<PaymentMethod[]> {
    return await this.prisma.paymentMethod.findMany({
      include: {
        owner: true,
      },
    });
  }

  /**
   * Obtiene los métodos de pago de un usuario específico.
   * @param ownerId ID del propietario
   * @returns Arreglo de métodos de pago del usuario
   */
  async findByOwnerId(ownerId: string): Promise<PaymentMethod[]> {
    return await this.prisma.paymentMethod.findMany({
      where: {
        ownerId,
      },
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
   * Valida que los campos requeridos estén presentes según el tipo.
   * @param data Datos del nuevo método de pago
   * @returns El método de pago creado
   * @throws BadRequestException si faltan campos requeridos
   */
  async create(data: CreatePaymentMethodInput): Promise<PaymentMethod> {
    this.validateRequiredFields(data);

    return await this.prisma.paymentMethod.create({
      data,
      include: {
        owner: true,
      },
    });
  }

  /**
   * Actualiza los datos de un método de pago existente.
   * @param id ID del método de pago a actualizar
   * @param data Datos nuevos para el método de pago
   * @returns El método de pago actualizado
   * @throws BadRequestException si faltan campos requeridos
   */
  async update(
    id: string,
    data: UpdatePaymentMethodInput,
  ): Promise<PaymentMethod> {
    await this.findOne(id);

    // Si se está actualizando el tipo, validar campos requeridos
    if (data.type) {
      this.validateRequiredFields(data as CreatePaymentMethodInput);
    }

    return await this.prisma.paymentMethod.update({
      where: { id },
      data,
      include: {
        owner: true,
      },
    });
  }

  /**
   * Elimina los datos de un método de pago existente.
   * @param id ID del método de pago a eliminar
   * @returns El método de pago eliminado
   */
  async delete(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.findOne(id);
    await this.prisma.paymentMethod.delete({
      where: {
        id,
      },
    });
    return paymentMethod;
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
        if (!data.binanceId && !data.binanceEmail) {
          throw new BadRequestException(
            'Binance Pay requires either binanceId or binanceEmail',
          );
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
