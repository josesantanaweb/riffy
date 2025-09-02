import { registerEnumType } from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'The status of the user',
});
