'use client';

import React from 'react';
import { Flame, Trophy, Zap, Heart, Gem } from 'lucide-react';
import { Card } from '@/components/ui';
import type { User } from '@/types/api.types';
import styles from '../profile.module.css';

interface ProfileStatsGridProps {
  user: User;
}

export function ProfileStatsGrid({ user }: ProfileStatsGridProps) {
  const streakCount = user.streak?.count ?? 0;

  return (
    <div data-testid="profile-stats-section">
      <h2 className={styles.sectionTitle}>Statistics & Progress</h2>

      <div className={styles.statsGrid}>
        <Card padding="md" className={styles.statItem}>
          <Flame size={32} color="var(--duo-orange)" fill="var(--duo-orange)" />
          <div>
            <span className={styles.statValue}>{streakCount}</span>
            <p className={styles.statLabel}>Day Streak</p>
          </div>
        </Card>

        <Card padding="md" className={styles.statItem}>
          <Zap size={32} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
          <div>
            <span className={styles.statValue}>{user.xp}</span>
            <p className={styles.statLabel}>Total Experience Points</p>
          </div>
        </Card>

        <Card padding="md" className={styles.statItem}>
          <Trophy size={32} color="var(--duo-yellow)" />
          <div>
            <span className={styles.statValue}>{user.league || 'Bronze'}</span>
            <p className={styles.statLabel}>Current League Tier</p>
          </div>
        </Card>

        <Card padding="md" className={styles.statItem}>
          <Heart size={32} color="var(--duo-red)" fill="var(--duo-red)" />
          <div>
            <span className={styles.statValue}>{user.hearts} / 5</span>
            <p className={styles.statLabel}>Quest Hearts</p>
          </div>
        </Card>

        <Card padding="md" className={styles.statItem}>
          <Gem size={32} color="var(--duo-blue)" fill="var(--duo-blue)" />
          <div>
            <span className={styles.statValue}>{user.gems}</span>
            <p className={styles.statLabel}>Gems Stash</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
