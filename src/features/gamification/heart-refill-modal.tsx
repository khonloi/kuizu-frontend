'use client';

import React, { useState } from 'react';
import { Heart, Gem, Sparkles } from 'lucide-react';
import { Modal, Button } from '@/components/ui';
import { useUiStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { useHeartRefillMutation } from '@/hooks/queries';

const REFILL_GEM_COST = 350;

export function HeartRefillModal() {
  const { isHeartModalOpen, closeHeartModal } = useUiStore();
  const user = useAuthStore((s) => s.user);
  const refillMutation = useHeartRefillMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentHearts = user?.hearts ?? 5;
  const currentGems = user?.gems ?? 100;
  const isFull = currentHearts >= 5;
  const canAfford = currentGems >= REFILL_GEM_COST;

  const handleRefill = async () => {
    if (isFull) return;
    setErrorMsg(null);

    try {
      await refillMutation.mutateAsync();
      closeHeartModal();
    } catch (err) {
      setErrorMsg((err as Error).message || 'Failed to refill hearts');
    }
  };

  return (
    <Modal
      isOpen={isHeartModalOpen}
      onClose={closeHeartModal}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Heart size={24} color="var(--duo-red)" fill="var(--duo-red)" />
          <span>Hearts & Health</span>
        </div>
      }
      footer={
        <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="md" onClick={closeHeartModal}>
            Cancel
          </Button>
          <Button
            variant="duo"
            size="md"
            disabled={isFull || (!canAfford && !!user) || refillMutation.isPending}
            isLoading={refillMutation.isPending}
            onClick={handleRefill}
            leftIcon={<Sparkles size={18} />}
          >
            {isFull
              ? 'Hearts are Full'
              : `Refill All (350 Gems)`}
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem', padding: '0.5rem 0' }}>
        {/* Heart visual counter */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((idx) => {
            const hasHeart = idx <= currentHearts;
            return (
              <div
                key={idx}
                className={hasHeart ? 'animate-heart-beat' : undefined}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: hasHeart ? 'var(--duo-red-subtle)' : 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${hasHeart ? 'rgba(255, 75, 75, 0.4)' : 'var(--border-subtle)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Heart
                  size={24}
                  color={hasHeart ? 'var(--duo-red)' : 'var(--text-muted)'}
                  fill={hasHeart ? 'var(--duo-red)' : 'transparent'}
                />
              </div>
            );
          })}
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '380px' }}>
          Hearts keep you in the quest! Whenever you make a mistake in a practice lesson, you lose a heart. Refill them instantly with gems.
        </p>

        {/* Balance status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0.85rem 1.25rem',
            borderRadius: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Gems Balance:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, color: 'var(--duo-blue)' }}>
            <Gem size={18} fill="#1cb0f6" />
            <span>{currentGems}</span>
          </div>
        </div>

        {errorMsg && (
          <div style={{ color: 'var(--duo-red)', fontSize: '0.85rem', fontWeight: 700 }}>
            {errorMsg}
          </div>
        )}
      </div>
    </Modal>
  );
}
