'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './input.module.css';

import { useFormFieldAria } from '@/hooks/use-form-field-aria';
import { FieldMessage } from '../field-message/field-message';

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
    const { fieldId, errorId, helperId, describedBy } = useFormFieldAria({
      id,
      error,
      helperText,
      ariaDescribedBy: rest['aria-describedby'],
    });

    return (
      <div className={clsx(styles.inputWrapper, wrapperClassName)}>
        {label && (
          <label htmlFor={fieldId} className={styles.label}>
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
            id={fieldId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={clsx(styles.input, className)}
            {...rest}
          />

          {rightIcon && <span className={styles.rightIconSlot}>{rightIcon}</span>}
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

Input.displayName = 'Input';
