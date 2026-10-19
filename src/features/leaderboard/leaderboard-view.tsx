'use client';

import React from 'react';
import styles from './leaderboard.module.css';
import { LeagueBanner } from './components/league-banner';
import { LeaderboardTable } from './components/leaderboard-table';
import { useAuthStore } from '@/stores/auth.store';
import { useLeaderboardQuery } from '@/hooks/queries';

export function LeaderboardView() {
  const user = useAuthStore((s) => s.user);
  const { data: entries = [], isLoading } = useLeaderboardQuery();

  return (
    <div className={styles.container}>
      <LeagueBanner league={user?.league || 'Diamond'} />
      <LeaderboardTable
        entries={entries}
        isLoading={isLoading}
        currentUsername={user?.username}
      />
    </div>
  );
}
