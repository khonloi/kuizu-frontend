'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './switch.module.css';
import { useToggleControl } from '@/hooks/use-toggle-control';

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
    const { handleToggle, handleKeyDown } = useToggleControl({
      checked,
      onChange,
      disabled,
    });

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
