import React from 'react';
import type { Metadata } from 'next';
import styles from '@/features/arena/arena.module.css';

export const metadata: Metadata = {
  title: 'Multiplayer Arena | Kuizu',
  description: 'Real-time live quiz multiplayer arena with instant sync',
};

export default function ArenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="stadium" className={styles.arenaLayout}>
      {children}
    </div>
  );
}
