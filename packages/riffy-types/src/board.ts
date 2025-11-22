import { Payment } from "./payment";
import { Bingo } from "./bingo";

export enum BoardStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  WINNER = 'WINNER',
  LOSER = 'LOSER',
  PREMIUM = 'PREMIUM',
}

export interface Board {
  id: string;
  number: string;
  status: string;
  payment?: Payment | null;
  bingo?: Bingo | null;
}
