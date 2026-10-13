'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Sparkles, Play, Gamepad2, RotateCcw, AlertCircle } from 'lucide-react';
import styles from './learn.module.css';
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
      <div className={styles.container}>
        <Card padding="lg" className={styles.loadingCard}>
          <div className={clsx(styles.loadingSpinner, 'animate-spin')} />
        </Card>
      </div>
    );
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
    <div className={styles.container}>
      {/* Course Overview Banner */}
      <Card
        padding="lg"
        glow="duo"
        className={styles.bannerCard}
      >
        <div className={styles.bannerHeader}>
          <div>
            <Badge variant="duo" size="sm" icon={<Sparkles size={14} />}>
              ACTIVE COURSE • FOUNDATIONS
            </Badge>
            <h1 className={styles.bannerTitle}>
              {course.title}
            </h1>
            <p className={styles.bannerDescription}>
              {course.description}
            </p>
          </div>

          <div className={styles.bannerActions}>
            <Link href="/arena/join" onClick={playPop}>
              <Button variant="kahoot" size="md" leftIcon={<Gamepad2 size={18} />}>
                Join Arena Battle
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.continueGroup}>
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
