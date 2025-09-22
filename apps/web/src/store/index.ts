import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserState } from './userSlice';
import type { CartState } from './cartSlice';
import { createUserSlice } from './userSlice';
import { createCartSlice } from './cartSlice';

type StoreState = UserState & CartState;

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createUserSlice(set, get, api),
      ...createCartSlice(set, get, api),
    }),
    { name: 'app-store' },
  ),
);
