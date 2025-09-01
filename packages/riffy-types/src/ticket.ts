
export enum TicketStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
}

export interface Ticket {
  id: string;
  number: string;
  status: string;
}
