'use client';

import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './feature-section.module.css';

interface FeatureSectionProps {
  id?: string;
  title: string;
  description: ReactNode;
  visual: ReactNode;
  reversed?: boolean;
}

export function FeatureSection({
  id,
  title,
  description,
  visual,
  reversed = false,
}: FeatureSectionProps) {
  return (
    <section id={id} className={styles.sectionWrapper}>
      <div className={clsx(styles.inner, reversed && styles.reversed)}>
        {/* Content Column */}
        <div className={styles.contentCol}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.description}>{description}</div>
        </div>

        {/* Visual Mockup Column */}
        <div className={styles.visualCol}>
          {visual}
        </div>
      </div>
    </section>
  );
}
