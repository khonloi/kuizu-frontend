'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import { SAMPLE_LEADERBOARD } from '@/mock/mock-handler';
import type { LeaderboardEntry } from '@/types/gamification.types';

export const LEADERBOARD_QUERY_KEY = queryKeys.leaderboard.all;

export function useLeaderboardQuery() {
  return useQuery<LeaderboardEntry[]>({
    queryKey: queryKeys.leaderboard.current(),
    queryFn: async () => {
      try {
        const data = await api.get<LeaderboardEntry[]>('/api/v1/leaderboard');
        return Array.isArray(data) && data.length > 0 ? data : SAMPLE_LEADERBOARD;
      } catch {
        return SAMPLE_LEADERBOARD;
      }
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
