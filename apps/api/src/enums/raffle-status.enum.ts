import { registerEnumType } from '@nestjs/graphql';
import { RaffleStatus } from '@prisma/client';

registerEnumType(RaffleStatus, {
  name: 'RaffleStatus',
  description: 'The status of the raffle',
});
