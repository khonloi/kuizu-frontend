'use client';

import React from 'react';
import styles from './exercise.module.css';
import { ExercisePromptCard } from '../components/exercise-prompt-card';
import { useAudioStore } from '@/stores/audio.store';
import { useWordBank } from '../hooks/use-word-bank';
import { WordBankAssembly, WordBankTokens } from '../components/word-bank';
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
  const {
    selectedTokens,
    handleAddToken,
    handleRemoveToken,
    isTokenPlaced,
  } = useWordBank({ onSelect, disabled });

  const handleSpeaker = () => {
    playPop();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(exercise.prompt);
      utterance.rate = 0.9;
      utterance.lang = /[\u4e00-\u9fa5]/.test(exercise.prompt) ? 'zh-CN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={styles.container}>
      {/* Prompt Card */}
      <ExercisePromptCard
        prompt={exercise.prompt}
        hint={exercise.hint}
        badgeText="TRANSLATE THIS PHRASE"
        badgeClassName={styles.badgeGreen}
        onSpeak={handleSpeaker}
      />

      {/* Assembly line (placed tokens) */}
      <WordBankAssembly
        selectedTokens={selectedTokens}
        onRemoveToken={handleRemoveToken}
        placeholder="Tap the word chips below to build your answer..."
        disabled={disabled}
      />

      {/* Available words bank */}
      <WordBankTokens
        options={exercise.options}
        isPlaced={isTokenPlaced}
        onAddToken={handleAddToken}
        disabled={disabled}
      />
    </div>
  );
}

