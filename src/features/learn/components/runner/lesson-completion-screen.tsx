'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Flame, Crown } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import type { Lesson } from '@/types/api.types';
import styles from '../../lesson-runner.module.css';

interface LessonCompletionScreenProps {
  lesson: Lesson;
}

export function LessonCompletionScreen({ lesson }: LessonCompletionScreenProps) {
  return (
    <div className={styles.runnerWrapper}>
      <div className={styles.completionScreen}>
        <div className={`${styles.crownIcon} animate-pop`}>
          <Crown size={64} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
        </div>

        <div>
          <h1 className={styles.completionTitle}>Lesson Complete!</h1>
          <p className={styles.completionSubtitle}>
            You mastered <strong className={styles.lessonHighlight}>{lesson.title}</strong>
          </p>
        </div>

        <div className={styles.statsRow}>
          <Card padding="md">
            <div className={styles.xpStatValue}>
              <Zap size={24} fill="var(--duo-yellow)" />
              <span>+{lesson.xpReward} XP</span>
            </div>
            <span className={styles.statLabel}>Experience Earned</span>
          </Card>

          <Card padding="md">
            <div className={styles.streakStatValue}>
              <Flame size={24} fill="var(--duo-orange)" />
              <span>Streak Maintained</span>
            </div>
            <span className={styles.statLabel}>Daily Practice Goal</span>
          </Card>
        </div>

        <Link href="/learn" className={styles.fullWidthLink}>
          <Button variant="duo" size="lg" fullWidth leftIcon={<ArrowRight size={20} />}>
            Continue to Quest Path
          </Button>
        </Link>
      </div>
    </div>
  );
}
