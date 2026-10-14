'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import { useAuthStore } from '@/stores/auth.store';
import type { User } from '@/types/api.types';

export function useCurrentUserQuery() {
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery<User | null>({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      try {
        const user = await api.get<User>('/api/v1/users/me');
        if (user) {
          setUser(user);
        }
        return user;
      } catch {
        return null;
      }
    },
    staleTime: 2 * 60 * 1000,
  });
}
