'use client';

import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import styles from '../leaderboard.module.css';

interface LeagueBannerProps {
  league: string;
}

export function LeagueBanner({ league }: LeagueBannerProps) {
  return (
    <Card padding="lg" className={styles.leagueBanner}>
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
              <span className={styles.leagueEndsText}>Ends in 2d 14h</span>
            </div>
            <h1 className={styles.leagueHeading}>{league} League</h1>
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
  );
}
