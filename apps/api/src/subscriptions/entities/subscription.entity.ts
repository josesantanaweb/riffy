import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { SubscriptionStatus } from '@prisma/client';
import { Plan } from '../../plans/entities/plan.entity';

@ObjectType()
export class Subscription {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate: Date;

  @Field(() => SubscriptionStatus, { nullable: true })
  status: SubscriptionStatus;

  @Field(() => Plan, { nullable: true })
  plan?: Plan;
}
