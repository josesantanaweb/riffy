import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Plan } from '../../plans/entities/plan.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class PlanUsage {
  @Field(() => ID)
  id: string;

  @Field()
  currentRaffles: number;

  @Field({ nullable: true })
  currentTickets: number;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field()
  ownerId: string;

  @Field(() => [String])
  planId: string;

  @Field({ nullable: true })
  owner: User;

  @Field(() => GraphQLISODateTime, { nullable: true })
  plan: Plan;
}
