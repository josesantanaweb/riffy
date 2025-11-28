import { Board } from './board';
import { User } from './user';

export enum BingoStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface Bingo {
  id: string;
  title: string;
  description?: string | null;
  banner: string;
  totalBoards: number;
  award: number;
  price: number;
  drawnNumbers: number[];
  showDate?: boolean;
  showProgress?: boolean;
  minBoards?: number;
  drawDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
  sold?: number | null;
  available?: number | null;
  progress?: number | null;
  boards?: Board[] | null;
  owner: User | null;
  status?: string;
}

export interface CreateBingoInput {
  title: string;
  drawDate: string;
  price: number;
  award: number;
  totalBoards: number;
  status?: string;
  description?: string;
  showDate?: boolean;
  showProgress?: boolean;
  minBoards?: number;
}

export type UpdateBingoInput = Partial<CreateBingoInput>;
