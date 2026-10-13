'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from '../arena.module.css';
import { Card, Badge } from '@/components/ui';
import { fireVictoryConfetti, fireStreakFireworks } from '@/lib/confetti';
import { useAudioStore } from '@/stores/audio.store';
import type { PlayerScore } from '@/types/socket.types';

interface PodiumCeremonyProps {
  podium: PlayerScore[];
  fullLeaderboard?: PlayerScore[];
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
      <Badge variant="yellow" size="md" className={styles.podiumBadge}>
        🏆 GRAND FINALE PODIUM
      </Badge>

      <h1 className={styles.podiumHeading}>
        Game Over! Champions Crowned
      </h1>

      {/* 3-Tier Olympic Podium */}
      <ol
        className={clsx(styles.podiumContainer, styles.podiumList)}
        aria-label="Quiz competition winners podium"
      >
        {/* 2nd Place (Left) */}
        <li
          className={styles.podiumPillar}
          aria-label={second ? `Second place: ${second.nickname} with ${second.score} points` : 'Second place empty'}
        >
          {second ? (
            <div className={styles.podiumPlayerInfo}>
              <span className={styles.podiumMedalSm}>🥈</span>
              <span className={styles.podiumNicknameSm}>{second.nickname}</span>
              <span className={styles.podiumScoreSm}>
                {second.score.toLocaleString()} pts
              </span>
            </div>
          ) : (
            <span className={styles.podiumEmptySlot}>-</span>
          )}
          <div className={`${styles.podiumBlock} ${styles.podiumSecond}`}>
            <span className={styles.podiumRankNumberSm}>2</span>
          </div>
        </li>

        {/* 1st Place (Center - Tallest) */}
        <li
          className={styles.podiumPillar}
          aria-label={first ? `First place winner: ${first.nickname} with ${first.score} points` : 'First place empty'}
        >
          {first ? (
            <div className={styles.podiumPlayerInfo}>
              <span className={`${styles.podiumMedalLg} animate-pop`}>
                👑
              </span>
              <span className={styles.podiumNicknameLg}>
                {first.nickname}
              </span>
              <span className={styles.podiumScoreLg}>
                {first.score.toLocaleString()} pts
              </span>
            </div>
          ) : (
            <span className={styles.podiumEmptySlot}>-</span>
          )}
          <div className={`${styles.podiumBlock} ${styles.podiumFirst}`}>
            <span className={styles.podiumRankNumberLg}>1</span>
          </div>
        </li>

        {/* 3rd Place (Right) */}
        <li
          className={styles.podiumPillar}
          aria-label={third ? `Third place: ${third.nickname} with ${third.score} points` : 'Third place empty'}
        >
          {third ? (
            <div className={styles.podiumPlayerInfo}>
              <span className={styles.podiumMedalSm}>🥉</span>
              <span className={styles.podiumNicknameSm}>{third.nickname}</span>
              <span className={styles.podiumScoreSm}>
                {third.score.toLocaleString()} pts
              </span>
            </div>
          ) : (
            <span className={styles.podiumEmptySlot}>-</span>
          )}
          <div className={`${styles.podiumBlock} ${styles.podiumThird}`}>
            <span className={styles.podiumRankNumberSm}>3</span>
          </div>
        </li>
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
