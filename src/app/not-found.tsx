'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

export default function NotFound() {
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
        glow="duo"
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
        <div style={{ fontSize: '4.5rem' }} className="animate-pop">
          🗺️
        </div>

        <div>
          <Badge variant="blue" size="sm">
            404 • UNCHARTED TERRITORY
          </Badge>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
            Quest Path Lost!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            The learning path or game room you were looking for doesn&apos;t exist or has moved to another territory.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
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
