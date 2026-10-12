import React from 'react';
import styles from './layout.module.css';
import { Sidebar, MobileNav, StatsBar } from '@/components/layout';
import { HeartRefillModal } from '@/features/gamification/heart-refill-modal';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.appLayout}>
      {/* Desktop Persistent Sidebar */}
      <Sidebar />

      {/* Main Body */}
      <div className={styles.mainWrapper}>
        <StatsBar />
        <main className={styles.contentContainer}>{children}</main>
      </div>

      {/* Mobile Floating Nav Dock */}
      <MobileNav />

      {/* Global Interactive Modals */}
      <HeartRefillModal />
    </div>
  );
}
