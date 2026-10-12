'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Play, Gamepad2, RotateCcw, AlertCircle } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { CurriculumPath } from '@/features/learn/components/curriculum-path';
import { useAudioStore } from '@/stores/audio.store';
import { useCourseQuery, useCompletedLessonsQuery } from '@/hooks/queries';
import { SAMPLE_JAPANESE_COURSE } from '@/mock/sample-courses';

export default function LearnPage() {
  const playPop = useAudioStore((s) => s.playPop);
  const {
    data: course = SAMPLE_JAPANESE_COURSE,
    isLoading: isCourseLoading,
    error: courseError,
    refetch: refetchCourse,
  } = useCourseQuery('japanese-foundations');

  const {
    data: completedLessonIds = ['lesson-1'],
    isLoading: isLessonsLoading,
  } = useCompletedLessonsQuery();

  if (isCourseLoading || isLessonsLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Card
          padding="lg"
          style={{
            height: '220px',
            background: 'rgba(23, 32, 54, 0.4)',
            borderColor: 'var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid rgba(88, 204, 2, 0.2)',
              borderTopColor: 'var(--duo-green)',
            }}
            className="animate-spin"
          />
        </Card>
      </div>
    );
  }

  if (courseError && !course) {
    return (
      <Card padding="lg" style={{ textAlign: 'center', borderColor: 'var(--duo-red)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <AlertCircle size={40} color="var(--duo-red)" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Failed to load course</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Unable to retrieve curriculum data. Please check your connection.</p>
          <Button variant="duo" onClick={() => void refetchCourse()} leftIcon={<RotateCcw size={18} />}>
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  // Determine active lesson to recommend
  const allLessons = course.units.flatMap((u) => u.lessons);
  const nextActive = allLessons.find((l) => !completedLessonIds.includes(l.id)) || allLessons[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Course Overview Banner */}
      <Card
        padding="lg"
        glow="duo"
        style={{
          background: 'linear-gradient(135deg, rgba(88, 204, 2, 0.15) 0%, rgba(23, 32, 54, 0.9) 100%)',
          borderColor: 'rgba(88, 204, 2, 0.35)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <Badge variant="duo" size="sm" icon={<Sparkles size={14} />}>
              ACTIVE COURSE • FOUNDATIONS
            </Badge>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginTop: '0.4rem', letterSpacing: '-0.02em' }}>
              {course.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem', maxWidth: '580px', lineHeight: 1.5 }}>
              {course.description}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/arena/join" onClick={playPop}>
              <Button variant="kahoot" size="md" leftIcon={<Gamepad2 size={18} />}>
                Join Arena Battle
              </Button>
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href={`/lesson/${course.slug}/${nextActive.id}`} onClick={playPop}>
            <Button
              variant="duo"
              size="lg"
              leftIcon={<Play size={20} />}
            >
              Continue: {nextActive.title} (+{nextActive.xpReward} XP)
            </Button>
          </Link>
        </div>
      </Card>

      {/* Dynamic Meandering Curriculum Skill Tree */}
      <CurriculumPath
        course={course}
        completedLessonIds={completedLessonIds}
      />
    </div>
  );
}
