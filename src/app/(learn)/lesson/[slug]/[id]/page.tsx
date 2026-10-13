import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSampleLesson } from '@/mock/sample-courses';
import { LessonRunner } from '@/features/learn/lesson-runner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const lesson = getSampleLesson(slug, id);

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
  const lesson = getSampleLesson(slug, id);

  if (!lesson) {
    notFound();
  }

  return <LessonRunner lesson={lesson} courseSlug={slug} />;
}
