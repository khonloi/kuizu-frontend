'use client';

import React from 'react';
import { X, Heart } from 'lucide-react';
import { ProgressBar } from '@/components/ui';
import styles from '../../lesson-runner.module.css';

interface LessonTopBarProps {
  progressPercent: number;
  hearts: number;
  onQuitClick: () => void;
}

export function LessonTopBar({
  progressPercent,
  hearts,
  onQuitClick,
}: LessonTopBarProps) {
  return (
    <header className={styles.topBar}>
      <button
        type="button"
        onClick={onQuitClick}
        className={styles.closeBtn}
        aria-label="Quit lesson"
        title="Quit lesson"
      >
        <X size={26} />
      </button>

      <div className={styles.progressSlot}>
        <ProgressBar value={progressPercent} max={100} color="duo" size="md" />
      </div>

      <div className={styles.heartsCounter} title="Hearts remaining">
        <Heart
          size={22}
          color="var(--duo-red)"
          fill="var(--duo-red)"
          className={hearts <= 1 ? 'animate-heart-beat' : undefined}
        />
        <span>{hearts}</span>
      </div>
    </header>
  );
}
