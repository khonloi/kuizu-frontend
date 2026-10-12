import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './divider.module.css';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  className?: string;
}

export function Divider({ label, className, ...rest }: DividerProps) {
  return (
    <div role="separator" className={clsx(styles.dividerWrapper, className)} {...rest}>
      <div className={styles.line} />
      {label && <span className={styles.label}>{label}</span>}
      {label && <div className={styles.line} />}
    </div>
  );
}
