'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Flame, Trophy, Zap, Heart, LogOut, ShieldCheck, Gem } from 'lucide-react';
import { Card, Button, Avatar, Badge } from '@/components/ui';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const playPop = useAudioStore((s) => s.playPop);

  const handleLogout = async () => {
    playPop();
    await logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <Card padding="lg" style={{ textAlign: 'center', maxWidth: '480px', margin: '4rem auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>
          Create an Account
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Sign in or create a Kuizu profile to save your learning progress, earn league trophies, and climb the leaderboard.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/login" onClick={playPop}>
            <Button variant="duo" size="md">
              Sign In
            </Button>
          </Link>
          <Link href="/register" onClick={playPop}>
            <Button variant="secondary" size="md">
              Create Profile
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Profile Header Card */}
      <Card padding="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Avatar name={user.username} src={user.avatarUrl} size="lg" ring="gold" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 900 }}>{user.username}</h1>
              <Badge variant="duo" size="sm" icon={<ShieldCheck size={14} />}>
                {user.role}
              </Badge>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              {user.email}
            </p>
          </div>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={handleLogout}
          leftIcon={<LogOut size={16} />}
        >
          Sign Out
        </Button>
      </Card>

      {/* Stats Matrix */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Statistics & Progress
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Flame size={32} color="var(--duo-orange)" fill="var(--duo-orange)" />
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{user.streak?.count || 0}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Day Streak</p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Zap size={32} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{user.xp}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Experience Points</p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Trophy size={32} color="var(--duo-yellow)" />
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{user.league || 'Bronze'}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current League Tier</p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Heart size={32} color="var(--duo-red)" fill="var(--duo-red)" />
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{user.hearts} / 5</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quest Hearts</p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Gem size={32} color="var(--duo-blue)" fill="var(--duo-blue)" />
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{user.gems}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gems Stash</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
