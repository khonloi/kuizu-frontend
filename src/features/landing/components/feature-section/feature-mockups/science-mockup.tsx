'use client';

import React from 'react';
import { Activity } from 'lucide-react';
import styles from './mockups.module.css';

export function ScienceMockup() {
  return (
    <div className={styles.mockupCard} aria-label="Spaced Repetition Science Preview">
      <div className={styles.scienceHeader}>
        <div>
          <div className={styles.scienceMetric}>94.2%</div>
          <div className={styles.scienceLabel}>Long-Term Retention Rate</div>
        </div>
        <Activity size={28} color="var(--duo-blue)" />
      </div>

      <div className={styles.retentionCurve} role="img" aria-label="Memory retention chart over 7 days">
        <div className={styles.curveBar} style={{ height: '95%' }} data-day="D1" title="Day 1: 95%" />
        <div className={styles.curveBar} style={{ height: '80%' }} data-day="D2" title="Day 2: 80%" />
        <div className={styles.curveBar} style={{ height: '92%' }} data-day="D3" title="Day 3 Review: 92%" />
        <div className={styles.curveBar} style={{ height: '85%' }} data-day="D4" title="Day 4: 85%" />
        <div className={styles.curveBar} style={{ height: '96%' }} data-day="D7" title="Day 7 Review: 96%" />
        <div className={styles.curveBar} style={{ height: '98%' }} data-day="D14" title="Day 14 Review: 98%" />
      </div>

      <div className={styles.scienceIntervals}>
        <div className={styles.intervalBadge}>24H REVIEW</div>
        <div className={styles.intervalBadge}>3-DAY REINFORCE</div>
        <div className={styles.intervalBadge}>PERMANENT RECALL</div>
      </div>
    </div>
  );
}
