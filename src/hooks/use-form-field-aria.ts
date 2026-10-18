'use client';

import { useId } from 'react';

export interface UseFormFieldAriaOptions {
  id?: string;
  error?: string;
  helperText?: string;
  ariaDescribedBy?: string;
}

export function useFormFieldAria({
  id,
  error,
  helperText,
  ariaDescribedBy,
}: UseFormFieldAriaOptions) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  const describedBy =
    [
      error ? errorId : null,
      helperText && !error ? helperId : null,
      ariaDescribedBy,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  return {
    fieldId,
    errorId,
    helperId,
    describedBy,
  };
}
