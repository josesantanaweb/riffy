/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { loadJson } from '../utils/loadJson';
import { hash } from 'argon2';

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

  async seedUsers() {
    const users = loadJson<any[]>('users.json');
    for (const user of users) {
      const { password, ...userData } = user;
      const hashedPassword = await hash(String(password));
      await this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    }
  }

  async seedPaymentMethods() {
    const demoUser = await this.prisma.user.findUnique({
      where: { domain: 'demo.com' },
    });

    if (!demoUser) return;

    const paymentMethods = loadJson<any[]>('payment-methods.json');
    for (const paymentMethod of paymentMethods) {
      await this.prisma.paymentMethod.create({
        data: {
          ...paymentMethod,
          ownerId: demoUser.id,
        },
      });
    }
  }

  async seedRaffles() {
    const demoUser = await this.prisma.user.findUnique({
      where: { domain: 'demo.com' },
    });

    if (!demoUser) return;

    const raffles = loadJson<any[]>('raffles.json');

    for (const raffle of raffles) {
      const raffleData = { ...raffle, ownerId: demoUser.id };

      try {
        await this.prisma.raffle.create({
          data: raffleData,
        });
      } catch {
        //
      }
    }
  }
}
