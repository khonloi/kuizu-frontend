'use client';

import React from 'react';
import clsx from 'clsx';
import styles from '../../exercises/exercise.module.css';

export interface WordBankAssemblyProps {
  selectedTokens: string[];
  onRemoveToken: (token: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function WordBankAssembly({
  selectedTokens,
  onRemoveToken,
  placeholder = 'Tap the words below to build your answer...',
  disabled = false,
}: WordBankAssemblyProps) {
  return (
    <div
      className={clsx(styles.wordSlotArea, {
        [styles.wordSlotAreaActive]: selectedTokens.length > 0,
      })}
    >
      {selectedTokens.length === 0 ? (
        <span className={styles.emptyPlaceholder}>{placeholder}</span>
      ) : (
        selectedTokens.map((token) => (
          <button
            key={token}
            type="button"
            disabled={disabled}
            onClick={() => onRemoveToken(token)}
            className={clsx(styles.wordChip, styles.wordChipSelected, 'animate-pop')}
          >
            {token}
          </button>
        ))
      )}
    </div>
  );
}
