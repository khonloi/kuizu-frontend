'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Heart, Flame, Gem, Sparkles, Snowflake, Zap } from 'lucide-react';
import styles from './shop.module.css';
import { Card, Button, Badge } from '@/components/ui';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import { useStreakFreezeMutation, useDoubleWagerMutation } from '@/hooks/queries';

export default function ShopPage() {
  const user = useAuthStore((s) => s.user);
  const openHeartModal = useUiStore((s) => s.openHeartModal);
  const streakFreezeMutation = useStreakFreezeMutation();
  const doubleWagerMutation = useDoubleWagerMutation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const currentGems = user?.gems ?? 100;

  const handleBuyStreakFreeze = async () => {
    setSuccessMsg(null);
    try {
      await streakFreezeMutation.mutateAsync();
      setSuccessMsg('Streak Freeze equipped! Your streak is protected if you miss a day.');
    } catch (err) {
      setSuccessMsg((err as Error).message || 'Unable to purchase Streak Freeze.');
    }
  };

  const handleBuyWager = async () => {
    setSuccessMsg(null);
    try {
      const res = await doubleWagerMutation.mutateAsync();
      setSuccessMsg(res.message || 'Double or Nothing wager placed! Maintain 7-day streak to win 100 gems.');
    } catch (err) {
      setSuccessMsg((err as Error).message || 'Unable to place wager.');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Badge variant="blue" size="sm" icon={<Sparkles size={14} />}>
            POWER-UPS & BOOSTERS
          </Badge>
          <h1 className={styles.headerTitle}>
            Gem Bazaar
          </h1>
          <p className={styles.headerDescription}>
            Spend your hard-earned gems to protect streaks and refill quest hearts.
          </p>
        </div>

        <div className={styles.gemPill}>
          <Gem size={24} fill="var(--duo-blue)" />
          <span>{currentGems} Gems</span>
        </div>
      </div>

      {successMsg && (
        <div className={clsx(styles.successNotice, 'animate-pop')}>
          {successMsg}
        </div>
      )}

      {/* Shop Grid */}
      <div className={styles.shopGrid}>
        {/* Heart Refill Card */}
        <Card padding="lg" className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <div className={clsx(styles.iconBox, styles.iconHeart)}>
              <Heart size={32} color="var(--duo-red)" fill="var(--duo-red)" />
            </div>
            <div>
              <h3 className={styles.itemTitle}>Full Heart Refill</h3>
              <span className={styles.itemSubtitle}>Restore health to 5/5</span>
            </div>
          </div>

          <p className={styles.itemDescription}>
            Never let mistaken answers halt your learning path. Restores all 5 hearts instantly.
          </p>

          <Button
            variant="duo"
            size="md"
            fullWidth
            onClick={openHeartModal}
            leftIcon={<Gem size={18} />}
          >
            Refill (350 Gems)
          </Button>
        </Card>

        {/* Streak Freeze Card */}
        <Card padding="lg" className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <div className={clsx(styles.iconBox, styles.iconFreeze)}>
              <Snowflake size={32} color="var(--duo-blue)" />
            </div>
            <div>
              <h3 className={styles.itemTitle}>Streak Freeze</h3>
              <span className={styles.itemSubtitle}>Equip up to 2 freezes</span>
            </div>
          </div>

          <p className={styles.itemDescription}>
            Streak freeze allows your active streak to remain in place for one full day of inactivity.
          </p>

          <Button
            variant="blue"
            size="md"
            fullWidth
            isLoading={streakFreezeMutation.isPending}
            disabled={streakFreezeMutation.isPending || currentGems < 200}
            onClick={handleBuyStreakFreeze}
            leftIcon={<Flame size={18} />}
          >
            Equip Freeze (200 Gems)
          </Button>
        </Card>

        {/* Double or Nothing Booster */}
        <Card padding="lg" className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <div className={clsx(styles.iconBox, styles.iconWager)}>
              <Zap size={32} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
            </div>
            <div>
              <h3 className={styles.itemTitle}>Double or Nothing</h3>
              <span className={styles.itemSubtitle}>7-day wager</span>
            </div>
          </div>

          <p className={styles.itemDescription}>
            Maintain a 7-day streak to double your 50 gem wager into 100 gems!
          </p>

          <Button
            variant="yellow"
            size="md"
            fullWidth
            isLoading={doubleWagerMutation.isPending}
            disabled={doubleWagerMutation.isPending || currentGems < 50}
            onClick={handleBuyWager}
            leftIcon={<Sparkles size={18} />}
          >
            Wager 50 Gems
          </Button>
        </Card>
      </div>
    </div>
  );
}
