import { IsString, IsNumber, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlanUsageInput {
  @IsString()
  @Field(() => String)
  ownerId: string;

  @IsString()
  @Field(() => String)
  planId: string;

  @IsNumber()
  @Field(() => Number)
  currentBingos: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  currentBoards?: number;
}
