import { IsOptional, IsString } from 'class-validator';
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

  @IsString()
  @Field(() => String)
  ticketId: string;

  @IsOptional()
  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus;
}
