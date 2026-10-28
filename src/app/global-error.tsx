'use client';

import React from 'react';
import { HeartCrack } from 'lucide-react';
import styles from './status-pages.module.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={styles.globalErrorBody}>
        <div className={styles.globalErrorCard}>
          <div className={styles.globalErrorEmoji}>
            <HeartCrack size={56} color="var(--duo-red)" />
          </div>
          <h1 className={styles.globalErrorTitle}>
            Critical App Encounter
          </h1>
          <p className={styles.globalErrorDescription}>
            {error.message || 'The application encountered a critical exception.'}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className={styles.globalErrorBtn}
          >
            Restart Application
          </button>
        </div>
      </body>
    </html>
  );
}
