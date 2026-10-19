import React from 'react';
import clsx from 'clsx';
import { Skeleton } from '@/components/ui';
import styles from './learn-skeleton.module.css';

export function LearnSkeleton() {
  return (
    <div className={styles.container} data-testid="learn-skeleton">
      {/* Course Hero Banner Skeleton */}
      <div className={styles.heroCard}>
        <Skeleton variant="rect" width="140px" height="26px" style={{ borderRadius: '9999px' }} />
        <Skeleton variant="text" width="55%" height="32px" />
        <Skeleton variant="text" width="85%" height="18px" />
        <Skeleton variant="button" width="280px" height="48px" style={{ marginTop: '0.5rem' }} />
      </div>

      {/* Unit Header Card Skeleton */}
      <div className={styles.unitCard}>
        <Skeleton variant="rect" width="90px" height="24px" style={{ borderRadius: '9999px' }} />
        <Skeleton variant="text" width="45%" height="26px" />
        <Skeleton variant="rect" width="100%" height="14px" style={{ borderRadius: '9999px' }} />
      </div>

      {/* Curriculum Path Stepping Stones Skeleton */}
      <div className={styles.pathContainer}>
        <div className={styles.nodeWrapper}>
          <Skeleton variant="circle" className={styles.nodeCircle} />
        </div>
        <div className={clsx(styles.nodeWrapper, styles.nodeShiftRight)}>
          <Skeleton variant="circle" className={styles.nodeCircle} />
        </div>
        <div className={clsx(styles.nodeWrapper, styles.nodeShiftLeft)}>
          <Skeleton variant="circle" className={styles.nodeCircle} />
        </div>
        <div className={styles.nodeWrapper}>
          <Skeleton variant="circle" className={styles.nodeCircle} />
        </div>
      </div>
    </div>
  );
}
