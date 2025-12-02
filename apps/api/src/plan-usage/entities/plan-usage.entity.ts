import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Plan } from '../../plans/entities/plan.entity';
import { User } from '../../users/entities/user.entity';
import { PlanUsageStatus } from '@prisma/client';

@ObjectType()
export class PlanUsage {
  @Field(() => ID)
  id: string;

  @Field()
  currentBingos: number;

  @Field({ nullable: true })
  currentBoards: number;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field()
  ownerId: string;

  @Field(() => PlanUsageStatus)
  status: PlanUsageStatus;

  @Field(() => [String])
  planId: string;

  @Field(() => User, { nullable: true })
  owner?: User;

  @Field(() => Plan, { nullable: true })
  plan?: Plan;
}
