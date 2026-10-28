'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Crown, Medal, Trophy } from 'lucide-react';
import styles from '../arena.module.css';
import { Card, Badge } from '@/components/ui';
import { fireVictoryConfetti, fireStreakFireworks } from '@/lib/confetti';
import { useAudioStore } from '@/stores/audio.store';
import type { PlayerScore } from '@/types/socket.types';

interface PodiumCeremonyProps {
  podium: PlayerScore[];
  fullLeaderboard?: PlayerScore[];
}

interface PillarConfig {
  rank: 1 | 2 | 3;
  labelPrefix: string;
  medal: React.ReactNode;
  isLarge: boolean;
  blockClass: string;
}

const PILLAR_CONFIGS: Record<1 | 2 | 3, PillarConfig> = {
  1: {
    rank: 1,
    labelPrefix: 'First place winner',
    medal: <Crown size={40} color="#ffd900" fill="#ffd900" />,
    isLarge: true,
    blockClass: styles.podiumFirst,
  },
  2: {
    rank: 2,
    labelPrefix: 'Second place',
    medal: <Medal size={32} color="#c0c0c0" fill="#c0c0c0" />,
    isLarge: false,
    blockClass: styles.podiumSecond,
  },
  3: {
    rank: 3,
    labelPrefix: 'Third place',
    medal: <Medal size={32} color="#cd7f32" fill="#cd7f32" />,
    isLarge: false,
    blockClass: styles.podiumThird,
  },
};

function PodiumPillar({ rank, player }: { rank: 1 | 2 | 3; player?: PlayerScore }) {
  const config = PILLAR_CONFIGS[rank];
  const ariaLabel = player
    ? `${config.labelPrefix}: ${player.nickname} with ${player.score} points`
    : `${config.labelPrefix} empty`;

  return (
    <li className={styles.podiumPillar} aria-label={ariaLabel}>
      {player ? (
        <div className={styles.podiumPlayerInfo}>
          <span
            className={clsx(
              config.isLarge ? styles.podiumMedalLg : styles.podiumMedalSm,
              { 'animate-pop': config.isLarge }
            )}
          >
            {config.medal}
          </span>
          <span className={config.isLarge ? styles.podiumNicknameLg : styles.podiumNicknameSm}>
            {player.nickname}
          </span>
          <span className={config.isLarge ? styles.podiumScoreLg : styles.podiumScoreSm}>
            {player.score.toLocaleString()} pts
          </span>
        </div>
      ) : (
        <span className={styles.podiumEmptySlot}>-</span>
      )}
      <div className={clsx(styles.podiumBlock, config.blockClass)}>
        <span className={config.isLarge ? styles.podiumRankNumberLg : styles.podiumRankNumberSm}>
          {rank}
        </span>
      </div>
    </li>
  );
}

export function PodiumCeremony({ podium, fullLeaderboard }: PodiumCeremonyProps) {
  const { playFanfare } = useAudioStore();

  useEffect(() => {
    playFanfare();
    fireVictoryConfetti();
    const timer = setTimeout(() => {
      fireStreakFireworks();
    }, 1200);
    return () => clearTimeout(timer);
  }, [playFanfare]);

  const first = podium[0];
  const second = podium[1];
  const third = podium[2];

  return (
    <div
      role="region"
      aria-label="Grand Finale Podium"
      className={styles.podiumWrapper}
    >
      <Badge variant="yellow" size="md" className={styles.podiumBadge} icon={<Trophy size={16} />}>
        GRAND FINALE PODIUM
      </Badge>

      <h1 className={styles.podiumHeading}>
        Game Over! Champions Crowned
      </h1>

      {/* 3-Tier Olympic Podium */}
      <ol
        className={clsx(styles.podiumContainer, styles.podiumList)}
        aria-label="Quiz competition winners podium"
      >
        <PodiumPillar rank={2} player={second} />
        <PodiumPillar rank={1} player={first} />
        <PodiumPillar rank={3} player={third} />
      </ol>

      {/* Full Leaderboard Table (if available) */}
      {fullLeaderboard && fullLeaderboard.length > 0 && (
        <Card padding="md" className={styles.podiumLeaderboardCard}>
          <h3 className={styles.podiumLeaderboardTitle}>
            Final Leaderboard Standings
          </h3>
          <div className={styles.podiumLeaderboardList}>
            {fullLeaderboard.map((entry, idx) => (
              <div
                key={entry.socketId || `${entry.nickname}-${idx}`}
                className={clsx(styles.podiumLeaderboardRow, {
                  [styles.podiumLeaderboardRowTop]: idx < 3,
                })}
              >
                <div className={styles.flexRow}>
                  <span
                    className={clsx(styles.podiumRankTag, {
                      [styles.podiumRankTagFirst]: idx === 0,
                    })}
                  >
                    #{idx + 1}
                  </span>
                  <span className={styles.fontWeight800}>{entry.nickname}</span>
                </div>
                <span className={styles.podiumScoreTag}>
                  {entry.score.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
