import { IsString, IsOptional } from 'class-validator';
import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { SubscriptionStatus } from '@prisma/client';

@InputType()
export class CreateSubscriptionInput {
  @IsOptional()
  @Field(() => SubscriptionStatus, { nullable: true })
  status?: SubscriptionStatus;

  @IsOptional()
  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date;

  @IsOptional()
  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: Date;

  @IsString()
  @Field(() => String)
  ownerId: string;

  @IsString()
  @Field(() => String)
  planId: string;
}
