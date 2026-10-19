import React from 'react';
import styles from './skip-link.module.css';

interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export function SkipLink({
  targetId = 'main-content',
  label = 'Skip to main content',
}: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      {label}
    </a>
  );
}
