import { registerEnumType } from '@nestjs/graphql';
import { BingoStatus } from '@prisma/client';

registerEnumType(BingoStatus, {
  name: 'BingoStatus',
  description: 'The status of the bingo',
});
