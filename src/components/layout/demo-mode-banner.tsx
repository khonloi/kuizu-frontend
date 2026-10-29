'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { Gamepad2, X, RotateCcw } from 'lucide-react';
import styles from './demo-mode-banner.module.css';
import {
  isDemoModeActive,
  enableDemoMode,
  disableDemoMode,
  resetDemoProgress,
  DEMO_CHANGE_EVENT,
} from '@/lib/demo-mode';
import { useAudioStore } from '@/stores/audio.store';
import { toast } from '@/stores/toast.store';

const subscribeDemo = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(DEMO_CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(DEMO_CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
};

const getDemoSnapshot = () => isDemoModeActive();
const getDemoServerSnapshot = () => false;

const subscribeMounted = () => () => {};
const getMountedSnapshot = () => true;
const getMountedServerSnapshot = () => false;

export function DemoModeBanner() {
  const { playPop, playSuccess } = useAudioStore();
  const isMounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );
  const isActive = useSyncExternalStore(
    subscribeDemo,
    getDemoSnapshot,
    getDemoServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  if (!isMounted) {
    return null;
  }

  const handleToggle = async () => {
    playPop();
    const nextState = !isActive;
    if (nextState) {
      await enableDemoMode();
      toast.success(
        'Demo Mode Enabled',
        'Switched to offline simulated mode. All progress persists locally.',
      );
    } else {
      await disableDemoMode();
      toast.info(
        'Demo Mode Disabled',
        'Switched back to standard live API mode.',
      );
    }
  };

  const handleResetData = () => {
    playSuccess();
    resetDemoProgress();
    toast.success(
      'Demo Progress Reset',
      'XP, gems, hearts, and lesson nodes have been restored to baseline.',
    );
  };

  return (
    <aside className={styles.container} aria-label="Demo Mode Control Panel">
      <button
        type="button"
        className={styles.triggerButton}
        onClick={() => {
          playPop();
          setIsOpen((prev) => !prev);
        }}
        aria-expanded={isOpen}
        aria-controls="demo-panel-overlay"
      >
        <span
          className={`${styles.statusDot} ${isActive ? styles.statusDotActive : ''}`}
          aria-hidden="true"
        />
        <Gamepad2 size={14} aria-hidden="true" />
        <span>Demo: {isActive ? 'ON' : 'OFF'}</span>
      </button>

      {isOpen && (
        <div
          id="demo-panel-overlay"
          className={styles.modalOverlay}
          role="region"
          aria-label="Demo Mode Settings"
        >
          <div className={styles.header}>
            <div className={styles.title}>
              <Gamepad2 size={16} />
              <span>Offline Demo Mode</span>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => {
                playPop();
                setIsOpen(false);
              }}
              aria-label="Close demo settings"
            >
              <X size={16} />
            </button>
          </div>

          <p className={styles.description}>
            When Demo Mode is enabled, all curriculum quests, arena matches, and progress
            are simulated locally with stateful mock services.
          </p>

          <div className={styles.actionRow}>
            <span className={styles.toggleLabel}>Active Status</span>
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              className={`${styles.toggleSwitch} ${isActive ? styles.toggleSwitchActive : ''}`}
              onClick={handleToggle}
              aria-label="Toggle Demo Mode"
            >
              <span
                className={`${styles.toggleSlider} ${isActive ? styles.toggleSliderActive : ''}`}
              />
            </button>
          </div>

          <button
            type="button"
            className={styles.resetButton}
            onClick={handleResetData}
            title="Reset XP, gems, hearts, and lessons to baseline"
          >
            <RotateCcw size={13} />
            <span>Reset Fixtures & State</span>
          </button>
        </div>
      )}
    </aside>
  );
}
