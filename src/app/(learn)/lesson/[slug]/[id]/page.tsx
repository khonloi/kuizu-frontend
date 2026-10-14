import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSampleLesson } from '@/mock/sample-courses';
import { LessonRunner } from '@/features/learn/lesson-runner';
import { api } from '@/lib/api';
import type { Lesson } from '@/types/api.types';

async function getLessonData(slug: string, id: string): Promise<Lesson | null> {
  try {
    const res = await api.get<Lesson>(`/api/v1/courses/${slug}/lessons/${id}`, { timeout: 3000 });
    if (res && res.id && Array.isArray(res.exercises) && res.exercises.length > 0) {
      return res;
    }
  } catch {
    // Fallback to local sample curriculum if backend is offline or during SSR
  }
  return getSampleLesson(slug, id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const lesson = await getLessonData(slug, id);

  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: `${lesson.title} - Quest`,
    description: `Complete the interactive ${lesson.title} quest (+${lesson.xpReward} XP) on Kuizu.`,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const lesson = await getLessonData(slug, id);

  if (!lesson) {
    notFound();
  }

  return <LessonRunner lesson={lesson} courseSlug={slug} />;
}
