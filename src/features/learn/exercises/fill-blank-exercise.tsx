'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './exercise.module.css';
import { ExercisePromptCard } from '../components/exercise-prompt-card';
import { useAudioStore } from '@/stores/audio.store';
import type { Exercise } from '@/types/api.types';

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
      <ExercisePromptCard
        prompt={exercise.prompt}
        hint={exercise.hint}
        badgeText="FILL IN THE MISSING BLANK"
        badgeClassName={styles.badgeYellow}
      />

      {/* Selected word slot preview */}
      <div className={styles.blankSlotPreview}>
        <span
          className={clsx(styles.blankAnswerText, {
            [styles.blankAnswerTextFilled]: !!selectedAnswer,
          })}
        >
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
                [styles.wordChipSelectedGreen]: isSelected,
              })}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
