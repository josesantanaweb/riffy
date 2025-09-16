import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { PurchaseTicketsInput } from './dto/purchase.dto';

@Injectable()
export class PurchasesService {
  private readonly logger = new Logger(PurchasesService.name);

  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async purchaseTickets(
    input: PurchaseTicketsInput,
    buyer: { id: string; name: string; email?: string; phone?: string },
  ) {
    const { raffleId, quantity } = input;
    if (quantity <= 0) throw new BadRequestException('Quantity must be > 0');

    // Transaction for creating tickets and purchase records
    const result = await (this.prisma as any).$transaction(async (tx: any) => {
      const raffle = await tx.raffle.findUnique({
        where: { id: raffleId },
        include: { owner: true },
      });
      if (!raffle) throw new BadRequestException('Raffle not found');

      const available = Number(
        raffle.available ?? raffle.totalTickets - (raffle.sold ?? 0),
      );
      if (available < quantity)
        throw new BadRequestException('Not enough tickets available');

      const existingCount = await tx.ticket.count({ where: { raffleId } });
      const ticketsCreated: any[] = [];
      const ticketNumbers: string[] = [];

      for (let i = 1; i <= quantity; i++) {
        const seq = existingCount + i;
        const number = String(seq).padStart(4, '0');
        const ticket = await tx.ticket.create({
          data: { number, status: 'SOLD', raffleId },
        });
        await tx.ticketPurchase.create({
          data: {
            buyerName: buyer.name,
            buyerId: buyer.id,
            phone: buyer.phone ?? null,
            state: null,
            ticketId: ticket.id,
          },
        });
        ticketsCreated.push(ticket);
        ticketNumbers.push(number);
      }

      const newSold = Number(raffle.sold ?? 0) + quantity;
      const newAvailable =
        Number(raffle.available ?? raffle.totalTickets) - quantity;
      const progress = Math.min(
        100,
        (newSold / Number(raffle.totalTickets)) * 100,
      );

      await tx.raffle.update({
        where: { id: raffleId },
        data: { sold: newSold, available: newAvailable, progress },
      });

      return {
        raffle,
        tickets: ticketsCreated,
        ticketNumbers,
        totalPaid: Number(raffle.price) * quantity,
      };
    });

    // After transaction, send emails (best-effort)
    const purchaseDate = new Date().toISOString();
    try {
      const buyerEmail = buyer.email;
      const sellerEmail = result.raffle.owner?.email;
      const raffleUrl = `${process.env.APP_URL || 'http://localhost:3000'}/raffles/${result.raffle.id}`;

      if (buyerEmail) {
        await this.mailService.sendPurchaseBuyer({
          to: buyerEmail,
          raffleTitle: result.raffle.title,
          ticketNumbers: result.ticketNumbers,
          price: Number(result.raffle.price),
          totalPaid: result.totalPaid,
          buyerName: buyer.name,
          purchaseDate,
          raffleUrl,
        });
      }

      if (sellerEmail) {
        await this.mailService.sendPurchaseSeller({
          to: sellerEmail,
          raffleTitle: result.raffle.title,
          ticketNumbers: result.ticketNumbers,
          price: Number(result.raffle.price),
          totalPaid: result.totalPaid,
          buyerName: buyer.name,
          sellerName: result.raffle.owner?.name ?? 'Vendedor',
          purchaseDate,
          raffleUrl,
        });
      }
    } catch (mailErr) {
      this.logger.error(
        'Error sending purchase emails: ' + (mailErr as any)?.message,
        mailErr as any,
      );
    }

    return {
      raffleId: result.raffle.id,
      buyerId: buyer.id,
      tickets: result.tickets,
      totalPaid: result.totalPaid,
      message: 'Purchase successful',
    };
  }
}
