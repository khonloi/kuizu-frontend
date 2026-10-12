import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './skeleton.module.css';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <div
      role="status"
      aria-label="Loading content..."
      className={clsx(styles.skeleton, styles[variant], className)}
      style={customStyle}
      {...rest}
    />
  );
}
