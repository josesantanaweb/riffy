import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { loadJson } from '../utils/loadJson';
import { hash } from 'argon2';
import { Role, PaymentMethodType, PlanType, BingoStatus } from '@prisma/client';

interface UserSeedData {
  name: string;
  domain: string;
  email: string;
  password: string;
  role?: Role;
  logo?: string;
  brandColor?: string;
  whatsapp?: string;
  tiktok?: string;
  instagram?: string;
}

interface PaymentMethodSeedData {
  name: string;
  type: PaymentMethodType;
  bankName?: string;
  phoneNumber?: string;
  nationalId?: string;
  binanceId?: string;
  paypalEmail?: string;
}

interface BingoSeedData {
  title: string;
  banner: string;
  totalBoards: number;
  price: number;
  award: number;
  drawDate: string;
  status: BingoStatus;
  showDate?: boolean;
  showProgress?: boolean;
  minBoards?: number;
}

interface PlanSeedData {
  name: string;
  description: string[];
  price: number;
  maxBingos: number;
  maxBoards: number;
  type: PlanType;
}

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async checkUsers(): Promise<
    Array<{
      id: string;
      name: string;
      domain: string;
      email: string;
      role: Role;
    }>
  > {
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, domain: true, email: true, role: true },
    });
    return users;
  }

  async executeSeed(): Promise<boolean> {
    await this.deleteDatabase();

    try {
      await this.seedUsers();
      await this.seedPaymentMethods();
      await this.seedBingos();
      await this.seedPlans();
    } catch (error) {
      this.logger.error('Error durante el seeding:', error);
      throw error;
    }

    return true;
  }

  private async deleteDatabase(): Promise<void> {
    await this.prisma.board.deleteMany({});
    await this.prisma.payment.deleteMany({});
    await this.prisma.bingo.deleteMany({});
    await this.prisma.paymentMethod.deleteMany({});
    await this.prisma.planUsage.deleteMany({});
    await this.prisma.notification.deleteMany({});
    await this.prisma.plan.deleteMany({});
    await this.prisma.user.deleteMany({});
  }

  async seedUsers(): Promise<void> {
    const users = loadJson<UserSeedData[]>('users.json');
    for (const user of users) {
      try {
        const { password, ...userData } = user;
        const hashedPassword = await hash(password);

        await this.prisma.user.upsert({
          where: { domain: user.domain },
          update: {
            ...userData,
            password: hashedPassword,
            role: userData.role,
          },
          create: {
            ...userData,
            password: hashedPassword,
            role: userData.role,
          },
        });
      } catch (error) {
        this.logger.error(
          `Error creando usuario ${user.name} (${user.domain}):`,
          error,
        );
        throw error;
      }
    }
  }

  async seedPaymentMethods(): Promise<void> {
    const demoUser = await this.prisma.user.findUnique({
      where: { domain: 'riffy.website.com' },
    });

    if (!demoUser) {
      this.logger.error(
        'Usuario riffy.website.com no encontrado para crear métodos de pago',
      );
      return;
    }

    const paymentMethods = loadJson<PaymentMethodSeedData[]>(
      'payment-methods.json',
    );
    for (const paymentMethod of paymentMethods) {
      await this.prisma.paymentMethod.create({
        data: {
          ...paymentMethod,
          type: paymentMethod.type,
          ownerId: demoUser.id,
        },
      });
    }
  }

  async seedBingos(): Promise<void> {
    const demoUser = await this.prisma.user.findUnique({
      where: { domain: 'riffy.website.com' },
    });

    if (!demoUser) {
      this.logger.error(
        'Usuario riffy.website.com no encontrado para crear bingos',
      );
      return;
    }

    const bingos = loadJson<BingoSeedData[]>('bingos.json');

    for (const bingo of bingos) {
      const bingoData = {
        ...bingo,
        ownerId: demoUser.id,
        status: bingo.status,
        drawDate: new Date(bingo.drawDate),
      };

      try {
        const createdBingo = await this.prisma.bingo.create({
          data: bingoData,
        });

        const totalBoardsNumber = bingo.totalBoards;
        const maxLength = totalBoardsNumber.toString().length;

        const boards = Array.from({ length: totalBoardsNumber }, (_, i) => ({
          number: `${i + 1}`.padStart(maxLength, '0'),
          bingoId: createdBingo.id,
        }));

        await this.prisma.board.createMany({ data: boards });
      } catch {
        //
      }
    }
  }

  async seedPlans(): Promise<void> {
    const plans = loadJson<PlanSeedData[]>('plans.json');
    for (const plan of plans) {
      await this.prisma.plan.create({ data: plan });
    }
  }
}
