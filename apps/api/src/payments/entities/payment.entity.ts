import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { PaymentStatus } from '@prisma/client';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string;

  @Field()
  buyerName: string;

  @Field()
  amount: number;

  @Field()
  nationalId: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDate?: Date;

  @Field()
  proofUrl: string;

  @Field()
  paymentMethod: string;

  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus;

  @Field(() => [Ticket], { nullable: true })
  tickets?: Ticket[];
}
