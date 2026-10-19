'use client';

import React from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';
import styles from '../shop.module.css';

interface ShopHeaderProps {
  gems: number;
}

export function ShopHeader({ gems }: ShopHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <Badge variant="blue" size="sm" icon={<Sparkles size={14} />}>
          POWER-UPS & BOOSTERS
        </Badge>
        <h1 className={styles.headerTitle}>Gem Bazaar</h1>
        <p className={styles.headerDescription}>
          Spend your hard-earned gems to protect streaks and refill quest hearts.
        </p>
      </div>

      <div className={styles.gemPill} data-testid="shop-gem-pill">
        <Gem size={24} fill="var(--duo-blue)" />
        <span>{gems} Gems</span>
      </div>
    </div>
  );
}
