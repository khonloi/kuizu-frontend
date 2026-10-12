import React from 'react';
import clsx from 'clsx';
import styles from './progress-bar.module.css';

export type ProgressColor = 'duo' | 'blue' | 'yellow' | 'red';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  color?: ProgressColor;
  size?: ProgressSize;
  className?: string;
  showHighlight?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color = 'duo',
  size = 'md',
  className,
  showHighlight = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const heightClass = {
    sm: styles.heightSm,
    md: styles.heightMd,
    lg: styles.heightLg,
  }[size];

  const colorClass = styles[color] || styles.duo;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      className={clsx(styles.track, heightClass, className)}
    >
      <div
        className={clsx(styles.bar, colorClass)}
        style={{ width: `${percentage}%` }}
      >
        {showHighlight && percentage > 3 && (
          <span className={styles.highlight} />
        )}
      </div>
    </div>
  );
}
