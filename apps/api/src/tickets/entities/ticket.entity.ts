import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TicketStatus } from '@prisma/client';
import { Purchase } from '../../purchase/entities/purchase.entity';

@ObjectType()
export class Ticket {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field({ nullable: true })
  status?: TicketStatus;

  @Field(() => Purchase, { nullable: true })
  purchase?: Purchase;
}
