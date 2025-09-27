import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TicketStatus } from '@prisma/client';
import { Payment } from '../../payments/entities/payment.entity';
import { Raffle } from '../../raffles/entities/raffle.entity';

@ObjectType()
export class Ticket {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field({ nullable: true })
  status?: TicketStatus;

  @Field(() => Payment, { nullable: true })
  payment?: Payment;

  @Field(() => Raffle, { nullable: true })
  raffle?: Raffle;
}
