'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './exercise.module.css';
import { ExercisePromptCard } from '../components/exercise-prompt-card';
import { useAudioStore } from '@/stores/audio.store';
import type { Exercise } from '@/types/api.types';

interface MultipleChoiceProps {
  exercise: Exercise;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
  disabled?: boolean;
}

export function MultipleChoiceExercise({
  exercise,
  selectedAnswer,
  onSelect,
  disabled = false,
}: MultipleChoiceProps) {
  const { playPop } = useAudioStore();

  const handleSpeaker = () => {
    playPop();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(exercise.prompt);
      utterance.rate = 0.9;
      utterance.lang = /[\u4e00-\u9fa5]/.test(exercise.prompt) ? 'zh-CN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard hotkeys: 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= exercise.options.length) {
        const option = exercise.options[keyNum - 1];
        if (option) {
          playPop();
          onSelect(option);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, exercise.options, onSelect, playPop]);

  return (
    <div className={styles.container}>
      {/* Prompt Card */}
      <ExercisePromptCard
        prompt={exercise.prompt}
        hint={exercise.hint}
        badgeText="SELECT THE CORRECT TRANSLATION"
        badgeClassName={styles.badgeBlue}
        onSpeak={handleSpeaker}
        speakerAriaLabel="Listen to prompt"
      />

      {/* Choices Grid */}
      <div className={styles.choicesGrid} role="radiogroup" aria-label="Answer choices">
        {exercise.options.map((option, idx) => {
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
              className={clsx(styles.choiceBtn, {
                [styles.choiceBtnSelected]: isSelected,
              })}
              aria-checked={isSelected}
              role="radio"
            >
              <span className={styles.choiceKey}>{idx + 1}</span>
              <span className={styles.flex1}>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
