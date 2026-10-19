'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Play, Gamepad2, RotateCcw, AlertCircle, BookOpen } from 'lucide-react';
import styles from './learn.module.css';
import { Card, Button, Badge } from '@/components/ui';
import { CurriculumPath } from './components/curriculum-path';
import { LearnSkeleton } from './components/learn-skeleton';
import { useAudioStore } from '@/stores/audio.store';
import { useCoursesQuery, useCourseQuery, useCompletedLessonsQuery } from '@/hooks/queries';
import { SAMPLE_JAPANESE_COURSE } from '@/mock/sample-courses';

export function LearnView() {
  const playPop = useAudioStore((s) => s.playPop);
  const [selectedSlug, setSelectedSlug] = useState<string>('japanese-foundations');

  const { data: courses = [] } = useCoursesQuery();
  const {
    data: course = SAMPLE_JAPANESE_COURSE,
    isLoading: isCourseLoading,
    error: courseError,
    refetch: refetchCourse,
  } = useCourseQuery(selectedSlug);

  const {
    data: completedLessonIds = ['lesson-1'],
    isLoading: isLessonsLoading,
  } = useCompletedLessonsQuery();

  if (isCourseLoading || isLessonsLoading) {
    return <LearnSkeleton />;
  }

  if (courseError && !course) {
    return (
      <Card padding="lg" className={styles.errorCard}>
        <div className={styles.errorContent}>
          <AlertCircle size={40} color="var(--duo-red)" />
          <h2 className={styles.errorTitle}>Failed to load course</h2>
          <p className={styles.errorSubtitle}>
            Unable to retrieve curriculum data. Please check your connection.
          </p>
          <Button
            variant="duo"
            onClick={() => void refetchCourse()}
            leftIcon={<RotateCcw size={18} />}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  // Determine active lesson to recommend
  const allLessons = course.units.flatMap((u) => u.lessons);
  const nextActive =
    allLessons.find((l) => !completedLessonIds.includes(l.id)) || allLessons[0];

  return (
    <div className={styles.container}>
      {/* Course Overview Banner */}
      <Card padding="lg" className={styles.bannerCard}>
        <div className={styles.bannerHeader}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Badge variant="duo" size="sm" icon={<Sparkles size={14} />} className={styles.bannerBadge}>
                ACTIVE COURSE • {course.title.toUpperCase()}
              </Badge>
              {courses.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <BookOpen size={16} color="var(--text-secondary)" />
                  <select
                    value={selectedSlug}
                    onChange={(e) => {
                      playPop();
                      setSelectedSlug(e.target.value);
                    }}
                    style={{
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                    }}
                  >
                    {courses.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <h1 className={styles.bannerTitle}>{course.title}</h1>
            <p className={styles.bannerDescription}>{course.description}</p>
          </div>

          <div className={styles.bannerActions}>
            <Link href="/arena/join" onClick={playPop}>
              <Button
                variant="kahoot"
                size="md"
                leftIcon={<Gamepad2 size={18} />}
              >
                Join Arena Battle
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.continueGroup}>
          <Link
            href={`/lesson/${course.slug}/${nextActive.id}`}
            onClick={playPop}
          >
            <Button variant="duo" size="lg" leftIcon={<Play size={20} />}>
              Continue: {nextActive.title} (+{nextActive.xpReward} XP)
            </Button>
          </Link>
        </div>
      </Card>

      {/* Dynamic Meandering Curriculum Skill Tree */}
      <CurriculumPath course={course} completedLessonIds={completedLessonIds} />
    </div>
  );
}
