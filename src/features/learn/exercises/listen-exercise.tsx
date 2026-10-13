'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Volume2, Snail } from 'lucide-react';
import styles from './exercise.module.css';
import { useAudioStore } from '@/stores/audio.store';
import type { Exercise } from '@/types/api.types';

interface ListenProps {
  exercise: Exercise;
  onSelect: (answer: string) => void;
  disabled?: boolean;
}

export function ListenExercise({
  exercise,
  onSelect,
  disabled = false,
}: ListenProps) {
  const { playPop } = useAudioStore();
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const speakPrompt = (rate: number) => {
    playPop();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(exercise.prompt);
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAddToken = (token: string) => {
    if (disabled || selectedTokens.includes(token)) return;
    playPop();
    const updated = [...selectedTokens, token];
    setSelectedTokens(updated);
    onSelect(updated.join(' '));
  };

  const handleRemoveToken = (token: string) => {
    if (disabled) return;
    playPop();
    const updated = selectedTokens.filter((t) => t !== token);
    setSelectedTokens(updated);
    onSelect(updated.join(' '));
  };

  return (
    <div className={styles.container}>
      {/* Title */}
      <div className={styles.centeredBlock}>
        <span className={styles.badgeBlue}>
          TAP WHAT YOU HEAR
        </span>
      </div>

      {/* Dual Speed Speaker Buttons */}
      <div className={styles.audioSpeakerRow}>
        <button
          type="button"
          onClick={() => speakPrompt(0.9)}
          className={styles.speakerNormalBtn}
          title="Play at normal speed"
          aria-label="Play audio at normal speed"
        >
          <Volume2 size={36} />
        </button>

        <button
          type="button"
          onClick={() => speakPrompt(0.55)}
          className={styles.speakerSlowBtn}
          title="Play slowly"
          aria-label="Play audio at slow speed"
        >
          <Snail size={28} />
        </button>
      </div>

      {/* Assembly slot */}
      <div
        className={clsx(styles.wordSlotArea, {
          [styles.wordSlotAreaActive]: selectedTokens.length > 0,
        })}
      >
        {selectedTokens.length === 0 ? (
          <span className={styles.emptyPlaceholder}>
            Tap the words below to reconstruct what you heard...
          </span>
        ) : (
          selectedTokens.map((token) => (
            <button
              key={token}
              type="button"
              disabled={disabled}
              onClick={() => handleRemoveToken(token)}
              className={clsx(styles.wordChip, styles.wordChipSelected, 'animate-pop')}
            >
              {token}
            </button>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className={styles.wordBank}>
        {exercise.options.map((token) => {
          const isPlaced = selectedTokens.includes(token);

          return (
            <button
              key={token}
              type="button"
              disabled={disabled || isPlaced}
              onClick={() => handleAddToken(token)}
              className={clsx(styles.wordChip, {
                [styles.wordChipPlaced]: isPlaced,
              })}
            >
              {token}
            </button>
          );
        })}
      </div>
    </div>
  );
}
