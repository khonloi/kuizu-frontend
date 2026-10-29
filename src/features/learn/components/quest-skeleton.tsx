import React from 'react';
import { Skeleton } from '@/components/ui';
import styles from './quest-skeleton.module.css';

export function QuestSkeleton() {
  return (
    <div
      className={styles.runnerWrapper}
      data-testid="quest-skeleton"
      role="status"
      aria-label="Loading quest..."
    >
      {/* Top Header Bar Skeleton */}
      <header className={styles.topBar}>
        <Skeleton
          variant="rect"
          width="36px"
          height="36px"
          style={{ borderRadius: '10px' }}
        />
        <div className={styles.progressSlot}>
          <Skeleton
            variant="rect"
            width="100%"
            height="16px"
            style={{ borderRadius: '9999px' }}
          />
        </div>
        <Skeleton
          variant="rect"
          width="64px"
          height="32px"
          style={{ borderRadius: '9999px' }}
        />
      </header>

      {/* Main Exercise Stage Area Skeleton */}
      <main className={styles.stageArea}>
        <div className={styles.contentContainer}>
          {/* Question Title / Instructions */}
          <Skeleton variant="text" width="220px" height="28px" />

          {/* Interactive Prompt Card */}
          <div className={styles.promptCard}>
            <Skeleton
              variant="circle"
              width="44px"
              height="44px"
              style={{ flexShrink: 0 }}
            />
            <div className={styles.promptLines}>
              <Skeleton variant="text" width="70%" height="22px" />
              <Skeleton variant="text" width="45%" height="16px" />
            </div>
          </div>

          {/* 4 Multi-Choice Option Cards */}
          <div className={styles.optionsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.optionCard}>
                <Skeleton
                  variant="rect"
                  width="28px"
                  height="28px"
                  style={{ borderRadius: '8px', flexShrink: 0 }}
                />
                <Skeleton variant="text" width="65%" height="20px" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar Skeleton */}
      <footer className={styles.bottomBar}>
        <Skeleton
          variant="button"
          width="160px"
          height="48px"
          style={{ borderRadius: 'var(--btn-radius, 16px)' }}
        />
      </footer>
    </div>
  );
}

