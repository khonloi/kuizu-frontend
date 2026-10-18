'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { api } from '@/lib/api';
import type { User } from '@/types/api.types';

export type SocialProvider = 'google' | 'facebook' | 'apple';

export interface UseSocialAuthOptions {
  mode: 'login' | 'register';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useSocialAuth({
  mode,
  onSuccess,
  onError,
}: UseSocialAuthOptions) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const { playSuccess, playError } = useAudioStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialAuth = async (provider: SocialProvider) => {
    setIsLoading(true);

    const email = `${provider}_learner@kuizu.app`;
    const endpoint = mode === 'login' ? '/api/v1/auth/login' : '/api/v1/auth/register';
    const payload =
      mode === 'login'
        ? { emailOrUsername: email, password: 'demo_password' }
        : { username: `${provider}_hero`, email, password: 'demo_password123' };

    try {
      const response = await api.post<{ user: User }>(endpoint, payload);

      if (response.user) {
        setUser(response.user);
      } else {
        const profile = await api.get<User>('/api/v1/users/me');
        setUser(profile);
      }

      playSuccess();
      if (onSuccess) onSuccess();
      router.push('/learn');
    } catch {
      try {
        // Graceful offline demo fallback
        const capitalizedProvider =
          provider.charAt(0).toUpperCase() + provider.slice(1);

        setUser({
          id: `demo-${provider}-user`,
          username: `${capitalizedProvider} ${mode === 'login' ? 'Learner' : 'Explorer'}`,
          email,
          role: 'user',
          xp: mode === 'login' ? 1200 : 100,
          hearts: 5,
          gems: 500,
          streak: { count: mode === 'login' ? 5 : 1, lastActiveDate: null },
          streakFreezes: mode === 'login' ? 1 : 2,
          league: 'Bronze',
        });

        playSuccess();
        if (onSuccess) onSuccess();
        router.push('/learn');
      } catch (err) {
        playError();
        const message = (err as Error).message || 'Social authentication failed.';
        if (onError) onError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSocialAuth,
    isLoading,
  };
}
