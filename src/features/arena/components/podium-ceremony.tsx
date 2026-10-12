'use client';

import React, { useEffect } from 'react';
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
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
    >
      <Badge variant="yellow" size="md" style={{ marginBottom: '1rem' }}>
        🏆 GRAND FINALE PODIUM
      </Badge>

      <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.02em', textAlign: 'center' }}>
        Game Over! Champions Crowned
      </h1>

      {/* 3-Tier Olympic Podium */}
      <ol
        className={styles.podiumContainer}
        aria-label="Quiz competition winners podium"
        style={{ listStyle: 'none', padding: 0, margin: 0 }}
      >
        {/* 2nd Place (Left) */}
        <li
          className={styles.podiumPillar}
          aria-label={second ? `Second place: ${second.nickname} with ${second.score} points` : 'Second place empty'}
        >
          {second ? (
            <div className={styles.podiumPlayerInfo}>
              <span style={{ fontSize: '2.5rem' }}>🥈</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>{second.nickname}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                {second.score.toLocaleString()} pts
              </span>
            </div>
          ) : (
            <span style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>-</span>
          )}
          <div className={`${styles.podiumBlock} ${styles.podiumSecond}`}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>2</span>
          </div>
        </li>

        {/* 1st Place (Center - Tallest) */}
        <li
          className={styles.podiumPillar}
          aria-label={first ? `First place winner: ${first.nickname} with ${first.score} points` : 'First place empty'}
        >
          {first ? (
            <div className={styles.podiumPlayerInfo}>
              <span style={{ fontSize: '3.5rem' }} className="animate-pop">
                👑
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--duo-yellow)' }}>
                {first.nickname}
              </span>
              <span style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 800 }}>
                {first.score.toLocaleString()} pts
              </span>
            </div>
          ) : (
            <span style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>-</span>
          )}
          <div className={`${styles.podiumBlock} ${styles.podiumFirst}`}>
            <span style={{ fontSize: '3.5rem', fontWeight: 900 }}>1</span>
          </div>
        </li>

        {/* 3rd Place (Right) */}
        <li
          className={styles.podiumPillar}
          aria-label={third ? `Third place: ${third.nickname} with ${third.score} points` : 'Third place empty'}
        >
          {third ? (
            <div className={styles.podiumPlayerInfo}>
              <span style={{ fontSize: '2.5rem' }}>🥉</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900 }}>{third.nickname}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                {third.score.toLocaleString()} pts
              </span>
            </div>
          ) : (
            <span style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>-</span>
          )}
          <div className={`${styles.podiumBlock} ${styles.podiumThird}`}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>3</span>
          </div>
        </li>
      </ol>

      {/* Full Leaderboard Table (if available) */}
      {fullLeaderboard && fullLeaderboard.length > 0 && (
        <Card padding="md" style={{ width: '100%', maxWidth: '640px', marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
            Final Leaderboard Standings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {fullLeaderboard.map((entry, idx) => (
              <div
                key={entry.socketId || `${entry.nickname}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: idx < 3 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontWeight: 900, width: '24px', color: idx === 0 ? 'var(--duo-yellow)' : 'var(--text-secondary)' }}>
                    #{idx + 1}
                  </span>
                  <span style={{ fontWeight: 800 }}>{entry.nickname}</span>
                </div>
                <span style={{ fontWeight: 800, color: 'var(--duo-blue)' }}>
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
