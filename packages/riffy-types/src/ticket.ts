
export enum TicketStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
  WINNER = 'WINNER',
  LOSER = 'LOSER',
}

export interface Ticket {
  id: string;
  number: string;
  status: string;
}
