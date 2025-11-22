import type { StateCreator } from 'zustand';

interface CartData {
  boardIds: string[];
  amount: number;
  price: number;
  totalBoards: number;
  bingoTitle?: string;
  bingoId?: string;
}

export type CartState = {
  cart: CartData | null;
  setCart: (cart: CartData) => void;
};

export const createCartSlice: StateCreator<CartState> = set => ({
  cart: null,
  setCart: cart => set({ cart }),
});
