import { Payment } from "./payment";

export interface TopBuyer {
  buyerName: string;
  nationalId: string;
  totalTickets: number;
  totalSpent: number;
}

export interface PaymentsByState {
  state: string;
  percentage: number;
}

export interface DashboardStats {
  totalRaffles: number;
  soldTickets: number;
  unsoldTickets: number;
  totalWinners: number;
  totalEarnings: number;
  topBuyers: TopBuyer[];
  paymentsByState: PaymentsByState[];
  lastPayments: Payment[];
}
