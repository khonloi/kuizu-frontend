'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Gamepad2, RotateCcw, LogOut } from 'lucide-react';
import styles from './demo-mode-banner.module.css';
import {
  isDemoModeActive,
  resetDemoProgress,
  disableDemoMode,
  DEMO_CHANGE_EVENT,
} from '@/lib/demo-mode';
import { useAudioStore } from '@/stores/audio.store';
import { toast } from '@/stores/toast.store';

export function DemoModeBanner() {
  const router = useRouter();
  const { playPop, playSuccess } = useAudioStore();
  const [isActive, setIsActive] = useState(() => isDemoModeActive());

  useEffect(() => {

    const handleDemoChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean; reset?: boolean }>;
      setIsActive(customEvent.detail?.active ?? isDemoModeActive());
    };

    window.addEventListener(DEMO_CHANGE_EVENT, handleDemoChange);
    return () => {
      window.removeEventListener(DEMO_CHANGE_EVENT, handleDemoChange);
    };
  }, []);

  if (!isActive) {
    return null;
  }

  const handleReset = () => {
    playSuccess();
    resetDemoProgress();
    toast.success(
      'Demo Progress Reset',
      'XP, gems, hearts, and lesson nodes have been restored to baseline.',
    );
  };

  const handleExit = async () => {
    playPop();
    await disableDemoMode();
    toast.info('Exited Demo Mode', 'Switched back to standard live API mode.');
    router.push('/login');
  };

  return (
    <aside className={styles.demoBanner} aria-label="Demo Mode Notification Bar">
      <div className={styles.leftContent}>
        <span className={styles.badge}>
          <Gamepad2 size={15} />
          DEMO MODE ACTIVE
        </span>
        <span className={styles.message}>
          Simulated live backend with offline storage. All progress persists locally.
        </span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleReset}
          className={styles.resetBtn}
          title="Reset XP, gems, and lessons back to default state"
        >
          <RotateCcw size={13} />
          Reset Progress
        </button>
        <button
          type="button"
          onClick={handleExit}
          className={styles.exitBtn}
          title="Exit Demo Mode and return to login"
        >
          <LogOut size={13} />
          Exit Demo
        </button>
      </div>
    </aside>
  );
}
