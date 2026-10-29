import React from 'react';
import { Card, Skeleton } from '@/components/ui';
import styles from '../shop.module.css';

export function ShopSkeleton() {
  return (
    <div className={styles.container} data-testid="shop-skeleton" role="status" aria-label="Loading shop...">
      {/* Shop Header Skeleton */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Skeleton variant="text" width="220px" height="32px" />
          <Skeleton variant="text" width="min(340px, 100%)" height="18px" />
        </div>
        <Skeleton variant="rect" width="130px" height="42px" style={{ borderRadius: '9999px' }} />
      </div>

      {/* 3-Card Shop Grid Skeleton */}
      <div className={styles.shopGrid}>
        {[1, 2, 3].map((i) => (
          <Card key={i} padding="lg" className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <Skeleton variant="circle" width="56px" height="56px" />
              <div className={styles.cardTitles}>
                <Skeleton variant="text" width="160px" height="22px" />
                <Skeleton variant="text" width="110px" height="16px" />
              </div>
            </div>
            <div className={styles.cardBody}>
              <Skeleton variant="text" width="100%" height="16px" />
              <Skeleton variant="text" width="85%" height="16px" />
            </div>
            <div className={styles.cardAction}>
              <Skeleton variant="button" width="100%" height="48px" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
