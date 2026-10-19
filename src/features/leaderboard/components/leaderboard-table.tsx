'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { LeaderboardRow } from './leaderboard-row';
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
  return (
    <Card padding="md">
      <div className={styles.tableList} data-testid="leaderboard-table">
        {isLoading && entries.length === 0 ? (
          <div className={styles.loadingNotice} data-testid="leaderboard-loading">
            Loading league rankings...
          </div>
        ) : (
          entries.map((entry) => {
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
          })
        )}
      </div>
    </Card>
  );
}
