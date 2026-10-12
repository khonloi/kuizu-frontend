import { create } from 'zustand';

interface UiState {
  isHeartModalOpen: boolean;
  openHeartModal: () => void;
  closeHeartModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isHeartModalOpen: false,
  openHeartModal: () => set({ isHeartModalOpen: true }),
  closeHeartModal: () => set({ isHeartModalOpen: false }),
}));
