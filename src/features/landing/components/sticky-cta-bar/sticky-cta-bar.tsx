'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight, Zap } from 'lucide-react';
import styles from './sticky-cta-bar.module.css';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti } from '@/lib/confetti';

interface StickyBottomBarProps {
  isVisible: boolean;
}

export function StickyBottomBar({ isVisible }: StickyBottomBarProps) {
  const { user } = useAuthStore();
  const { playSuccess } = useAudioStore();

  const handleCtaClick = () => {
    playSuccess();
    fireVictoryConfetti();
  };

  return (
    <aside
      className={clsx(styles.stickyBar, isVisible && styles.visible)}
      aria-hidden={!isVisible}
      aria-label="Quick start learning"
    >
      <div className={styles.inner}>
        <div className={styles.prompt}>
          <div className={styles.mascotDot} aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} fill="var(--duo-yellow)" color="var(--duo-yellow)" />
          </div>
          <div className={styles.promptText}>
            <span className={styles.promptTitle}>Start learning on Kuizu for free</span>
            <span className={styles.promptSub}>Join over 500 million learners worldwide</span>
          </div>
        </div>

        <Link
          href={user ? '/learn' : '/register'}
          onClick={handleCtaClick}
          tabIndex={isVisible ? 0 : -1}
        >
          <Button
            variant="duo"
            size="md"
            rightIcon={<ArrowRight size={16} />}
          >
            GET STARTED
          </Button>
        </Link>
      </div>
    </aside>
  );
}
