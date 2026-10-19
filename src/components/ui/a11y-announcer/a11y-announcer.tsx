'use client';

import React from 'react';
import { useAnnouncerStore } from '@/lib/a11y/announcer.store';
import styles from './a11y-announcer.module.css';

export function A11yAnnouncer() {
  const { message, politeness } = useAnnouncerStore();

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className={styles.srOnly}
      data-testid="a11y-announcer"
    >
      {message}
    </div>
  );
}
