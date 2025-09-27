import { registerEnumType } from '@nestjs/graphql';
import { NotificationStatus } from '@prisma/client';

registerEnumType(NotificationStatus, {
  name: 'NotificationStatus',
  description: 'The status of the notifications',
});
