'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { useAudioStore } from '@/stores/audio.store';
import styles from '../profile.module.css';

export function ProfileGuestCard() {
  const playPop = useAudioStore((s) => s.playPop);

  return (
    <Card padding="lg" className={styles.guestCard} data-testid="profile-guest-card">
      <h2 className={styles.guestTitle}>Create an Account</h2>
      <p className={styles.guestDescription}>
        Sign in or create a Kuizu profile to save your learning progress, earn league trophies, and climb the leaderboard.
      </p>
      <div className={styles.guestActions}>
        <Button href="/login" variant="duo" size="md" onClick={playPop}>
          Sign In
        </Button>
        <Button href="/register" variant="secondary" size="md" onClick={playPop}>
          Create Profile
        </Button>
      </div>
    </Card>
  );
}
