import { create } from 'zustand';
import { api } from '../lib/api';

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  avatarUrl?: string;
  xp: number;
  streak: { count: number; lastActiveDate: string | null };
  hearts: number;
  gems: number;
  league: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const user = await api.get<User>('/api/auth/me');
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
