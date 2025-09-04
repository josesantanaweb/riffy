import { registerEnumType } from '@nestjs/graphql';
import { PaymentStatus } from '@prisma/client';

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
  description: 'The status of the payment',
});
