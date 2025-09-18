import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';
import { RaffleStatus } from '@prisma/client';

@ObjectType()
export class Raffle {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  banner: string;

  @Field()
  totalTickets: number;

  @Field()
  price: number;

  @Field()
  award: number;

  @Field()
  status: RaffleStatus;

  @Field({ nullable: true })
  showDate?: boolean;

  @Field({ nullable: true })
  showProgress?: boolean;

  @Field({ nullable: true })
  minTickets?: number;

  @Field({ nullable: true })
  available?: number;

  @Field({ nullable: true })
  sold?: number;

  @Field({ nullable: true })
  progress?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  drawDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => [Ticket], { nullable: true })
  tickets?: Ticket[];

  @Field(() => User, { nullable: true })
  owner?: User;

  @Field()
  ownerId?: string;
}
