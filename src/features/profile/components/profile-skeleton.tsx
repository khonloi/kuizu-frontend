import React from 'react';
import { Card, Skeleton } from '@/components/ui';
import styles from '../profile.module.css';

export function ProfileSkeleton() {
  return (
    <div className={styles.container} data-testid="profile-skeleton" role="status" aria-label="Loading profile...">
      {/* Profile Header Skeleton */}
      <Card padding="lg" className={styles.headerCard}>
        <div className={styles.headerContent}>
          <Skeleton variant="circle" width="96px" height="96px" />
          <div className={styles.headerInfo}>
            <Skeleton variant="text" width="180px" height="28px" />
            <Skeleton variant="text" width="100px" height="16px" />
            <Skeleton variant="text" width="140px" height="14px" />
          </div>
          <div className={styles.logoutBtn}>
            <Skeleton variant="button" width="110px" height="42px" />
          </div>
        </div>
      </Card>

      {/* Stats Grid Skeleton */}
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} padding="md" className={styles.statCard}>
            <div className={styles.statContent}>
              <Skeleton variant="circle" width="44px" height="44px" />
              <div className={styles.statInfo}>
                <Skeleton variant="text" width="80px" height="24px" />
                <Skeleton variant="text" width="100px" height="14px" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
