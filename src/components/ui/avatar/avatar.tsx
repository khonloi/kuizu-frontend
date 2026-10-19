'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarRing = 'none' | 'duo' | 'blue' | 'kahoot' | 'gold';

const pixelSizes: Record<AvatarSize, number> = {
  sm: 32,
  md: 44,
  lg: 64,
  xl: 96,
};

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  ring?: AvatarRing;
  showStatus?: boolean;
  className?: string;
  unoptimized?: boolean;
}

export function Avatar({
  src,
  alt,
  name = 'Player',
  size = 'md',
  ring = 'none',
  showStatus = false,
  className,
  unoptimized,
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

  const dimension = pixelSizes[size];
  const isTest = process.env.NODE_ENV === 'test';

  return (
    <div className={clsx(styles.avatarContainer, sizeClass, ringClass, className)}>
      <div className={styles.inner}>
        {src && !hasError ? (
          <Image
            src={src}
            alt={alt || name}
            width={dimension}
            height={dimension}
            className={styles.image}
            onError={() => setHasError(true)}
            unoptimized={unoptimized ?? (isTest || src.startsWith('data:') || src.endsWith('.svg'))}
          />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}
      </div>

      {showStatus && <span className={styles.statusDot} aria-label="Online" />}
    </div>
  );
}
