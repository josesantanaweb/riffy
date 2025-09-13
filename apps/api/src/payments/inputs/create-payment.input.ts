import { IsOptional, IsString, IsArray } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { PaymentStatus } from '@prisma/client';

@InputType()
export class CreatePaymentInput {
  @IsString()
  @Field(() => String)
  buyerName: string;

  @IsString()
  @Field(() => String)
  phone: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  state?: string;

  @IsString()
  @Field(() => String)
  proofUrl: string;

  @IsString()
  @Field(() => String)
  paymentMethod: string;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  paymentDate?: Date;

  @IsArray()
  @IsString({ each: true })
  @Field(() => [String])
  ticketIds: string[];

  @IsOptional()
  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus;
}
