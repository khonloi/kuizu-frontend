'use client';

import React from 'react';
import { Home, Compass } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

import styles from './status-pages.module.css';

export default function NotFound() {
  return (
    <div className={styles.statusContainer}>
      <Card
        padding="lg"
        className={styles.statusCard}
      >
        <div className={`${styles.emojiBig} animate-pop`}>
          <Compass size={72} color="var(--duo-blue)" />
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
          <Button href="/learn" variant="duo" size="md" leftIcon={<Home size={18} />}>
            Back to Learn Path
          </Button>

          <Button href="/arena/join" variant="kahoot" size="md" leftIcon={<Compass size={18} />}>
            Join Live Arena
          </Button>
        </div>
      </Card>
    </div>
  );
}
