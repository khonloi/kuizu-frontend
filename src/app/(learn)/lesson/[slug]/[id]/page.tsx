import React from 'react';
import { notFound } from 'next/navigation';
import { getSampleLesson } from '@/mock/sample-courses';
import { LessonRunner } from '@/features/learn/lesson-runner';

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
