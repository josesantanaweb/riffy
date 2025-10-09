import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { PaymentStatus } from '@prisma/client';

@InputType()
export class CreatePaymentInput {
  @IsString()
  @Field(() => String)
  buyerName: string;

  @IsString()
  @Field(() => String)
  nationalId: string;

  @IsString()
  @Field(() => String)
  phone: string;

  @IsNumber()
  @Field(() => Number)
  amount: number;

  @IsString()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  state?: string;

  @IsString()
  @Field(() => String)
  proofUrl: string;

  @IsString()
  @Field(() => String)
  paymentMethod: string;

  @IsArray()
  @IsString({ each: true })
  @Field(() => [String])
  ticketIds: string[];

  @IsString()
  @Field(() => String)
  raffleId: string;

  @IsOptional()
  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus;
}
