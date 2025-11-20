import { registerEnumType } from '@nestjs/graphql';
import { BoardStatus } from '@prisma/client';

registerEnumType(BoardStatus, {
  name: 'BoardStatus',
  description: 'The status of the board',
});
