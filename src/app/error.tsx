'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home, AlertTriangle } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

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
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <Card
        padding="lg"
        glow="kahoot"
        style={{
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: 'var(--duo-red-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="animate-shake"
        >
          <AlertTriangle size={36} color="var(--duo-red)" />
        </div>

        <div>
          <Badge variant="red" size="sm">
            UNEXPECTED OBSTACLE
          </Badge>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
            Something went wrong!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            {error.message || 'An unexpected error occurred while loading this quest.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
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
