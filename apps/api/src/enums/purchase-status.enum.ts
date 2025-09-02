import { registerEnumType } from '@nestjs/graphql';
import { PurchaseStatus } from '@prisma/client';

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'The status of the purchase',
});
