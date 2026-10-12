'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Flame, Trophy, Zap, Heart, LogOut, ShieldCheck, Gem } from 'lucide-react';
import styles from './profile.module.css';
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
      <Card padding="lg" className={styles.guestCard}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>
          Create an Account
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Sign in or create a Kuizu profile to save your learning progress, earn league trophies, and climb the leaderboard.
        </p>
        <div className={styles.guestActions}>
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
    <div className={styles.container}>
      {/* Profile Header Card */}
      <Card padding="lg" className={styles.headerCard}>
        <div className={styles.userInfo}>
          <Avatar name={user.username} src={user.avatarUrl} size="lg" ring="gold" />
          <div>
            <div className={styles.userHeading}>
              <h1 className={styles.userName}>{user.username}</h1>
              <Badge variant="duo" size="sm" icon={<ShieldCheck size={14} />}>
                {user.role}
              </Badge>
            </div>
            <p className={styles.userEmail}>
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
        <h2 className={styles.sectionTitle}>
          Statistics & Progress
        </h2>

        <div className={styles.statsGrid}>
          <Card padding="md">
            <div className={styles.statItem}>
              <Flame size={32} color="var(--duo-orange)" fill="var(--duo-orange)" />
              <div>
                <span className={styles.statValue}>{user.streak?.count || 0}</span>
                <p className={styles.statLabel}>Day Streak</p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className={styles.statItem}>
              <Zap size={32} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
              <div>
                <span className={styles.statValue}>{user.xp}</span>
                <p className={styles.statLabel}>Total Experience Points</p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className={styles.statItem}>
              <Trophy size={32} color="var(--duo-yellow)" />
              <div>
                <span className={styles.statValue}>{user.league || 'Bronze'}</span>
                <p className={styles.statLabel}>Current League Tier</p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className={styles.statItem}>
              <Heart size={32} color="var(--duo-red)" fill="var(--duo-red)" />
              <div>
                <span className={styles.statValue}>{user.hearts} / 5</span>
                <p className={styles.statLabel}>Quest Hearts</p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className={styles.statItem}>
              <Gem size={32} color="var(--duo-blue)" fill="var(--duo-blue)" />
              <div>
                <span className={styles.statValue}>{user.gems}</span>
                <p className={styles.statLabel}>Gems Stash</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
