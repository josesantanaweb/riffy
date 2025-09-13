import type { StateCreator } from 'zustand';
import { CreatePaymentInput } from '@riffy/types';

export type PaymentState = {
  payment: CreatePaymentInput | null;
  setPayment: (payment: CreatePaymentInput) => void;
};

export const createPaymentSlice: StateCreator<PaymentState> = set => ({
  payment: null,
  setPayment: payment => set({ payment }),
});
