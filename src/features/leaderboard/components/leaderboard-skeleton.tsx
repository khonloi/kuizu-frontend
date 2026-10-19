import React from 'react';
import { Skeleton } from '@/components/ui';
import styles from '../leaderboard.module.css';

export function LeaderboardSkeleton() {
  return (
    <div
      className={styles.skeletonList}
      data-testid="leaderboard-loading"
      role="status"
      aria-label="Loading league rankings..."
    >
      <span className={styles.srOnly}>Loading league rankings...</span>
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className={styles.skeletonRow}>
          <div className={styles.skeletonUserGroup}>
            {/* Rank medal/number skeleton */}
            <Skeleton variant="circle" width="32px" height="32px" />
            {/* Player Avatar */}
            <Skeleton variant="circle" width="40px" height="40px" />
            {/* Player Name */}
            <div className={styles.skeletonTextGroup}>
              <Skeleton variant="text" width="120px" height="16px" />
              <Skeleton variant="text" width="60px" height="12px" />
            </div>
          </div>
          {/* Streak & XP skeletons */}
          <div className={styles.skeletonStatsGroup}>
            <Skeleton variant="rect" width="50px" height="20px" style={{ borderRadius: '9999px' }} />
            <Skeleton variant="rect" width="70px" height="20px" style={{ borderRadius: '9999px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
