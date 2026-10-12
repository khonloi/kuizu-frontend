'use client';

import React from 'react';
import clsx from 'clsx';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import styles from './drawer.module.css';

export type DrawerStatus = 'success' | 'error' | 'neutral';

export interface DrawerProps {
  isOpen: boolean;
  status?: DrawerStatus;
  headline: string;
  subtext?: string;
  action: React.ReactNode;
  className?: string;
}

export function Drawer({
  isOpen,
  status = 'neutral',
  headline,
  subtext,
  action,
  className,
}: DrawerProps) {
  if (!isOpen) return null;

  const statusClass = {
    success: styles.success,
    error: styles.error,
    neutral: styles.neutral,
  }[status];

  const iconClass = {
    success: styles.iconSuccess,
    error: styles.iconError,
    neutral: styles.iconNeutral,
  }[status];

  const IconComponent =
    status === 'success'
      ? CheckCircle2
      : status === 'error'
        ? XCircle
        : Info;

  return (
    <div
      role="region"
      aria-live="polite"
      className={clsx(styles.drawerWrapper, statusClass, 'animate-slide-up', className)}
    >
      <div className={styles.container}>
        <div className={styles.contentGroup}>
          <div className={clsx(styles.iconCircle, iconClass)}>
            <IconComponent size={32} />
          </div>

          <div className={styles.messageGroup}>
            <span className={styles.headline}>{headline}</span>
            {subtext && <span className={styles.subtext}>{subtext}</span>}
          </div>
        </div>

        <div className={styles.actionSlot}>{action}</div>
      </div>
    </div>
  );
}
