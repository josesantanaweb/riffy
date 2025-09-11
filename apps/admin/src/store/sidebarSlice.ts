import type { StateCreator } from 'zustand';

export type SidebarState = {
  collapseSidebar: boolean;
  isMobileSidebarOpen: boolean;
  setCollapseSidebar: (collapseSidebar: boolean) => void;
  setMobileSidebarOpen: (isOpen: boolean) => void;
  toggleMobileSidebar: () => void;
};

export const createSidebarSlice: StateCreator<SidebarState> = set => ({
  collapseSidebar: false,
  isMobileSidebarOpen: false,
  setCollapseSidebar: collapseSidebar => set({ collapseSidebar }),
  setMobileSidebarOpen: isOpen => set({ isMobileSidebarOpen: isOpen }),
  toggleMobileSidebar: () => set(state => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
});
