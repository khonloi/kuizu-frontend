'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './exercise.module.css';
import { useAudioStore } from '../../../stores/audio.store';
import type { Exercise } from '../../../types/api.types';

interface FillBlankProps {
  exercise: Exercise;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
  disabled?: boolean;
}

export function FillBlankExercise({
  exercise,
  selectedAnswer,
  onSelect,
  disabled = false,
}: FillBlankProps) {
  const { playPop } = useAudioStore();

  return (
    <div className={styles.container}>
      {/* Prompt Card */}
      <div className={styles.promptCard}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--duo-yellow)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          FILL IN THE MISSING BLANK
        </span>
        <h2 className={styles.promptText}>{exercise.prompt}</h2>
        {exercise.hint && <p className={styles.hintText}>💡 {exercise.hint}</p>}
      </div>

      {/* Selected word slot preview */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          borderRadius: '16px',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          border: '2px solid var(--border-subtle)',
        }}
      >
        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: selectedAnswer ? 'var(--duo-green)' : 'var(--text-muted)' }}>
          {selectedAnswer ? `[ ${selectedAnswer} ]` : '[ Tap an option below ]'}
        </span>
      </div>

      {/* Options bank */}
      <div className={styles.wordBank}>
        {exercise.options.map((option) => {
          const isSelected = selectedAnswer === option;

          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => {
                playPop();
                onSelect(option);
              }}
              className={clsx(styles.wordChip, {
                [styles.choiceBtnSelected]: isSelected,
              })}
              style={
                isSelected
                  ? {
                      backgroundColor: 'var(--duo-green-subtle)',
                      borderColor: 'var(--duo-green)',
                      color: '#ffffff',
                    }
                  : undefined
              }
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
