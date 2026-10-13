'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

import styles from './status-pages.module.css';

export default function NotFound() {
  return (
    <div className={styles.statusContainer}>
      <Card
        padding="lg"
        glow="duo"
        className={styles.statusCard}
      >
        <div className={`${styles.emojiBig} animate-pop`}>
          🗺️
        </div>

        <div>
          <Badge variant="blue" size="sm">
            404 • UNCHARTED TERRITORY
          </Badge>
          <h1 className={styles.statusTitleLg}>
            Quest Path Lost!
          </h1>
          <p className={styles.statusDescription}>
            The learning path or game room you were looking for doesn&apos;t exist or has moved to another territory.
          </p>
        </div>

        <div className={styles.statusActions}>
          <Link href="/learn">
            <Button variant="duo" size="md" leftIcon={<Home size={18} />}>
              Back to Learn Path
            </Button>
          </Link>

          <Link href="/arena/join">
            <Button variant="kahoot" size="md" leftIcon={<Compass size={18} />}>
              Join Live Arena
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
