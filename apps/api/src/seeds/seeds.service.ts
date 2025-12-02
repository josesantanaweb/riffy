import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { loadJson } from '../utils/loadJson';
import { hash } from 'argon2';
import {
  Role,
  PaymentMethodType,
  PlanType,
  RaffleStatus,
  PlanUsageStatus,
} from '@prisma/client';

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

interface RaffleSeedData {
  title: string;
  description?: string;
  banner: string;
  totalTickets: number;
  price: number;
  award: number;
  drawDate: string;
  status: RaffleStatus;
  showDate?: boolean;
  showProgress?: boolean;
  minTickets?: number;
}

interface PlanSeedData {
  name: string;
  description: string[];
  price: number;
  maxRaffles: number;
  maxTickets: number;
  type: PlanType;
}

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);
  private readonly host = process.env.HOST || 'localhost';

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
      await this.seedRaffles();
      await this.seedPlans();
      await this.seedPlanUsage();
    } catch (error) {
      this.logger.error('Error durante el seeding:', error);
      throw error;
    }

    return true;
  }

  private async deleteDatabase(): Promise<void> {
    await this.prisma.ticket.deleteMany({});
    await this.prisma.plan.deleteMany({});
    await this.prisma.raffle.deleteMany({});
    await this.prisma.paymentMethod.deleteMany({});
    await this.prisma.user.deleteMany({});
  }

  async seedUsers(): Promise<void> {
    const users = loadJson<UserSeedData[]>('users.json');
    for (const user of users) {
      try {
        const { password, ...userData } = user;
        const hashedPassword = await hash(password);
        const domain =
          userData.role === 'ADMIN' ? 'admin.bingly.website' : this.host;

        await this.prisma.user.upsert({
          where: { domain },
          update: {
            ...userData,
            domain,
            password: hashedPassword,
            role: userData.role,
          },
          create: {
            ...userData,
            domain,
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
      where: { domain: this.host },
    });

    if (!demoUser) {
      this.logger.error(
        `Usuario ${this.host} no encontrado para crear métodos de pago`,
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

  async seedRaffles(): Promise<void> {
    const demoUser = await this.prisma.user.findUnique({
      where: { domain: this.host },
    });

    if (!demoUser) {
      this.logger.error(`Usuario ${this.host} no encontrado para crear rifas`);
      return;
    }

    const raffles = loadJson<RaffleSeedData[]>('raffles.json');

    for (const raffle of raffles) {
      const raffleData = {
        ...raffle,
        ownerId: demoUser.id,
        status: raffle.status,
        drawDate: new Date(raffle.drawDate),
      };

      try {
        const createdRaffle = await this.prisma.raffle.create({
          data: raffleData,
        });

        const totalTicketsNumber = raffle.totalTickets;
        const maxLength = totalTicketsNumber.toString().length;

        const tickets = Array.from({ length: totalTicketsNumber }, (_, i) => ({
          number: `${i + 1}`.padStart(maxLength, '0'),
          raffleId: createdRaffle.id,
        }));

        await this.prisma.ticket.createMany({ data: tickets });
      } catch {
        //
      }
    }
  }

  async seedPlanUsage(): Promise<void> {
    const demoUser = await this.prisma.user.findUnique({
      where: { domain: this.host },
    });

    if (!demoUser) {
      this.logger.error(
        `Usuario ${this.host} no encontrado para crear plan usage`,
      );
      return;
    }

    const premiumPlan = await this.prisma.plan.findFirst({
      where: { type: 'PREMIUM' },
    });

    await this.prisma.user.update({
      where: { id: demoUser.id },
      data: { planId: premiumPlan.id },
    });

    try {
      await this.prisma.planUsage.create({
        data: {
          ownerId: demoUser.id,
          planId: premiumPlan.id,
          currentRaffles: 0,
          currentTickets: 0,
          status: PlanUsageStatus.ACTIVE,
        },
      });
    } catch {
      await this.prisma.planUsage.update({
        where: { ownerId: demoUser.id },
        data: {
          planId: premiumPlan.id,
          status: PlanUsageStatus.ACTIVE,
        },
      });
    }
  }

  async seedPlans(): Promise<void> {
    const plans = loadJson<PlanSeedData[]>('plans.json');
    for (const plan of plans) {
      await this.prisma.plan.create({ data: plan });
    }
  }
}
