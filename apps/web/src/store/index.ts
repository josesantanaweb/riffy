import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserState } from './userSlice';
import type { PaymentState } from './paymentSlice';
import { createUserSlice } from './userSlice';
import { createPaymentSlice } from './paymentSlice';

type StoreState = UserState & PaymentState;

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createUserSlice(set, get, api),
      ...createPaymentSlice(set, get, api),
    }),
    { name: 'app-store' },
  ),
);
