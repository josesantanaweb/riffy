import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

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
  logo: string;

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

  @Field()
  @IsDate()
  drawDate: Date;

  @IsString()
  @Field()
  ownerId: string;
}
