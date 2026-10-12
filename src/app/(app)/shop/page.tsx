'use client';

import React, { useState } from 'react';
import { Heart, Flame, Gem, Sparkles, Snowflake, Zap } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useAuthStore } from '../../../stores/auth.store';
import { useAudioStore } from '../../../stores/audio.store';
import { useUiStore } from '../../../stores/ui.store';
import { api } from '../../../lib/api';
import { fireVictoryConfetti } from '../../../lib/confetti';
import type { StreakFreezePurchaseResult } from '../../../types/gamification.types';

export default function ShopPage() {
  const { user, updateGems } = useAuthStore();
  const { playSuccess, playError } = useAudioStore();
  const openHeartModal = useUiStore((s) => s.openHeartModal);
  const [isFreezeLoading, setIsFreezeLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const currentGems = user?.gems ?? 100;

  const handleBuyStreakFreeze = async () => {
    setIsFreezeLoading(true);
    setSuccessMsg(null);
    try {
      if (user) {
        const res = await api.post<StreakFreezePurchaseResult>('/api/v1/users/me/streak/freeze');
        updateGems(res.gemsRemaining ?? Math.max(0, currentGems - 200));
      } else {
        updateGems(Math.max(0, currentGems - 200));
      }

      playSuccess();
      fireVictoryConfetti();
      setSuccessMsg('Streak Freeze equipped! Your streak is protected if you miss a day.');
    } catch (err) {
      playError();
      setSuccessMsg((err as Error).message || 'Unable to purchase Streak Freeze.');
    } finally {
      setIsFreezeLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="blue" size="sm" icon={<Sparkles size={14} />}>
            POWER-UPS & BOOSTERS
          </Badge>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.35rem' }}>
            Gem Bazaar
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Spend your hard-earned gems to protect streaks and refill quest hearts.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 1.25rem',
            borderRadius: '16px',
            backgroundColor: 'var(--duo-blue-subtle)',
            border: '2px solid rgba(28, 176, 246, 0.4)',
            color: 'var(--duo-blue)',
            fontWeight: 900,
            fontSize: '1.25rem',
          }}
        >
          <Gem size={24} fill="var(--duo-blue)" />
          <span>{currentGems} Gems</span>
        </div>
      </div>

      {successMsg && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '14px',
            backgroundColor: 'var(--duo-green-subtle)',
            border: '1px solid rgba(88, 204, 2, 0.3)',
            color: 'var(--duo-green)',
            fontWeight: 800,
            fontSize: '0.95rem',
          }}
        >
          {successMsg}
        </div>
      )}

      {/* Shop Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Heart Refill Card */}
        <Card padding="lg" glow="duo" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'var(--duo-red-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={32} color="var(--duo-red)" fill="var(--duo-red)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Full Heart Refill</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Restore health to 5/5</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
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
        <Card padding="lg" glow="blue" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'var(--duo-blue-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Snowflake size={32} color="var(--duo-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Streak Freeze</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Equip up to 2 freezes</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
            Streak freeze allows your active streak to remain in place for one full day of inactivity.
          </p>

          <Button
            variant="blue"
            size="md"
            fullWidth
            isLoading={isFreezeLoading}
            disabled={isFreezeLoading || currentGems < 200}
            onClick={handleBuyStreakFreeze}
            leftIcon={<Flame size={18} />}
          >
            Equip Freeze (200 Gems)
          </Button>
        </Card>

        {/* Double or Nothing Booster */}
        <Card padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'var(--duo-yellow-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={32} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Double or Nothing</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>7-day wager</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
            Maintain a 7-day streak to double your 50 gem wager into 100 gems!
          </p>

          <Button
            variant="yellow"
            size="md"
            fullWidth
            onClick={() => { playSuccess(); fireVictoryConfetti(); }}
            leftIcon={<Sparkles size={18} />}
          >
            Wager 50 Gems
          </Button>
        </Card>
      </div>
    </div>
  );
}
