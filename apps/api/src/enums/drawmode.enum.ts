import { registerEnumType } from '@nestjs/graphql';
import { DrawMode } from '@prisma/client';

registerEnumType(DrawMode, {
  name: 'DrawMode',
  description: 'The status of the raffle',
});
