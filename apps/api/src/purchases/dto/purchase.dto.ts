import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';
import { Ticket as TicketGQL } from '../../tickets/entities/ticket.entity';

@InputType()
export class PurchaseTicketsInput {
  @Field(() => String)
  raffleId: string;

  @Field(() => Int)
  quantity: number;
}

@ObjectType()
export class PurchaseResult {
  @Field(() => String)
  raffleId: string;

  @Field(() => String)
  buyerId: string;

  @Field(() => [TicketGQL])
  tickets: TicketGQL[];

  @Field(() => Number)
  totalPaid: number;

  @Field(() => String)
  message: string;
}
