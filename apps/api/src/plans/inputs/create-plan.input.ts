import {
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsOptional,
} from 'class-validator';
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

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  maxBingos?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  maxBoards?: number;

  @IsEnum(PlanType)
  @Field(() => PlanType)
  type: PlanType;
}
