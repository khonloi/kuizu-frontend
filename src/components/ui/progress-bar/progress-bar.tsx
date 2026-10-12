import React from 'react';
import clsx from 'clsx';
import styles from './progress-bar.module.css';

export type ProgressColor = 'duo' | 'blue' | 'yellow' | 'red';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  color?: ProgressColor;
  size?: ProgressSize;
  className?: string;
  showHighlight?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = 'duo',
  size = 'md',
  className,
  showHighlight = true,
}: ProgressBarProps) {
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
      aria-valuenow={value}
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
