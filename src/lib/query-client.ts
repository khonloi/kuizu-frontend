import { QueryClient } from '@tanstack/react-query';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error && typeof error === 'object' && 'statusCode' in error) {
            const status = (error as { statusCode: number }).statusCode;
            if (status >= 400 && status < 500) return false;
          }
          return failureCount < 2;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
