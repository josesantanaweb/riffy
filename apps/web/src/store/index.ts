import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserState } from './userSlice';
import { createUserSlice } from './userSlice';

type StoreState = UserState;

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createUserSlice(set, get, api),
    }),
    { name: 'app-store' },
  ),
);
