import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { PurchaseStatus } from '@prisma/client';

@InputType()
export class CreatePurchaseInput {
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

  @IsOptional()
  @Field(() => Date, { nullable: true })
  purchaseDate?: Date;

  @IsString()
  @Field(() => String)
  ticketId: string;

  @IsOptional()
  @Field(() => PurchaseStatus, { nullable: true })
  status?: PurchaseStatus;
}
