'use client';

import React, { forwardRef, KeyboardEvent } from 'react';
import clsx from 'clsx';
import styles from './switch.module.css';
import { useAudioStore } from '@/stores/audio.store';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
  'aria-label'?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      disabled = false,
      label,
      size = 'md',
      className,
      id,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const playPop = useAudioStore((s) => s.playPop);

    const handleToggle = () => {
      if (disabled) return;
      playPop();
      onChange?.(!checked);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    };

    return (
      <div
        className={clsx(
          styles.switchWrapper,
          {
            [styles.switchWrapperDisabled]: disabled,
          },
          className,
        )}
        onClick={handleToggle}
      >
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={ariaLabel || label}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={clsx(styles.switchTrack, {
            [styles.checked]: checked,
            [styles.sizeSm]: size === 'sm',
          })}
        >
          <span className={styles.switchThumb} />
        </button>

        {label && <span className={styles.label}>{label}</span>}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
