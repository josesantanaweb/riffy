import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { PurchaseStatus } from '@prisma/client';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field()
  buyerName: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  state?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  purchaseDate?: Date;

  @Field()
  proofUrl: string;

  @Field(() => PurchaseStatus, { nullable: true })
  status?: PurchaseStatus;

  @Field(() => Ticket, { nullable: true })
  ticket?: Ticket;
}
