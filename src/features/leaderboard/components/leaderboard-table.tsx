'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { LeaderboardRow } from './leaderboard-row';
import { LeaderboardSkeleton } from './leaderboard-skeleton';
import type { LeaderboardEntry } from '@/types/gamification.types';
import styles from '../leaderboard.module.css';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  currentUsername?: string;
}

export function LeaderboardTable({
  entries,
  isLoading,
  currentUsername,
}: LeaderboardTableProps) {
  if (isLoading && entries.length === 0) {
    return (
      <Card padding="md">
        <LeaderboardSkeleton />
      </Card>
    );
  }

  return (
    <Card padding="md">
      <div className={styles.tableList} data-testid="leaderboard-table">
        {entries.map((entry) => {
            const isCurrentUser =
              entry.isCurrentUser ||
              (currentUsername ? entry.username.includes(currentUsername) : false);

            return (
              <LeaderboardRow
                key={entry.userId || entry.rank}
                entry={entry}
                isCurrentUser={Boolean(isCurrentUser)}
              />
            );
          })}
      </div>
    </Card>
  );
}
