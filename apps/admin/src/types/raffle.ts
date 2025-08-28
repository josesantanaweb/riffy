import { Ticket } from './ticket';
import { User } from './user';

export interface Raffle {
  id: string;
  title: string;
  description?: string | null;
  banner: string;
  logo: string;
  primaryColor?: string;
  secondaryColor?: string | null;
  totalTickets: number;
  price: number;
  drawDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
  sold?: number | null;
  available?: number | null;
  progress?: number | null;
  tickets?: Ticket[] | null;
  image: string;
  owner: User | null;
  award: number;
  date?: Date;
  status?: string;
}
