'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home, AlertTriangle } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

import styles from './status-pages.module.css';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error caught by boundary:', error);
  }, [error]);

  return (
    <div className={styles.statusContainer}>
      <Card
        padding="lg"
        className={styles.statusCard}
      >
        <div className={`${styles.errorIconWrapper} animate-shake`}>
          <AlertTriangle size={36} color="var(--duo-red)" />
        </div>

        <div>
          <Badge variant="red" size="sm">
            UNEXPECTED OBSTACLE
          </Badge>
          <h1 className={styles.statusTitle}>
            Something went wrong!
          </h1>
          <p className={styles.statusDescription}>
            {error.message || 'An unexpected error occurred while loading this quest.'}
          </p>
        </div>

        <div className={styles.statusActions}>
          <Button
            variant="duo"
            size="md"
            onClick={() => reset()}
            leftIcon={<RotateCcw size={18} />}
          >
            Try Again
          </Button>

          <Link href="/learn">
            <Button variant="secondary" size="md" leftIcon={<Home size={18} />}>
              Return to Quests
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
