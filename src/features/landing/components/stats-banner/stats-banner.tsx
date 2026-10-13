'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './stats-banner.module.css';

interface Stat {
  id: string;
  value: string;
  label: string;
  subtext: string;
  colorClass: string;
}

const STATS: Stat[] = [
  {
    id: 'quests',
    value: '500M+',
    label: 'Quests Completed',
    subtext: 'Across 30+ interactive skill paths',
    colorClass: styles.valGreen,
  },
  {
    id: 'free',
    value: '100%',
    label: 'Free & Accessible',
    subtext: 'High-quality education for everyone',
    colorClass: styles.valBlue,
  },
  {
    id: 'arena',
    value: '#1',
    label: 'Real-Time Arena',
    subtext: 'Classroom & team quiz showdowns',
    colorClass: styles.valRed,
  },
  {
    id: 'rating',
    value: '4.9 ★',
    label: 'Average Learner Rating',
    subtext: 'From over 2,000,000 active reviews',
    colorClass: styles.valYellow,
  },
];

export function StatsBanner() {
  return (
    <section className={styles.statsWrapper} aria-label="Social Proof and Learning Statistics">
      <div className={styles.inner}>
        {STATS.map((stat) => (
          <div key={stat.id} className={styles.statItem}>
            <div className={clsx(styles.statValue, stat.colorClass)}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statSubtext}>{stat.subtext}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
