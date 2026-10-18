'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti, fireHeartRefillConfetti } from '@/lib/confetti';
import type { HeartRefillResult, StreakFreezePurchaseResult } from '@/types/gamification.types';

function useGamificationContext() {
  const queryClient = useQueryClient();
  const { user, updateHearts, updateGems } = useAuthStore();
  const { playSuccess, playError } = useAudioStore();

  const handleSuccess = (
    gemsRemaining: number | undefined,
    fallbackCost: number,
    confettiFn: () => void = fireVictoryConfetti,
    customAction?: () => void
  ) => {
    playSuccess();
    confettiFn();
    customAction?.();
    if (gemsRemaining !== undefined) {
      updateGems(gemsRemaining);
    } else if (user) {
      updateGems(Math.max(0, user.gems - fallbackCost));
    }
    void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    void queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  return {
    user,
    updateHearts,
    updateGems,
    playError,
    handleSuccess,
  };
}

export function useHeartRefillMutation() {
  const { user, updateHearts, playError, handleSuccess } = useGamificationContext();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        // Guest mode fallback
        return { success: true, hearts: 5, gemsRemaining: 100 };
      }
      return api.post<HeartRefillResult>('/api/v1/users/me/hearts/refill');
    },
    onSuccess: (data) => {
      handleSuccess(data.gemsRemaining, 350, fireHeartRefillConfetti, () => {
        updateHearts(data.hearts ?? 5);
      });
    },
    onError: () => {
      playError();
    },
  });
}

export function useStreakFreezeMutation() {
  const { user, playError, handleSuccess } = useGamificationContext();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        return { success: true, gemsRemaining: 100 };
      }
      return api.post<StreakFreezePurchaseResult>('/api/v1/users/me/streak/freeze');
    },
    onSuccess: (data) => {
      handleSuccess(data.gemsRemaining, 200, fireVictoryConfetti);
    },
    onError: () => {
      playError();
    },
  });
}

export function useDoubleWagerMutation() {
  const { playError, handleSuccess } = useGamificationContext();

  return useMutation({
    mutationFn: async () => {
      return api.post<{ success: boolean; gemsRemaining?: number; message?: string }>(
        '/api/v1/users/me/wager/double'
      );
    },
    onSuccess: (data) => {
      handleSuccess(data.gemsRemaining, 50, fireVictoryConfetti);
    },
    onError: () => {
      playError();
    },
  });
}
