'use client';

import React, { useState } from 'react';
import { Trophy, Triangle, Diamond, Circle, Square } from 'lucide-react';
import styles from './mockups.module.css';
import { useAudioStore } from '@/stores/audio.store';

export function ArenaMockup() {
  const { playPop } = useAudioStore();
  const [selectedTile, setSelectedTile] = useState<string | null>('blue');

  const handleTileClick = (id: string) => {
    playPop();
    setSelectedTile(id);
  };

  return (
    <div className={styles.mockupCard} aria-label="Kahoot Arena Preview">
      <div className={styles.arenaQuestionHeader}>
        Question 4/10: Which sorting algorithm has O(n log n) worst-case?
      </div>

      <div className={styles.arenaTileGrid}>
        <button
          type="button"
          className={`${styles.mockTile} ${styles.tileRed}`}
          style={{ opacity: selectedTile === 'red' ? 1 : 0.85 }}
          onClick={() => handleTileClick('red')}
          aria-label="Red: Bubble Sort"
        >
          <Triangle size={18} fill="#ffffff" />
          <span>Bubble Sort</span>
        </button>

        <button
          type="button"
          className={`${styles.mockTile} ${styles.tileBlue}`}
          style={{ opacity: selectedTile === 'blue' ? 1 : 0.85 }}
          onClick={() => handleTileClick('blue')}
          aria-label="Blue: Merge Sort"
        >
          <Diamond size={18} fill="#ffffff" />
          <span>Merge Sort ✓</span>
        </button>

        <button
          type="button"
          className={`${styles.mockTile} ${styles.tileYellow}`}
          style={{ opacity: selectedTile === 'yellow' ? 1 : 0.85 }}
          onClick={() => handleTileClick('yellow')}
          aria-label="Yellow: Insertion Sort"
        >
          <Circle size={18} fill="#ffffff" />
          <span>Insertion Sort</span>
        </button>

        <button
          type="button"
          className={`${styles.mockTile} ${styles.tileGreen}`}
          style={{ opacity: selectedTile === 'green' ? 1 : 0.85 }}
          onClick={() => handleTileClick('green')}
          aria-label="Green: Selection Sort"
        >
          <Square size={18} fill="#ffffff" />
          <span>Selection Sort</span>
        </button>
      </div>

      <div className={styles.arenaPodiumPreview}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Trophy size={16} color="var(--duo-yellow)" />
          <span>1st: Alex (8,940 pts)</span>
        </div>
        <span>2nd: Maya (8,120)</span>
        <span>3rd: Ken (7,650)</span>
      </div>
    </div>
  );
}
