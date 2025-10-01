import { registerEnumType } from '@nestjs/graphql';
import { SubscriptionStatus } from '@prisma/client';

registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus',
  description: 'The status of the subscription',
});
