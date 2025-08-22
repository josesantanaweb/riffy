import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRaffleInput {
  @IsString()
  @Field()
  title: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsString()
  @Field()
  banner: string;

  @IsString()
  @Field()
  logo: string;

  @IsString()
  @Field()
  primaryColor: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  secondaryColor?: string;

  @IsInt()
  @Field()
  totalTickets: number;

  @IsInt()
  @Field()
  price: number;

  @Field()
  @IsDate()
  drawDate: Date;

  @IsString()
  @Field()
  ownerId: string;
}
