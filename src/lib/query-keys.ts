/**
 * Type-Safe Hierarchical Query Key Factory for TanStack Query v5
 * Ensures consistent cache keys and granular cache invalidation across the application.
 */

export interface QuizQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  courses: {
    all: ['courses'] as const,
    list: () => [...queryKeys.courses.all, 'list'] as const,
    detail: (slug: string) => [...queryKeys.courses.all, 'detail', slug] as const,
    lesson: (slug: string, id: string) =>
      [...queryKeys.courses.all, 'detail', slug, 'lessons', id] as const,
    progress: () => [...queryKeys.courses.all, 'progress'] as const,
  },

  quizzes: {
    all: ['quizzes'] as const,
    list: (params?: QuizQueryParams) =>
      [...queryKeys.quizzes.all, 'list', params ?? {}] as const,
    detail: (id: string) => [...queryKeys.quizzes.all, 'detail', id] as const,
    myQuizzes: () => [...queryKeys.quizzes.all, 'my'] as const,
  },

  leaderboard: {
    all: ['leaderboard'] as const,
    current: () => [...queryKeys.leaderboard.all, 'current'] as const,
  },

  gamification: {
    all: ['gamification'] as const,
    inventory: () => [...queryKeys.gamification.all, 'inventory'] as const,
  },
} as const;
