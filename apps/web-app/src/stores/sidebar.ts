import create from "zustand";

interface sidebarState {
  isOpen: boolean;
  mobileShown: boolean;
  toggle: () => void;
  toggleMobile: () => void;
}

export const useSidebar = create<sidebarState>((set) => ({
  isOpen: false,
  mobileShown: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleMobile: () => set((state) => ({ mobileShown: !state.mobileShown })),
}));
