import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { PlanType } from '@prisma/client';

@ObjectType()
export class Plan {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [String])
  description: string[];

  @Field()
  price: number;

  @Field()
  maxRaffles: number;

  @Field()
  maxTickets: number;

  @Field(() => PlanType)
  type: PlanType;

  @Field({ nullable: true })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date;
}
