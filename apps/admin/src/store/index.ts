import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { SidebarState } from './sidebarSlice';
import { createSidebarSlice } from './sidebarSlice';

type StoreState = SidebarState & UserState;

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createSidebarSlice(set, get, api),
    }),
    { name: 'app-store' },
  ),
);
