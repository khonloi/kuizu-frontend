'use client';

import React from 'react';
import clsx from 'clsx';
import { Crown, Sparkles, Gift } from 'lucide-react';
import styles from './mockups.module.css';
import { useAudioStore } from '@/stores/audio.store';

export function QuestMockup() {
  const { playPop } = useAudioStore();

  return (
    <div className={styles.mockupCard} aria-label="Quest Path Preview">
      <div className={styles.questContainer}>
        <div className={styles.questPathLine} />

        {/* Node 1: Completed with Crown */}
        <button
          type="button"
          className={clsx(styles.questNode, styles.questNodeCompleted)}
          onClick={playPop}
          title="Unit 1: Hiragana Basics (Completed)"
          aria-label="Unit 1 completed with crown"
        >
          <Crown size={28} fill="#ffffff" />
        </button>

        {/* Node 2: Active with Start Badge */}
        <div style={{ position: 'relative' }}>
          <div className={styles.startSpeech}>START</div>
          <button
            type="button"
            className={clsx(styles.questNode, styles.questNodeActive)}
            onClick={playPop}
            title="Unit 2: Daily Greetings (In Progress)"
            aria-label="Unit 2 active lesson"
          >
            <Sparkles size={28} />
          </button>
        </div>

        {/* Node 3: Locked Chest */}
        <button
          type="button"
          className={clsx(styles.questNode, styles.questNodeLocked)}
          onClick={playPop}
          title="Unit 3: Kanji Mastery (Locked)"
          aria-label="Unit 3 locked"
        >
          <Gift size={26} />
        </button>
      </div>
    </div>
  );
}
