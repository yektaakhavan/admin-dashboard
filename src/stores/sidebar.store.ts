import { create } from 'zustand';

// Shared UI state: is the mobile navigation drawer open?
// On desktop (lg and up) the sidebar is always visible, so this only
// controls the off-canvas drawer on small screens.
interface SidebarState {
  isMobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isMobileOpen: false,
  openMobile: () => set({ isMobileOpen: true }),
  closeMobile: () => set({ isMobileOpen: false }),
}));
