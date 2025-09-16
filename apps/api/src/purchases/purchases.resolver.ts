import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchaseTicketsInput, PurchaseResult } from './dto/purchase.dto';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver()
export class PurchasesResolver {
  constructor(private purchasesService: PurchasesService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PurchaseResult, { name: 'purchaseTickets' })
  async purchaseTickets(
    @Args('input') input: PurchaseTicketsInput,
    @Context() ctx: any,
  ): Promise<PurchaseResult> {
    const user = ctx.req?.user ?? ctx.user;
    if (!user) throw new Error('Unauthenticated');

    const res = await this.purchasesService.purchaseTickets(input, {
      id: user.id,
      name: user.name ?? user.email,
      email: user.email,
      phone: user.phone,
    });

    return {
      raffleId: res.raffleId,
      buyerId: res.buyerId,
      tickets: res.tickets,
      totalPaid: res.totalPaid,
      message: res.message,
    } as any;
  }
}
