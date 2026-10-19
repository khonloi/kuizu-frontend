'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';
import { ProfileHeader } from './components/profile-header';
import { ProfileStatsGrid } from './components/profile-stats-grid';
import { ProfileGuestCard } from './components/profile-guest-card';
import { ProfileSkeleton } from './components/profile-skeleton';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';

export function ProfileView() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuthStore();
  const playPop = useAudioStore((s) => s.playPop);

  const handleLogout = async () => {
    playPop();
    await logout();
    router.push('/login');
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return <ProfileGuestCard />;
  }

  return (
    <div className={styles.container}>
      <ProfileHeader user={user} onLogout={handleLogout} />
      <ProfileStatsGrid user={user} />
    </div>
  );
}
