import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsResolver } from './payment-methods.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PaymentMethodsResolver, PaymentMethodsService, PrismaService],
})
export class PaymentMethodsModule {}
