import type { StateCreator } from 'zustand';

export type SidebarState = {
  collapseSidebar: boolean;
  setCollapseSidebar: (collapseSidebar: boolean) => void;
};

export const createSidebarSlice: StateCreator<SidebarState> = set => ({
  collapseSidebar: false,
  setCollapseSidebar: collapseSidebar => set({ collapseSidebar }),
});
