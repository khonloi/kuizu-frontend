'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import { SAMPLE_JAPANESE_COURSE } from '@/mock/sample-courses';
import type { Course } from '@/types/api.types';

export const COURSES_QUERY_KEY = queryKeys.courses.all;
export const courseDetailQueryKey = (slug: string) => queryKeys.courses.detail(slug);
export const COMPLETED_LESSONS_QUERY_KEY = queryKeys.courses.progress();

export function useCoursesQuery() {
  return useQuery<Course[]>({
    queryKey: queryKeys.courses.list(),
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
    queryKey: queryKeys.courses.detail(slug),
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

export function useCompletedLessonsQuery() {
  return useQuery<string[]>({
    queryKey: queryKeys.courses.progress(),
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
