import { IsDate, IsInt, IsOptional, IsString, IsNumber } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { BingoStatus } from '@prisma/client';

@InputType()
export class CreateBingoInput {
  @IsString()
  @Field(() => String)
  title: string;

  @IsString()
  @Field(() => String)
  banner: string;

  @IsInt()
  @Field(() => Int)
  totalBoards: number;

  @IsNumber()
  @Field(() => Int)
  price: number;

  @IsNumber()
  @Field(() => Int)
  award: number;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  showDate?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  showProgress?: boolean;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  minBoards?: number;

  @IsOptional()
  @Field(() => BingoStatus, { nullable: true })
  status?: BingoStatus;

  @Field(() => Date)
  @IsDate()
  drawDate: Date;
}
