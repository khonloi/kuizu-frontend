'use client';

import React from 'react';
import { Volume2, Lightbulb } from 'lucide-react';
import styles from '../exercises/exercise.module.css';

export interface ExercisePromptCardProps {
  prompt: string;
  hint?: string;
  badgeText: string;
  badgeClassName?: string;
  onSpeak?: () => void;
  speakerAriaLabel?: string;
}

export function ExercisePromptCard({
  prompt,
  hint,
  badgeText,
  badgeClassName = styles.badgeGreen,
  onSpeak,
  speakerAriaLabel = 'Listen to prompt',
}: ExercisePromptCardProps) {
  return (
    <div className={styles.promptCard}>
      <div className={styles.promptHeader}>
        {onSpeak && (
          <button
            type="button"
            onClick={onSpeak}
            className={styles.promptSpeaker}
            aria-label={speakerAriaLabel}
            title={speakerAriaLabel}
          >
            <Volume2 size={24} />
          </button>
        )}
        <span className={badgeClassName}>{badgeText}</span>
      </div>

      <h2 className={styles.promptText}>{prompt}</h2>
      {hint && (
        <p className={styles.hintText} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Lightbulb size={16} color="var(--duo-yellow)" />
          <span>{hint}</span>
        </p>
      )}
    </div>
  );
}
