'use client';

import React from 'react';
import clsx from 'clsx';
import { Flame, Zap } from 'lucide-react';
import { Avatar } from '@/components/ui';
import type { LeaderboardEntry } from '@/types/gamification.types';
import styles from '../leaderboard.module.css';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
}

export function LeaderboardRow({ entry, isCurrentUser }: LeaderboardRowProps) {
  const isTop3 = entry.rank <= 3;

  return (
    <div
      className={clsx(styles.row, {
        [styles.rowCurrentUser]: isCurrentUser,
        [styles.rowTop3]: !isCurrentUser && isTop3,
      })}
      data-testid={`leaderboard-row-${entry.rank}`}
    >
      <div className={styles.userGroup}>
        <div className={styles.rankSlot}>
          {entry.rank === 1 ? (
            <span className={styles.rankMedal}>🥇</span>
          ) : entry.rank === 2 ? (
            <span className={styles.rankMedal}>🥈</span>
          ) : entry.rank === 3 ? (
            <span className={styles.rankMedal}>🥉</span>
          ) : (
            <span className={styles.rankMuted}>#{entry.rank}</span>
          )}
        </div>

        <Avatar
          name={entry.username}
          src={entry.avatarUrl}
          size="sm"
          ring={isTop3 ? 'gold' : isCurrentUser ? 'duo' : 'none'}
        />

        <div>
          <span
            className={clsx(styles.userName, {
              [styles.userNameCurrentUser]: isCurrentUser,
            })}
          >
            {entry.username}
          </span>
          {isCurrentUser && <span className={styles.youBadge}>(You)</span>}
        </div>
      </div>

      <div className={styles.statsGroup}>
        <div className={styles.streakBadge}>
          <Flame size={16} fill="var(--duo-orange)" />
          <span>{entry.streakCount}d</span>
        </div>

        <div className={styles.xpBadge}>
          <Zap size={18} fill="var(--duo-yellow)" />
          <span>{entry.xp.toLocaleString()} XP</span>
        </div>
      </div>
    </div>
  );
}
