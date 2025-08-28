import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { RaffleStatus } from '@prisma/client';

registerEnumType(RaffleStatus, { name: 'RaffleStatus' });
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

  @IsString()
  @Field(() => String)
  primaryColor: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  secondaryColor?: string;

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

  @IsString()
  @Field()
  ownerId: string;
}
