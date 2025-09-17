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
    } catch (error) {
      console.error('Error al ejecutar seeds:', error);
      throw error;
    }

    return true;
  }

  private async deleteDatabase(): Promise<void> {
    await this.prisma.user.deleteMany({});
  }

  async seedUsers() {
    const users = loadJson<any[]>('users.json');
    for (const user of users) {
      const { password, ...userData } = user;
      const hashedPassword = await hash(password);
      await this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword
        }
      });
    }
  }
}
