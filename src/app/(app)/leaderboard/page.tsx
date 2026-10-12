'use client';

import React from 'react';
import { Trophy, Zap, TrendingUp, Flame } from 'lucide-react';
import { Card, Badge, Avatar } from '@/components/ui';
import { useAuthStore } from '@/stores/auth.store';
import { useLeaderboardQuery } from '@/hooks/queries';

export default function LeaderboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: entries = [], isLoading } = useLeaderboardQuery();

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Badge variant="yellow" size="sm">
                  ACTIVE TOURNAMENT
                </Badge>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Ends in 2d 14h
                </span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.35rem' }}>
                {user?.league || 'Diamond'} League
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Top 3 advance to the Champion division. Keep practicing daily to earn XP!
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Badge variant="duo" size="md" icon={<TrendingUp size={16} />}>
              Promotion Zone: Top 3
            </Badge>
          </div>
        </div>
      </Card>

      {/* Leaderboard Table Card */}
      <Card padding="md">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {isLoading && entries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '16px',
                    backgroundColor: isCurrentUser
                      ? 'rgba(88, 204, 2, 0.12)'
                      : isTop3
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'transparent',
                    border: isCurrentUser
                      ? '1.5px solid var(--duo-green)'
                      : '1px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    {/* Rank Number / Medal */}
                    <div style={{ width: '32px', textAlign: 'center', fontWeight: 900, fontSize: '1.1rem' }}>
                      {entry.rank === 1 ? (
                        <span style={{ fontSize: '1.4rem' }}>🥇</span>
                      ) : entry.rank === 2 ? (
                        <span style={{ fontSize: '1.4rem' }}>🥈</span>
                      ) : entry.rank === 3 ? (
                        <span style={{ fontSize: '1.4rem' }}>🥉</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>#{entry.rank}</span>
                      )}
                    </div>

                    <Avatar
                      name={entry.username}
                      src={entry.avatarUrl}
                      size="sm"
                      ring={isTop3 ? 'gold' : isCurrentUser ? 'duo' : 'none'}
                    />

                    <div>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: isCurrentUser ? 'var(--duo-green)' : 'inherit' }}>
                        {entry.username}
                      </span>
                      {isCurrentUser && (
                        <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--duo-green)', fontWeight: 800 }}>
                          (You)
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--duo-orange)', fontWeight: 800, fontSize: '0.9rem' }}>
                      <Flame size={16} fill="var(--duo-orange)" />
                      <span>{entry.streakCount}d</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, color: 'var(--duo-yellow)', minWidth: '90px', justifyContent: 'flex-end' }}>
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
