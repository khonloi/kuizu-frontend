'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import { useAuthStore, type User } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti, fireHeartRefillConfetti } from '@/lib/confetti';
import type { HeartRefillResult, StreakFreezePurchaseResult } from '@/types/gamification.types';

interface MutationRollbackContext {
  previousUser: User | null;
  previousQueryUser?: User | null;
}

export function useHeartRefillMutation() {
  const queryClient = useQueryClient();
  const { user, updateHearts, updateGems } = useAuthStore();
  const { playSuccess, playError } = useAudioStore();

  return useMutation<HeartRefillResult, Error, void, MutationRollbackContext>({
    mutationFn: async () => {
      if (!user) {
        // Guest mode fallback
        return {
          success: true,
          hearts: 5,
          gemsRemaining: 100,
          message: 'Hearts refilled successfully',
        };
      }
      return api.post<HeartRefillResult>('/api/v1/users/me/hearts/refill');
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.auth.all });
      await queryClient.cancelQueries({ queryKey: ['user'] });

      const previousUser = useAuthStore.getState().user;
      const previousQueryUser = queryClient.getQueryData<User | null>(queryKeys.auth.all);

      if (previousUser) {
        updateHearts(5);
        updateGems(Math.max(0, previousUser.gems - 350));
      }

      return { previousUser, previousQueryUser };
    },
    onError: (_err, _variables, context) => {
      playError();
      if (context?.previousUser) {
        useAuthStore.getState().setUser(context.previousUser);
      }
      if (context?.previousQueryUser !== undefined) {
        queryClient.setQueryData(queryKeys.auth.all, context.previousQueryUser);
      }
    },
    onSuccess: (data) => {
      playSuccess();
      fireHeartRefillConfetti();
      if (data.gemsRemaining !== undefined) {
        updateGems(data.gemsRemaining);
      }
      if (data.hearts !== undefined) {
        updateHearts(data.hearts);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useStreakFreezeMutation() {
  const queryClient = useQueryClient();
  const { user, updateGems } = useAuthStore();
  const { playSuccess, playError } = useAudioStore();

  return useMutation<StreakFreezePurchaseResult, Error, void, MutationRollbackContext>({
    mutationFn: async () => {
      if (!user) {
        return {
          success: true,
          streakFreezes: 1,
          gemsRemaining: 100,
          message: 'Streak freeze equipped',
        };
      }
      return api.post<StreakFreezePurchaseResult>('/api/v1/users/me/streak/freeze');
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.auth.all });
      await queryClient.cancelQueries({ queryKey: ['user'] });

      const previousUser = useAuthStore.getState().user;
      const previousQueryUser = queryClient.getQueryData<User | null>(queryKeys.auth.all);

      if (previousUser) {
        updateGems(Math.max(0, previousUser.gems - 200));
      }

      return { previousUser, previousQueryUser };
    },
    onError: (_err, _variables, context) => {
      playError();
      if (context?.previousUser) {
        useAuthStore.getState().setUser(context.previousUser);
      }
      if (context?.previousQueryUser !== undefined) {
        queryClient.setQueryData(queryKeys.auth.all, context.previousQueryUser);
      }
    },
    onSuccess: (data) => {
      playSuccess();
      fireVictoryConfetti();
      if (data.gemsRemaining !== undefined) {
        updateGems(data.gemsRemaining);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useDoubleWagerMutation() {
  const queryClient = useQueryClient();
  const { updateGems } = useAuthStore();
  const { playSuccess, playError } = useAudioStore();

  return useMutation<
    { success: boolean; gemsRemaining?: number; message?: string },
    Error,
    void,
    MutationRollbackContext
  >({
    mutationFn: async () => {
      return api.post<{ success: boolean; gemsRemaining?: number; message?: string }>(
        '/api/v1/users/me/wager/double'
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.auth.all });
      await queryClient.cancelQueries({ queryKey: ['user'] });

      const previousUser = useAuthStore.getState().user;
      const previousQueryUser = queryClient.getQueryData<User | null>(queryKeys.auth.all);

      if (previousUser) {
        updateGems(Math.max(0, previousUser.gems - 50));
      }

      return { previousUser, previousQueryUser };
    },
    onError: (_err, _variables, context) => {
      playError();
      if (context?.previousUser) {
        useAuthStore.getState().setUser(context.previousUser);
      }
      if (context?.previousQueryUser !== undefined) {
        queryClient.setQueryData(queryKeys.auth.all, context.previousQueryUser);
      }
    },
    onSuccess: (data) => {
      playSuccess();
      fireVictoryConfetti();
      if (data.gemsRemaining !== undefined) {
        updateGems(data.gemsRemaining);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
