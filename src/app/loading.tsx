import React from 'react';
import styles from './status-pages.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.spinner} animate-spin`} />
      <span className={styles.loadingText}>
        LOADING QUEST...
      </span>
    </div>
  );
}
