import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './badge.module.css';

export type BadgeVariant =
  | 'duo'
  | 'blue'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'neutral';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  className,
  variant = 'neutral',
  size = 'md',
  icon,
  ...rest
}: BadgeProps) {
  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
  }[size];

  const variantClass = styles[variant] || styles.neutral;

  return (
    <span
      className={clsx(styles.badge, sizeClass, variantClass, className)}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
