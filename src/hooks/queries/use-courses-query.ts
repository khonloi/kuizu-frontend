'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { SAMPLE_JAPANESE_COURSE } from '@/mock/sample-courses';
import type { Course } from '@/types/api.types';

export const COURSES_QUERY_KEY = ['courses'] as const;
export const courseDetailQueryKey = (slug: string) => ['courses', slug] as const;

export function useCoursesQuery() {
  return useQuery<Course[]>({
    queryKey: COURSES_QUERY_KEY,
    queryFn: async () => {
      try {
        const data = await api.get<Course[]>('/api/v1/courses');
        return Array.isArray(data) && data.length > 0 ? data : [SAMPLE_JAPANESE_COURSE];
      } catch {
        return [SAMPLE_JAPANESE_COURSE];
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCourseQuery(slug: string) {
  return useQuery<Course>({
    queryKey: courseDetailQueryKey(slug),
    queryFn: async () => {
      try {
        const data = await api.get<Course>(`/api/v1/courses/${slug}`);
        return data || SAMPLE_JAPANESE_COURSE;
      } catch {
        return SAMPLE_JAPANESE_COURSE;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export const COMPLETED_LESSONS_QUERY_KEY = ['user', 'completed-lessons'] as const;

export function useCompletedLessonsQuery() {
  return useQuery<string[]>({
    queryKey: COMPLETED_LESSONS_QUERY_KEY,
    queryFn: async () => {
      try {
        const res = await api.get<{ completedLessonIds: string[] }>('/api/v1/users/me/progress');
        return res?.completedLessonIds ?? ['lesson-1'];
      } catch {
        return ['lesson-1'];
      }
    },
    staleTime: 60 * 1000,
  });
}
