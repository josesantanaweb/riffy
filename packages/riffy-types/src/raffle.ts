import { Ticket } from './ticket';
import { User } from './user';

export enum RaffleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum DrawMode {
  MANUAL = 'MANUAL',
  RANDOM = 'RANDOM',
  BOTH = 'BOTH',
}

export interface Raffle {
  id: string;
  title: string;
  description?: string;
  banner: string;
  totalTickets: number;
  award: number;
  price: number;
  showDate?: boolean;
  showProgress?: boolean;
  minTickets?: number;
  drawDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
  sold?: number | null;
  available?: number | null;
  progress?: number | null;
  tickets?: Ticket[] | null;
  owner: User | null;
  status?: string;
  drawMode?: DrawMode;
}

export interface CreateRaffleInput {
  title: string;
  description?: string;
  drawDate: string;
  price: number;
  award?: number;
  totalTickets: number;
  status?: string;
  drawMode?: string;
  showDate?: boolean;
  showProgress?: boolean;
  minTickets?: number;
}

export type UpdateRaffleInput = Partial<CreateRaffleInput>;
