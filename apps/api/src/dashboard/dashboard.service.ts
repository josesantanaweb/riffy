import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardStats } from './entities/dashboard-stats.entity';
import { TopBuyer } from './entities/top-buyer.entity';
import { PaymentsByState } from './entities/payments-by-state.entity';
import { Payment } from '../payments/entities/payment.entity';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene las estadísticas del dashboard para el usuario logueado.
   * @param userId ID del usuario logueado
   * @returns Estadísticas del dashboard
   */
  async getStats(userId: string): Promise<DashboardStats> {
    const [
      totalBingos,
      soldBoards,
      unsoldBoards,
      totalWinners,
      totalEarnings,
      topBuyers,
      paymentsByState,
      lastPayments,
    ] = await Promise.all([
      this.getTotalBingos(userId),
      this.getSoldBoards(userId),
      this.getUnsoldBoards(userId),
      this.getTotalWinners(userId),
      this.getTotalEarnings(userId),
      this.getTopBuyers(userId),
      this.getPaymentsByState(userId),
      this.getLastPayments(userId),
    ]);

    return {
      totalBingos,
      soldBoards,
      unsoldBoards,
      totalWinners,
      totalEarnings,
      topBuyers,
      paymentsByState,
      lastPayments,
    };
  }

  /**
   * Obtiene el total de rifas creadas por el usuario.
   */
  private async getTotalBingos(userId: string): Promise<number> {
    return this.prisma.bingo.count({
      where: {
        ownerId: userId,
      },
    });
  }

  /**
   * Obtiene el total de cartones vendidos del usuario.
   */
  private async getSoldBoards(userId: string): Promise<number> {
    return this.prisma.board.count({
      where: {
        status: 'SOLD',
        bingo: {
          ownerId: userId,
        },
        payment: {
          status: 'VERIFIED',
        },
      },
    });
  }

  /**
   * Obtiene el total de cartones no vendidos del usuario.
   */
  private async getUnsoldBoards(userId: string): Promise<number> {
    return this.prisma.board.count({
      where: {
        status: {
          not: 'SOLD',
        },
        bingo: {
          ownerId: userId,
        },
      },
    });
  }

  /**
   * Obtiene el total de ganadores en las rifas del usuario.
   */
  private async getTotalWinners(userId: string): Promise<number> {
    return this.prisma.board.count({
      where: {
        status: 'WINNER',
        bingo: {
          ownerId: userId,
        },
      },
    });
  }

  /**
   * Obtiene el total de ganancias de pagos verificados del usuario.
   */
  private async getTotalEarnings(userId: string): Promise<number> {
    const paymentsVerified = await this.prisma.payment.aggregate({
      where: {
        status: 'VERIFIED',
        bingo: {
          ownerId: userId,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return paymentsVerified._sum.amount || 0;
  }

  /**
   * Obtiene los pagos agrupados por estado con sus porcentajes.
   */
  private async getPaymentsByState(userId: string): Promise<PaymentsByState[]> {
    const payments = await this.prisma.payment.findMany({
      where: {
        status: 'VERIFIED',
        bingo: {
          ownerId: userId,
        },
        state: {
          not: null,
        },
      },
      select: {
        state: true,
      },
    });

    const totalPayments = payments.length;

    if (totalPayments === 0) {
      return [];
    }

    const stateCountMap = new Map<string, number>();

    payments.forEach((payment) => {
      const state = payment.state || 'Sin Estado';
      const currentCount = stateCountMap.get(state) || 0;
      stateCountMap.set(state, currentCount + 1);
    });

    const paymentsByState = Array.from(stateCountMap.entries())
      .map(([state, count]) => ({
        state,
        percentage: Math.round((count / totalPayments) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return paymentsByState;
  }

  /**
   * Obtiene los últimos 5 pagos del usuario.
   */
  private async getLastPayments(userId: string): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: {
        bingo: {
          ownerId: userId,
        },
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        boards: true,
      },
    });
  }

  /**
   * Obtiene el top 3 de compradores con más cartones.
   */
  private async getTopBuyers(userId: string): Promise<TopBuyer[]> {
    const payments = await this.prisma.payment.findMany({
      where: {
        status: 'VERIFIED',
        bingo: {
          ownerId: userId,
        },
      },
      include: {
        boards: true,
      },
    });

    const buyersMap = new Map<
      string,
      {
        buyerName: string;
        nationalId: string;
        totalBoards: number;
        totalSpent: number;
      }
    >();

    payments.forEach((payment) => {
      const key = `${payment.buyerName}-${payment.nationalId || 'N/A'}`;
      const existingBuyer = buyersMap.get(key);

      if (existingBuyer) {
        existingBuyer.totalBoards += payment.boards.length;
        existingBuyer.totalSpent += payment.amount || 0;
      } else {
        buyersMap.set(key, {
          buyerName: payment.buyerName,
          nationalId: payment.nationalId || '',
          totalBoards: payment.boards.length,
          totalSpent: payment.amount || 0,
        });
      }
    });

    return Array.from(buyersMap.values())
      .sort((a, b) => b.totalBoards - a.totalBoards)
      .slice(0, 3);
  }
}
