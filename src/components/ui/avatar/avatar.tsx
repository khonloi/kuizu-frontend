'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarRing = 'none' | 'duo' | 'blue' | 'kahoot' | 'gold';

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  ring?: AvatarRing;
  showStatus?: boolean;
  className?: string;
}

export function Avatar({
  src,
  alt,
  name = 'Player',
  size = 'md',
  ring = 'none',
  showStatus = false,
  className,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'P';

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
    xl: styles.sizeXl,
  }[size];

  const ringClass = {
    none: '',
    duo: styles.ringDuo,
    blue: styles.ringBlue,
    kahoot: styles.ringKahoot,
    gold: styles.ringGold,
  }[ring];

  return (
    <div className={clsx(styles.avatarContainer, sizeClass, ringClass, className)}>
      <div className={styles.inner}>
        {src && !hasError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || name}
            className={styles.image}
            onError={() => setHasError(true)}
          />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}
      </div>

      {showStatus && <span className={styles.statusDot} aria-label="Online" />}
    </div>
  );
}
