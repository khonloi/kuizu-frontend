'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { useAudioStore } from '@/stores/audio.store';
import styles from './button.module.css';

export type ButtonVariant =
  | 'duo'
  | 'kahoot'
  | 'blue'
  | 'yellow'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'outline';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  playSoundOnClick?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'duo',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      onClick,
      playSoundOnClick = false,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;
      if (playSoundOnClick) {
        useAudioStore.getState().playPop();
      }
      if (onClick) onClick(e);
    };

    const sizeClass = {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    }[size];

    const variantClass = styles[variant] || styles.duo;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={handleClick}
        className={clsx(
          styles.button,
          variantClass,
          sizeClass,
          {
            [styles.fullWidth]: fullWidth,
          },
          className,
        )}
        {...rest}
      >
        {isLoading ? (
          <span className={styles.spinner} aria-label="Loading" />
        ) : (
          leftIcon && <span className={styles.iconSlot}>{leftIcon}</span>
        )}

        <span>{children}</span>

        {!isLoading && rightIcon && (
          <span className={styles.iconSlot}>{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
