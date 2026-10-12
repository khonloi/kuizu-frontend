'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { LeaderboardEntry } from '@/types/gamification.types';

export const LEADERBOARD_QUERY_KEY = ['leaderboard'] as const;

export function useLeaderboardQuery() {
  return useQuery<LeaderboardEntry[]>({
    queryKey: LEADERBOARD_QUERY_KEY,
    queryFn: async () => {
      const data = await api.get<LeaderboardEntry[]>('/api/v1/leaderboard');
      return Array.isArray(data) ? data : [];
    },
    staleTime: 60 * 1000, // 1 minute fresh
    refetchOnWindowFocus: false,
  });
}
