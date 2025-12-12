import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { RaffleStatus, DrawMode } from '@prisma/client';

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

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  showDate?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  showProgress?: boolean;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  minTickets?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  award?: number;

  @IsOptional()
  @Field(() => RaffleStatus, { nullable: true })
  status?: RaffleStatus;

  @IsOptional()
  @Field(() => DrawMode, { nullable: true })
  drawMode?: DrawMode;

  @Field()
  @IsDate()
  drawDate: Date;
}
