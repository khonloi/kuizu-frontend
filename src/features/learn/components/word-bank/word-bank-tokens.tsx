'use client';

import React from 'react';
import clsx from 'clsx';
import styles from '../../exercises/exercise.module.css';

export interface WordBankTokensProps {
  options: string[];
  isPlaced: (token: string) => boolean;
  onAddToken: (token: string) => void;
  disabled?: boolean;
}

export function WordBankTokens({
  options,
  isPlaced,
  onAddToken,
  disabled = false,
}: WordBankTokensProps) {
  return (
    <div className={styles.wordBank}>
      {options.map((token, idx) => {
        const placed = isPlaced(token);

        return (
          <button
            key={`${token}-${idx}`}
            type="button"
            disabled={disabled || placed}
            onClick={() => onAddToken(token)}
            className={clsx(styles.wordChip, {
              [styles.wordChipPlaced]: placed,
            })}
          >
            {token}
          </button>
        );
      })}
    </div>
  );
}
