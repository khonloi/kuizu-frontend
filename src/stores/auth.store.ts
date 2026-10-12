import { create } from 'zustand';
import { api } from '../lib/api';
import type { User } from '../types/api.types';

export type { User };

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  updateHearts: (hearts: number) => void;
  updateGems: (gems: number) => void;
  updateXp: (deltaXp: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const user = await api.get<User>('/api/v1/users/me');
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/api/v1/auth/logout');
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateHearts: (hearts) =>
    set((state) => (state.user ? { user: { ...state.user, hearts } } : state)),

  updateGems: (gems) =>
    set((state) => (state.user ? { user: { ...state.user, gems } } : state)),

  updateXp: (deltaXp) =>
    set((state) =>
      state.user
        ? { user: { ...state.user, xp: state.user.xp + deltaXp } }
        : state,
    ),
}));
