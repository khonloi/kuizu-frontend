'use client';

import React from 'react';
import clsx from 'clsx';
import { Trophy, Zap, TrendingUp, Flame } from 'lucide-react';
import styles from './leaderboard.module.css';
import { Card, Badge, Avatar } from '@/components/ui';
import { useAuthStore } from '@/stores/auth.store';
import { useLeaderboardQuery } from '@/hooks/queries';

export default function LeaderboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: entries = [], isLoading } = useLeaderboardQuery();

  return (
    <div className={styles.container}>
      {/* League Header */}
      <Card
        padding="lg"
        glow="blue"
        className={styles.leagueBanner}
      >
        <div className={styles.bannerFlex}>
          <div className={styles.trophySlot}>
            <div className={styles.trophyBox}>
              <Trophy size={36} color="var(--duo-yellow)" />
            </div>

            <div>
              <div className={styles.tagGroup}>
                <Badge variant="yellow" size="sm">
                  ACTIVE TOURNAMENT
                </Badge>
                <span className={styles.leagueEndsText}>
                  Ends in 2d 14h
                </span>
              </div>
              <h1 className={styles.leagueHeading}>
                {user?.league || 'Diamond'} League
              </h1>
              <p className={styles.leagueSubtext}>
                Top 3 advance to the Champion division. Keep practicing daily to earn XP!
              </p>
            </div>
          </div>

          <div className={styles.promotionSlot}>
            <Badge variant="duo" size="md" icon={<TrendingUp size={16} />}>
              Promotion Zone: Top 3
            </Badge>
          </div>
        </div>
      </Card>

      {/* Leaderboard Table Card */}
      <Card padding="md">
        <div className={styles.tableList}>
          {isLoading && entries.length === 0 ? (
            <div className={styles.loadingNotice}>
              Loading league rankings...
            </div>
          ) : (
            entries.map((entry) => {
              const isCurrentUser =
                entry.isCurrentUser || (user && entry.username.includes(user.username));
              const isTop3 = entry.rank <= 3;

              return (
                <div
                  key={entry.userId || entry.rank}
                  className={clsx(styles.row, {
                    [styles.rowCurrentUser]: isCurrentUser,
                    [styles.rowTop3]: !isCurrentUser && isTop3,
                  })}
                >
                  <div className={styles.userGroup}>
                    {/* Rank Number / Medal */}
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
                      {isCurrentUser && (
                        <span className={styles.youBadge}>
                          (You)
                        </span>
                      )}
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
            })
          )}
        </div>
      </Card>
    </div>
  );
}
