import { IsString, IsOptional, IsEnum, ValidateIf } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { PaymentMethodType } from '@prisma/client';
import '../../enums/payment-method-type.enum';

@InputType()
export class CreatePaymentMethodInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsEnum(['PAGO_MOVIL', 'BINANCE_PAY', 'PAYPAL'])
  @Field(() => String)
  type: PaymentMethodType;

  @ValidateIf((o: CreatePaymentMethodInput) => o.type === 'PAGO_MOVIL')
  @IsString()
  @Field(() => String, { nullable: true })
  bankName?: string;

  @ValidateIf((o: CreatePaymentMethodInput) => o.type === 'PAGO_MOVIL')
  @IsString()
  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @ValidateIf((o: CreatePaymentMethodInput) => o.type === 'PAGO_MOVIL')
  @IsString()
  @Field(() => String, { nullable: true })
  nationalId?: string;

  @ValidateIf((o: CreatePaymentMethodInput) => o.type === 'BINANCE_PAY')
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  binanceId?: string;

  @ValidateIf((o: CreatePaymentMethodInput) => o.type === 'BINANCE_PAY')
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  binanceEmail?: string;

  @ValidateIf((o: CreatePaymentMethodInput) => o.type === 'PAYPAL')
  @IsString()
  @Field(() => String, { nullable: true })
  paypalEmail?: string;

  @IsString()
  @Field()
  ownerId: string;
}
