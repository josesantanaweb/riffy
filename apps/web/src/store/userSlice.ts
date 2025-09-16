import type { StateCreator } from 'zustand';
import { User } from '@riffy/types';

export type UserState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
};

export const createUserSlice: StateCreator<UserState> = set => ({
  user: null,
  loading: true,
  setUser: user => set({ user }),
  setLoading: loading => set({ loading }),
});
