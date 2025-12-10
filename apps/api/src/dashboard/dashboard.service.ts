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
      totalRaffles,
      soldTickets,
      unsoldTickets,
      totalWinners,
      totalEarnings,
      topBuyers,
      paymentsByState,
      lastPayments,
    ] = await Promise.all([
      this.getTotalRaffles(userId),
      this.getSoldTickets(userId),
      this.getUnsoldTickets(userId),
      this.getTotalWinners(userId),
      this.getTotalEarnings(userId),
      this.getTopBuyers(userId),
      this.getPaymentsByState(userId),
      this.getLastPayments(userId),
    ]);

    return {
      totalRaffles,
      soldTickets,
      unsoldTickets,
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
  private async getTotalRaffles(userId: string): Promise<number> {
    return this.prisma.raffle.count({
      where: {
        ownerId: userId,
      },
    });
  }

  /**
   * Obtiene el total de tickets vendidos del usuario.
   */
  private async getSoldTickets(userId: string): Promise<number> {
    return this.prisma.ticket.count({
      where: {
        status: 'SOLD',
        raffle: {
          ownerId: userId,
        },
        payment: {
          status: 'VERIFIED',
        },
      },
    });
  }

  /**
   * Obtiene el total de tickets no vendidos del usuario.
   */
  private async getUnsoldTickets(userId: string): Promise<number> {
    return this.prisma.ticket.count({
      where: {
        status: {
          not: 'SOLD',
        },
        raffle: {
          ownerId: userId,
        },
      },
    });
  }

  /**
   * Obtiene el total de ganadores en las rifas del usuario.
   */
  private async getTotalWinners(userId: string): Promise<number> {
    return this.prisma.ticket.count({
      where: {
        status: 'WINNER',
        raffle: {
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
        raffle: {
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
        raffle: {
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
        raffle: {
          ownerId: userId,
        },
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        tickets: true,
      },
    });
  }

  /**
   * Obtiene el top 3 de compradores con más tickets.
   */
  private async getTopBuyers(userId: string): Promise<TopBuyer[]> {
    const payments = await this.prisma.payment.findMany({
      where: {
        status: 'VERIFIED',
        raffle: {
          ownerId: userId,
        },
      },
      include: {
        tickets: true,
      },
    });

    const buyersMap = new Map<
      string,
      {
        buyerName: string;
        nationalId: string;
        totalTickets: number;
        totalSpent: number;
      }
    >();

    payments.forEach((payment) => {
      const key = `${payment.buyerName}-${payment.nationalId || 'N/A'}`;
      const existingBuyer = buyersMap.get(key);

      if (existingBuyer) {
        existingBuyer.totalTickets += payment.tickets.length;
        existingBuyer.totalSpent += payment.amount || 0;
      } else {
        buyersMap.set(key, {
          buyerName: payment.buyerName,
          nationalId: payment.nationalId || '',
          totalTickets: payment.tickets.length,
          totalSpent: payment.amount || 0,
        });
      }
    });

    return Array.from(buyersMap.values())
      .sort((a, b) => b.totalTickets - a.totalTickets)
      .slice(0, 3);
  }
}
