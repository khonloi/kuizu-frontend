'use client';

import React from 'react';
import clsx from 'clsx';
import { Card, Button } from '@/components/ui';
import styles from '../shop.module.css';

interface ShopItemCardProps {
  icon: React.ReactNode;
  iconClassName: string;
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
  actionIcon: React.ReactNode;
  actionVariant?: 'duo' | 'blue' | 'yellow';
  isLoading?: boolean;
  disabled?: boolean;
  onAction: () => void;
  testId?: string;
}

export function ShopItemCard({
  icon,
  iconClassName,
  title,
  subtitle,
  description,
  actionText,
  actionIcon,
  actionVariant = 'duo',
  isLoading = false,
  disabled = false,
  onAction,
  testId,
}: ShopItemCardProps) {
  return (
    <Card padding="lg" className={styles.itemCard} data-testid={testId}>
      <div className={styles.itemHeader}>
        <div className={clsx(styles.iconBox, iconClassName)}>
          {icon}
        </div>
        <div>
          <h3 className={styles.itemTitle}>{title}</h3>
          <span className={styles.itemSubtitle}>{subtitle}</span>
        </div>
      </div>

      <p className={styles.itemDescription}>{description}</p>

      <Button
        variant={actionVariant}
        size="md"
        fullWidth
        isLoading={isLoading}
        disabled={disabled}
        onClick={onAction}
        leftIcon={actionIcon}
      >
        {actionText}
      </Button>
    </Card>
  );
}
