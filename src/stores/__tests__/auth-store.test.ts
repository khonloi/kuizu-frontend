import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../auth.store';
import type { User } from '@/types/api.types';

const mockUser: User = {
  id: 'u-123',
  email: 'learner@kuizu.test',
  username: 'SpeedLearner',
  role: 'user',
  xp: 150,
  streak: {
    count: 5,
    lastActiveDate: '2026-10-12',
  },
  streakFreezes: 1,
  hearts: 5,
  gems: 300,
  league: 'Silver',
};

describe('useAuthStore (Zustand Global State)', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('initializes with unauthenticated state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('sets user and updates isAuthenticated flag', () => {
    useAuthStore.getState().setUser(mockUser);
    const state = useAuthStore.getState();

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('updates hearts correctly', () => {
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().updateHearts(3);

    expect(useAuthStore.getState().user?.hearts).toBe(3);
  });

  it('updates gems correctly', () => {
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().updateGems(450);

    expect(useAuthStore.getState().user?.gems).toBe(450);
  });

  it('increments XP by delta amount correctly', () => {
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().updateXp(35);

    expect(useAuthStore.getState().user?.xp).toBe(185);
  });

  it('clears user session on logout', async () => {
    useAuthStore.getState().setUser(mockUser);
    await useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
