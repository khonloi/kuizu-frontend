'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Heart, Flame, Gem, Snowflake, Zap, Sparkles } from 'lucide-react';
import styles from './shop.module.css';
import { ShopHeader } from './components/shop-header';
import { ShopItemCard } from './components/shop-item-card';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import { useStreakFreezeMutation, useDoubleWagerMutation } from '@/hooks/queries';
import { toast } from '@/stores/toast.store';

export function ShopView() {
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
      const msg = 'Streak Freeze equipped! Your streak is protected if you miss a day.';
      setSuccessMsg(msg);
      toast.success('Streak Freeze Equipped', msg);
    } catch (err) {
      const errMsg = (err as Error).message || 'Unable to purchase Streak Freeze.';
      toast.error('Purchase Failed', errMsg);
    }
  };

  const handleBuyWager = async () => {
    setSuccessMsg(null);
    try {
      const res = await doubleWagerMutation.mutateAsync();
      const msg = res.message || 'Double or Nothing wager placed! Maintain 7-day streak to win 100 gems.';
      setSuccessMsg(msg);
      toast.success('Wager Placed', msg);
    } catch (err) {
      const errMsg = (err as Error).message || 'Unable to place wager.';
      toast.error('Wager Failed', errMsg);
    }
  };

  return (
    <div className={styles.container}>
      <ShopHeader gems={currentGems} />

      {successMsg && (
        <div className={clsx(styles.successNotice, 'animate-pop')} data-testid="shop-success-msg">
          {successMsg}
        </div>
      )}

      <div className={styles.shopGrid}>
        <ShopItemCard
          testId="shop-heart-card"
          icon={<Heart size={32} color="var(--duo-red)" fill="var(--duo-red)" />}
          iconClassName={styles.iconHeart}
          title="Full Heart Refill"
          subtitle="Restore health to 5/5"
          description="Never let mistaken answers halt your learning path. Restores all 5 hearts instantly."
          actionText="Refill (350 Gems)"
          actionIcon={<Gem size={18} />}
          actionVariant="duo"
          onAction={openHeartModal}
        />

        <ShopItemCard
          testId="shop-freeze-card"
          icon={<Snowflake size={32} color="var(--duo-blue)" />}
          iconClassName={styles.iconFreeze}
          title="Streak Freeze"
          subtitle="Equip up to 2 freezes"
          description="Streak freeze allows your active streak to remain in place for one full day of inactivity."
          actionText="Equip Freeze (200 Gems)"
          actionIcon={<Flame size={18} />}
          actionVariant="blue"
          isLoading={streakFreezeMutation.isPending}
          disabled={streakFreezeMutation.isPending || currentGems < 200}
          onAction={handleBuyStreakFreeze}
        />

        <ShopItemCard
          testId="shop-wager-card"
          icon={<Zap size={32} color="var(--duo-yellow)" fill="var(--duo-yellow)" />}
          iconClassName={styles.iconWager}
          title="Double or Nothing"
          subtitle="7-day wager"
          description="Maintain a 7-day streak to double your 50 gem wager into 100 gems!"
          actionText="Wager 50 Gems"
          actionIcon={<Sparkles size={18} />}
          actionVariant="yellow"
          isLoading={doubleWagerMutation.isPending}
          disabled={doubleWagerMutation.isPending || currentGems < 50}
          onAction={handleBuyWager}
        />
      </div>
    </div>
  );
}
