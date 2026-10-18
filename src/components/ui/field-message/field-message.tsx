'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface FieldMessageProps {
  error?: string;
  helperText?: string;
  errorId: string;
  helperId: string;
  errorClassName?: string;
  helperClassName?: string;
}

export function FieldMessage({
  error,
  helperText,
  errorId,
  helperId,
  errorClassName,
  helperClassName,
}: FieldMessageProps) {
  if (error) {
    return (
      <span id={errorId} role="alert" className={errorClassName}>
        <AlertCircle size={14} />
        {error}
      </span>
    );
  }

  if (helperText) {
    return (
      <span id={helperId} className={helperClassName}>
        {helperText}
      </span>
    );
  }

  return null;
}
