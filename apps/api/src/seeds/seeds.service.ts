import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { loadJson } from '../utils/loadJson';
import { hash } from 'argon2';
import { Role, PaymentMethodType, RaffleStatus } from '@prisma/client';

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

@Injectable()
export class SeedsService {
  constructor(private readonly prisma: PrismaService) {}

  async executeSeed(): Promise<boolean> {
    await this.deleteDatabase();

    try {
      await this.seedUsers();
      await this.seedPaymentMethods();
      await this.seedRaffles();
    } catch {
      //
    }

    return true;
  }

  private async deleteDatabase(): Promise<void> {
    await this.prisma.ticket.deleteMany({});
    await this.prisma.raffle.deleteMany({});
    await this.prisma.paymentMethod.deleteMany({});
    await this.prisma.user.deleteMany({});
  }

  async seedUsers(): Promise<void> {
    const users = loadJson<UserSeedData[]>('users.json');
    for (const user of users) {
      const { password, ...userData } = user;
      const hashedPassword = await hash(password);
      await this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
          role: userData.role,
        },
      });
    }
  }

  async seedPaymentMethods(): Promise<void> {
    const demoUser = await this.prisma.user.findUnique({
      where: { domain: 'demo.com' },
    });

    if (!demoUser) return;

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
      where: { domain: 'demo.com' },
    });

    if (!demoUser) return;

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
}
