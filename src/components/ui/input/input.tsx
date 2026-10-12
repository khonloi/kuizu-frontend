'use client';

import React, { forwardRef, useId, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';
import styles from './input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      wrapperClassName,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
      rest['aria-describedby'],
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={clsx(styles.inputWrapper, wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div
          className={clsx(styles.inputContainer, {
            [styles.hasLeftIcon]: !!leftIcon,
            [styles.hasRightIcon]: !!rightIcon,
            [styles.inputError]: !!error,
          })}
        >
          {leftIcon && <span className={styles.leftIconSlot}>{leftIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={clsx(styles.input, className)}
            {...rest}
          />

          {rightIcon && <span className={styles.rightIconSlot}>{rightIcon}</span>}
        </div>

        {error && (
          <span id={errorId} role="alert" className={styles.errorText}>
            <AlertCircle size={14} />
            {error}
          </span>
        )}

        {!error && helperText && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
