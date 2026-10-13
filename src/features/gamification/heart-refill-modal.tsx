'use client';

import React, { useState } from 'react';
import { Heart, Gem, Sparkles } from 'lucide-react';
import { Modal, Button } from '@/components/ui';
import { useUiStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { useHeartRefillMutation } from '@/hooks/queries';
import styles from './heart-refill-modal.module.css';

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
        <div className={styles.modalTitle}>
          <Heart size={24} color="var(--duo-red)" fill="var(--duo-red)" />
          <span>Hearts & Health</span>
        </div>
      }
      footer={
        <div className={styles.modalFooter}>
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
      <div className={styles.modalContent}>
        {/* Heart visual counter */}
        <div className={styles.heartsRow}>
          {[1, 2, 3, 4, 5].map((idx) => {
            const hasHeart = idx <= currentHearts;
            return (
              <div
                key={idx}
                className={`${styles.heartSlot} ${hasHeart ? `${styles.heartSlotActive} animate-heart-beat` : ''}`}
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

        <p className={styles.description}>
          Hearts keep you in the quest! Whenever you make a mistake in a practice lesson, you lose a heart. Refill them instantly with gems.
        </p>

        {/* Balance status */}
        <div className={styles.balanceCard}>
          <span className={styles.balanceLabel}>Your Gems Balance:</span>
          <div className={styles.balanceValue}>
            <Gem size={18} fill="#1cb0f6" />
            <span>{currentGems}</span>
          </div>
        </div>

        {errorMsg && (
          <div className={styles.errorMessage}>
            {errorMsg}
          </div>
        )}
      </div>
    </Modal>
  );
}
