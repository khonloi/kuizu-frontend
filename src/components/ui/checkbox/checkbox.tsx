'use client';

import React, { forwardRef, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { Check, Minus } from 'lucide-react';
import styles from './checkbox.module.css';
import { useAudioStore } from '@/stores/audio.store';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
      onChange,
      disabled = false,
      label,
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
          styles.checkboxWrapper,
          {
            [styles.checked]: checked || indeterminate,
            [styles.checkboxWrapperDisabled]: disabled,
          },
          className,
        )}
        onClick={handleToggle}
      >
        <button
          ref={ref}
          id={id}
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-label={ariaLabel || label}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={styles.box}
        >
          {indeterminate ? (
            <Minus className={styles.icon} />
          ) : checked ? (
            <Check className={styles.icon} />
          ) : null}
        </button>

        {label && <span className={styles.label}>{label}</span>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
