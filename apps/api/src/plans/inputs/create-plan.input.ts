import { IsString, IsNumber, IsEnum, IsArray } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { PlanType } from '@prisma/client';

@InputType()
export class CreatePlanInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsArray()
  @IsString({ each: true })
  @Field(() => [String])
  description: string[];

  @IsNumber()
  @Field(() => Number)
  price: number;

  @IsNumber()
  @Field(() => Number, { nullable: true })
  maxRaffles: number;

  @IsNumber()
  @Field(() => Number, { nullable: true })
  maxTickets: number;

  @IsEnum(PlanType)
  @Field(() => PlanType)
  type: PlanType;
}
