import { Payment } from "./payment";

export interface TopBuyer {
  buyerName: string;
  nationalId: string;
  totalBoards: number;
  totalSpent: number;
}

export interface PaymentsByState {
  state: string;
  percentage: number;
}

export interface DashboardStats {
  totalBingos: number;
  soldBoards: number;
  unsoldBoards: number;
  totalWinners: number;
  totalEarnings: number;
  topBuyers: TopBuyer[];
  paymentsByState: PaymentsByState[];
  lastPayments: Payment[];
}
