import { Ticket } from './ticket';
import { User } from './user';

export enum RaffleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface Raffle {
  id: string;
  title: string;
  description?: string | null;
  banner: string;
  totalTickets: number;
  award: number;
  price: number;
  drawDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
  sold?: number | null;
  available?: number | null;
  progress?: number | null;
  tickets?: Ticket[] | null;
  owner: User | null;
  status?: string;
}

export interface CreateRaffleInput {
  title: string;
  drawDate: string;
  price: number;
  award: number;
  totalTickets: number;
  status?: string;
  description?: string;
  ownerId: string;
}
