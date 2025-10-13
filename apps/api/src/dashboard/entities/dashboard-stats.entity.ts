import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { TopBuyer } from './top-buyer.entity';
import { PaymentsByState } from './payments-by-state.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@ObjectType()
export class DashboardStats {
  @Field(() => Int)
  totalRaffles: number;

  @Field(() => Int)
  soldTickets: number;

  @Field(() => Int)
  unsoldTickets: number;

  @Field(() => Int)
  totalWinners: number;

  @Field(() => Float)
  totalEarnings: number;

  @Field(() => [TopBuyer])
  topBuyers: TopBuyer[];

  @Field(() => [PaymentsByState])
  paymentsByState: PaymentsByState[];

  @Field(() => [Payment])
  lastPayments: Payment[];
}
