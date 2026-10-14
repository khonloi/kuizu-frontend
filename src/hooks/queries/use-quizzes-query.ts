'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys, type QuizQueryParams } from '@/lib/query-keys';
import { SAMPLE_QUIZZES, type MockQuiz } from '@/mock/sample-quizzes';
import type { Quiz, PaginatedResponse } from '@/types/api.types';

/**
 * Adapter converting mock quiz to standard Quiz model
 */
function mapMockToQuiz(mock: MockQuiz): Quiz {
  return {
    id: mock.id,
    title: mock.title,
    description: mock.description,
    isPublic: true,
    questionCount: mock.questions.length,
    questions: mock.questions.map((q) => ({
      id: q.id,
      prompt: q.questionText,
      timeLimit: q.timeLimit,
      points: q.points,
      mediaUrl: q.mediaUrl,
      choices: q.choices.map((c) => ({
        id: c.id,
        text: c.text,
        isCorrect: c.isCorrect,
      })),
    })),
  };
}

export function useQuizzesQuery(params?: QuizQueryParams) {
  return useQuery<Quiz[]>({
    queryKey: queryKeys.quizzes.list(params),
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.set('page', String(params.page));
        if (params?.limit) queryParams.set('limit', String(params.limit));
        if (params?.search) queryParams.set('search', params.search);

        const qs = queryParams.toString();
        const endpoint = `/api/v1/quizzes${qs ? `?${qs}` : ''}`;
        const res = await api.get<PaginatedResponse<Quiz> | Quiz[]>(endpoint);

        const quizzes = Array.isArray(res) ? res : res?.data;
        if (Array.isArray(quizzes) && quizzes.length > 0) {
          return quizzes;
        }
        return SAMPLE_QUIZZES.map(mapMockToQuiz);
      } catch {
        return SAMPLE_QUIZZES.map(mapMockToQuiz);
      }
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useQuizDetailQuery(id: string) {
  return useQuery<Quiz | null>({
    queryKey: queryKeys.quizzes.detail(id),
    queryFn: async () => {
      try {
        const quiz = await api.get<Quiz>(`/api/v1/quizzes/${id}`);
        return quiz;
      } catch {
        const fallback = SAMPLE_QUIZZES.find((q) => q.id === id);
        return fallback ? mapMockToQuiz(fallback) : null;
      }
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}
