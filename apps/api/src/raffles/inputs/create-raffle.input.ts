import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { RaffleStatus } from '@prisma/client';

@InputType()
export class CreateRaffleInput {
  @IsString()
  @Field(() => String)
  title: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsString()
  @Field(() => String)
  banner: string;

  @IsInt()
  @Field(() => Int)
  totalTickets: number;

  @IsInt()
  @Field(() => Int)
  price: number;

  @IsInt()
  @Field(() => Int)
  award: number;

  @IsOptional()
  @Field(() => RaffleStatus, { nullable: true })
  status?: RaffleStatus;

  @Field()
  @IsDate()
  drawDate: Date;
}
