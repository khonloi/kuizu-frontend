'use client';

import React, { forwardRef, useId, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';
import styles from './textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      showCount = false,
      maxLength,
      value,
      className,
      wrapperClassName,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const currentLength = typeof value === 'string' ? value.length : 0;

    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
      rest['aria-describedby'],
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={clsx(styles.textareaWrapper, wrapperClassName)}>
        {(label || showCount) && (
          <div className={styles.labelRow}>
            {label && (
              <label htmlFor={textareaId} className={styles.label}>
                {label}
              </label>
            )}
            {showCount && maxLength && (
              <span className={styles.charCount}>
                {currentLength} / {maxLength}
              </span>
            )}
          </div>
        )}

        <div
          className={clsx(styles.textareaContainer, {
            [styles.textareaError]: !!error,
          })}
        >
          <textarea
            ref={ref}
            id={textareaId}
            value={value}
            maxLength={maxLength}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={clsx(styles.textarea, className)}
            {...rest}
          />
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

Textarea.displayName = 'Textarea';
