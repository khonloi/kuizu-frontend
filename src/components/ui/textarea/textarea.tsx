'use client';

import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './textarea.module.css';
import { useFormFieldAria } from '@/hooks/use-form-field-aria';
import { FieldMessage } from '../field-message/field-message';

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
    const { fieldId, errorId, helperId, describedBy } = useFormFieldAria({
      id,
      error,
      helperText,
      ariaDescribedBy: rest['aria-describedby'],
    });

    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={clsx(styles.textareaWrapper, wrapperClassName)}>
        {(label || showCount) && (
          <div className={styles.labelRow}>
            {label && (
              <label htmlFor={fieldId} className={styles.label}>
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
            id={fieldId}
            value={value}
            maxLength={maxLength}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={clsx(styles.textarea, className)}
            {...rest}
          />
        </div>

        <FieldMessage
          error={error}
          helperText={helperText}
          errorId={errorId}
          helperId={helperId}
          errorClassName={styles.errorText}
          helperClassName={styles.helperText}
        />
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
