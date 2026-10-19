import { create } from 'zustand';

export type AnnouncePoliteness = 'polite' | 'assertive';

export interface AnnouncerState {
  message: string;
  politeness: AnnouncePoliteness;
  announce: (message: string, politeness?: AnnouncePoliteness) => void;
  clear: () => void;
}

export const useAnnouncerStore = create<AnnouncerState>((set) => ({
  message: '',
  politeness: 'polite',
  announce: (message: string, politeness: AnnouncePoliteness = 'polite') =>
    set({ message, politeness }),
  clear: () => set({ message: '' }),
}));
