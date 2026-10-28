'use client';

import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import styles from '../arena.module.css';
import { useAudioStore } from '@/stores/audio.store';

export type KahootColor = 'red' | 'blue' | 'yellow' | 'green';

interface KahootTileProps {
  color: KahootColor;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  isCorrect?: boolean | null;
  mode?: 'player' | 'host';
}

const SHAPE_MAP: Record<KahootColor, { symbol: string; label: string }> = {
  red: { symbol: '▲', label: 'Triangle' },
  blue: { symbol: '◆', label: 'Diamond' },
  yellow: { symbol: '●', label: 'Circle' },
  green: { symbol: '■', label: 'Square' },
};

export function KahootTile({
  color,
  label,
  onClick,
  disabled = false,
  isSelected = false,
  isCorrect = null,
  mode = 'player',
}: KahootTileProps) {
  const playPop = useAudioStore((s) => s.playPop);
  const shape = SHAPE_MAP[color];

  const colorClass = {
    red: styles.tileRed,
    blue: styles.tileBlue,
    yellow: styles.tileYellow,
    green: styles.tileGreen,
  }[color];

  const handleClick = () => {
    if (disabled || !onClick) return;
    playPop();
    onClick();
  };

  // Host Display Banner
  if (mode === 'host') {
    return (
      <div
        className={clsx(styles.hostChoiceItem, colorClass, {
          'animate-pop': isCorrect === true,
          [styles.hostChoiceItemCorrect]: isCorrect === true,
          [styles.hostChoiceItemWrong]: isCorrect === false,
        })}
      >
        <span className={styles.tileShape} aria-label={shape.label}>
          {shape.symbol}
        </span>
        <span className={styles.hostChoiceLabel}>{label}</span>
        {isCorrect === true && (
          <span className={styles.hostChoiceCheckmark} aria-label="Correct" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Check size={18} strokeWidth={3} />
          </span>
        )}
      </div>
    );
  }

  // Player Handheld Gamepad Button
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={clsx(styles.gamepadBtn, colorClass, {
        [styles.gamepadBtnSelected]: isSelected,
      })}
      aria-label={`${shape.label}: ${label || color}`}
    >
      <span className={styles.gamepadShapeSymbol} aria-hidden="true">
        {shape.symbol}
      </span>
      {label && (
        <span className={styles.gamepadLabel}>
          {label}
        </span>
      )}
    </button>
  );
}
