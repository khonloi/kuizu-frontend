'use client';

import React from 'react';
import { Trophy, Zap, TrendingUp, Flame } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Avatar } from '../../../components/ui/avatar';
import { useAuthStore } from '../../../stores/auth.store';

interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

const SAMPLE_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'SakuraNinja', xp: 1420, streak: 14 },
  { rank: 2, name: 'CyberSamurai', xp: 1280, streak: 21 },
  { rank: 3, name: 'TokyoDrifter', xp: 1150, streak: 9 },
  { rank: 4, name: 'AnimeSensei', xp: 980, streak: 12 },
  { rank: 5, name: 'PixelHero', xp: 870, streak: 6 },
  { rank: 6, name: 'KanjiMaster', xp: 740, streak: 4 },
  { rank: 7, name: 'RamenLover', xp: 620, streak: 3 },
  { rank: 8, name: 'NightOwl', xp: 510, streak: 1 },
];

export default function LeaderboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* League Header */}
      <Card
        padding="lg"
        glow="blue"
        style={{
          background: 'linear-gradient(135deg, rgba(28, 176, 246, 0.15) 0%, rgba(23, 32, 54, 0.9) 100%)',
          borderColor: 'rgba(28, 176, 246, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: 'var(--duo-yellow-subtle)',
                border: '2px solid rgba(255, 200, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trophy size={36} color="var(--duo-yellow)" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Badge variant="yellow" size="sm">
                  {user?.league || 'Sapphire'} League
                </Badge>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Ends in 2 days
                </span>
              </div>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '0.25rem' }}>
                Weekly Tiered Competition
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--duo-green)', fontWeight: 800, fontSize: '0.9rem' }}>
            <TrendingUp size={18} />
            <span>Top 5 Advance to Ruby League</span>
          </div>
        </div>
      </Card>

      {/* Leaderboard Table Card */}
      <Card padding="none">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {SAMPLE_LEADERBOARD.map((entry) => {
            const isPromotion = entry.rank <= 5;
            const isTop3 = entry.rank <= 3;
            const rankColor =
              entry.rank === 1
                ? 'var(--duo-yellow)'
                : entry.rank === 2
                  ? '#cbd5e1'
                  : entry.rank === 3
                    ? '#d97706'
                    : 'var(--text-muted)';

            return (
              <div
                key={entry.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: isPromotion ? 'rgba(88, 204, 2, 0.03)' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  {/* Rank number or medal */}
                  <span
                    style={{
                      width: '28px',
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      color: rankColor,
                      textAlign: 'center',
                    }}
                  >
                    {isTop3 ? (entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉') : entry.rank}
                  </span>

                  <Avatar name={entry.name} size="md" ring={isTop3 ? 'gold' : 'none'} />

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>{entry.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Flame size={13} color="var(--duo-orange)" />
                      {entry.streak} day streak
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, color: 'var(--duo-yellow)' }}>
                  <Zap size={16} fill="var(--duo-yellow)" />
                  <span>{entry.xp} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
