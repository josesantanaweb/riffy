import { Payment } from "./payment";
import { Raffle } from "./raffle";

export enum TicketStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  WINNER = 'WINNER',
  LOSER = 'LOSER',
  PREMIUM = 'PREMIUM',
}

export interface Ticket {
  id: string;
  number: string;
  status: string;
  payment?: Payment | null;
  raffle?: Raffle | null;
}
