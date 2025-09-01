import { registerEnumType } from '@nestjs/graphql';
import { TicketStatus } from '@prisma/client';

registerEnumType(TicketStatus, {
  name: 'TicketStatus',
  description: 'The status of the ticket',
});
