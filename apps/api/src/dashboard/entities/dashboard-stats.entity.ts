import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { TopBuyer } from './top-buyer.entity';
import { PaymentsByState } from './payments-by-state.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@ObjectType()
export class DashboardStats {
  @Field(() => Int)
  totalBingos: number;

  @Field(() => Int)
  soldBoards: number;

  @Field(() => Int)
  unsoldBoards: number;

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
