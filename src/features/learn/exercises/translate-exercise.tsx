'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Volume2 } from 'lucide-react';
import styles from './exercise.module.css';
import { useAudioStore } from '@/stores/audio.store';
import type { Exercise } from '@/types/api.types';

interface TranslateProps {
  exercise: Exercise;
  onSelect: (answer: string) => void;
  disabled?: boolean;
}

export function TranslateExercise({
  exercise,
  onSelect,
  disabled = false,
}: TranslateProps) {
  const { playPop } = useAudioStore();
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const handleSpeaker = () => {
    playPop();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(exercise.prompt);
      utterance.rate = 0.9;
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
      {/* Prompt Card */}
      <div className={styles.promptCard}>
        <div className={styles.promptHeader}>
          <button
            type="button"
            onClick={handleSpeaker}
            className={styles.promptSpeaker}
            aria-label="Listen to prompt"
          >
            <Volume2 size={24} />
          </button>
          <span className={styles.badgeGreen}>
            TRANSLATE THIS PHRASE
          </span>
        </div>

        <h2 className={styles.promptText}>{exercise.prompt}</h2>
        {exercise.hint && <p className={styles.hintText}>💡 {exercise.hint}</p>}
      </div>

      {/* Assembly line (placed tokens) */}
      <div
        className={clsx(styles.wordSlotArea, {
          [styles.wordSlotAreaActive]: selectedTokens.length > 0,
        })}
      >
        {selectedTokens.length === 0 ? (
          <span className={styles.emptyPlaceholder}>
            Tap the word chips below to build your answer...
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

      {/* Available words bank */}
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
