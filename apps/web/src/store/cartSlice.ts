import type { StateCreator } from 'zustand';

interface CartData {
  ticketIds: string[];
  amount: number;
  price: number;
  totalTickets: number;
  raffleTitle?: string;
  raffleId?: string;
}

export type CartState = {
  cart: CartData | null;
  setCart: (cart: CartData) => void;
};

export const createCartSlice: StateCreator<CartState> = set => ({
  cart: null,
  setCart: cart => set({ cart }),
});
