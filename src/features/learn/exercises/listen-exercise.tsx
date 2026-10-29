'use client';

import React from 'react';
import { Volume2, Snail } from 'lucide-react';
import styles from './exercise.module.css';
import { useAudioStore } from '@/stores/audio.store';
import { useWordBank } from '../hooks/use-word-bank';
import { WordBankAssembly, WordBankTokens } from '../components/word-bank';
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
  const {
    selectedTokens,
    handleAddToken,
    handleRemoveToken,
    isTokenPlaced,
  } = useWordBank({ onSelect, disabled });

  const speakPrompt = (rate: number) => {
    playPop();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(exercise.prompt);
      utterance.rate = rate;
      utterance.lang = /[\u4e00-\u9fa5]/.test(exercise.prompt) ? 'zh-CN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
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
      <WordBankAssembly
        selectedTokens={selectedTokens}
        onRemoveToken={handleRemoveToken}
        placeholder="Tap the words below to reconstruct what you heard..."
        disabled={disabled}
      />

      {/* Word bank */}
      <WordBankTokens
        options={exercise.options}
        isPlaced={isTokenPlaced}
        onAddToken={handleAddToken}
        disabled={disabled}
      />
    </div>
  );
}

