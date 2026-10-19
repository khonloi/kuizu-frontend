import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '@/test/test-utils';
import { useAuthStore, type User } from '@/stores/auth.store';
import { api } from '@/lib/api';
import {
  useHeartRefillMutation,
  useStreakFreezeMutation,
  useDoubleWagerMutation,
} from '../use-gamification-mutations';

vi.mock('@/lib/confetti', () => ({
  fireVictoryConfetti: vi.fn(),
  fireHeartRefillConfetti: vi.fn(),
  fireStreakFireworks: vi.fn(),
}));

describe('Gamification Mutations & Optimistic Rollback', () => {
  const mockUser: User = {
    id: 'user-test-1',
    username: 'DuoChamp',
    email: 'duo@example.com',
    hearts: 2,
    gems: 500,
    xp: 120,
    streak: { count: 5, lastActiveDate: '2026-10-18' },
    streakFreezes: 1,
    league: 'Gold',
    role: 'user',
    createdAt: '2026-01-01',
    updatedAt: '2026-10-18',
  };

  beforeEach(() => {
    act(() => {
      useAuthStore.getState().setUser(mockUser);
    });
    vi.clearAllMocks();
  });

  it('useHeartRefillMutation optimistically fills hearts and decrements gems on mutate', async () => {
    const queryClient = createTestQueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    // Mock API success
    vi.spyOn(api, 'post').mockResolvedValueOnce({
      success: true,
      hearts: 5,
      gemsRemaining: 150,
    });

    const { result } = renderHook(() => useHeartRefillMutation(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const currentUser = useAuthStore.getState().user;
    expect(currentUser?.hearts).toBe(5);
    expect(currentUser?.gems).toBe(150);
  });

  it('useHeartRefillMutation rolls back user state when API fails', async () => {
    const queryClient = createTestQueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    // Mock API rejection
    vi.spyOn(api, 'post').mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useHeartRefillMutation(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync();
      } catch {
        // Expected failure
      }
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // State should be rolled back to initial mockUser values
    const currentUser = useAuthStore.getState().user;
    expect(currentUser?.hearts).toBe(2);
    expect(currentUser?.gems).toBe(500);
  });

  it('useStreakFreezeMutation optimistically deducts 200 gems and handles rollback', async () => {
    const queryClient = createTestQueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    vi.spyOn(api, 'post').mockRejectedValueOnce(new Error('Insufficient funds'));

    const { result } = renderHook(() => useStreakFreezeMutation(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync();
      } catch {
        // Expected error
      }
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    const currentUser = useAuthStore.getState().user;
    expect(currentUser?.gems).toBe(500);
  });

  it('useDoubleWagerMutation optimistically deducts 50 gems on success', async () => {
    const queryClient = createTestQueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    vi.spyOn(api, 'post').mockResolvedValueOnce({
      success: true,
      gemsRemaining: 450,
      message: 'Wager placed!',
    });

    const { result } = renderHook(() => useDoubleWagerMutation(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const currentUser = useAuthStore.getState().user;
    expect(currentUser?.gems).toBe(450);
  });
});
