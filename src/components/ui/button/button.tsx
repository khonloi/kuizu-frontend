'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
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
  href?: string;
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
      href,
      ...rest
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (disabled || isLoading) return;
      if (playSoundOnClick) {
        useAudioStore.getState().playPop();
      }
      if (onClick) onClick(e as React.MouseEvent<HTMLButtonElement>);
    };

    const sizeClass = {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    }[size];

    const variantClass = styles[variant] || styles.duo;

    const content = (
      <>
        {isLoading ? (
          <span className={styles.spinner} aria-label="Loading" />
        ) : (
          leftIcon && <span className={styles.iconSlot}>{leftIcon}</span>
        )}

        <span>{children}</span>

        {!isLoading && rightIcon && (
          <span className={styles.iconSlot}>{rightIcon}</span>
        )}
      </>
    );

    const buttonClass = clsx(
      styles.button,
      variantClass,
      sizeClass,
      {
        [styles.fullWidth]: fullWidth,
      },
      className,
    );

    if (href) {
      return (
        <Link
          href={href}
          onClick={handleClick}
          className={buttonClass}
          aria-disabled={disabled || isLoading}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={handleClick}
        className={buttonClass}
        {...rest}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
