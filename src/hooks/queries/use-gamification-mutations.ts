'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti, fireHeartRefillConfetti } from '@/lib/confetti';
import type { HeartRefillResult, StreakFreezePurchaseResult } from '@/types/gamification.types';

export function useHeartRefillMutation() {
  const queryClient = useQueryClient();
  const { user, updateHearts, updateGems } = useAuthStore();
  const { playSuccess, playError } = useAudioStore();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        // Guest mode fallback
        return { success: true, hearts: 5, gemsRemaining: 100 };
      }
      return api.post<HeartRefillResult>('/api/v1/users/me/hearts/refill');
    },
    onSuccess: (data) => {
      playSuccess();
      fireHeartRefillConfetti();
      updateHearts(data.hearts ?? 5);
      if (data.gemsRemaining !== undefined) {
        updateGems(data.gemsRemaining);
      } else if (user) {
        updateGems(Math.max(0, user.gems - 350));
      }
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      playError();
    },
  });
}

export function useStreakFreezeMutation() {
  const queryClient = useQueryClient();
  const { user, updateGems } = useAuthStore();
  const { playSuccess, playError } = useAudioStore();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        return { success: true, gemsRemaining: 100 };
      }
      return api.post<StreakFreezePurchaseResult>('/api/v1/users/me/streak/freeze');
    },
    onSuccess: (data) => {
      playSuccess();
      fireVictoryConfetti();
      if (data.gemsRemaining !== undefined) {
        updateGems(data.gemsRemaining);
      } else if (user) {
        updateGems(Math.max(0, user.gems - 200));
      }
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      playError();
    },
  });
}

export function useDoubleWagerMutation() {
  const queryClient = useQueryClient();
  const { user, updateGems } = useAuthStore();
  const { playSuccess, playError } = useAudioStore();

  return useMutation({
    mutationFn: async () => {
      return api.post<{ success: boolean; gemsRemaining?: number; message?: string }>(
        '/api/v1/users/me/wager/double'
      );
    },
    onSuccess: (data) => {
      playSuccess();
      fireVictoryConfetti();
      if (data.gemsRemaining !== undefined) {
        updateGems(data.gemsRemaining);
      } else if (user) {
        updateGems(Math.max(0, user.gems - 50));
      }
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      playError();
    },
  });
}
