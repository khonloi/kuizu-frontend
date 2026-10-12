'use client';

import React from 'react';
import clsx from 'clsx';
import styles from '../arena.module.css';
import { useAudioStore } from '../../../stores/audio.store';

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
        })}
        style={{
          opacity: isCorrect === false ? 0.35 : 1,
          border: isCorrect === true ? '3px solid #ffffff' : undefined,
          transform: isCorrect === true ? 'scale(1.02)' : undefined,
        }}
      >
        <span className={styles.tileShape} aria-label={shape.label}>
          {shape.symbol}
        </span>
        <span style={{ flex: 1, letterSpacing: '-0.01em' }}>{label}</span>
        {isCorrect === true && (
          <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>✓</span>
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
      <span style={{ fontSize: '3.5rem', lineHeight: 1 }} aria-hidden="true">
        {shape.symbol}
      </span>
      {label && (
        <span
          style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}
