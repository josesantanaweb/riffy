import type { StateCreator } from 'zustand';

interface PaymentData {
  ticketIds: string[];
  amount: number;
  price: number;
  totalTickets: number;
}

export type PaymentState = {
  payment: PaymentData | null;
  setPayment: (payment: PaymentData) => void;
};

export const createPaymentSlice: StateCreator<PaymentState> = set => ({
  payment: null,
  setPayment: payment => set({ payment }),
});
