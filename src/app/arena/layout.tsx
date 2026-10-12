import React from 'react';
import type { Metadata } from 'next';

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
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {children}
    </div>
  );
}
