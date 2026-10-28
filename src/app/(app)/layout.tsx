import React from 'react';
import styles from './layout.module.css';
import { Sidebar, MobileNav, StatsBar, SkipLink, DemoModeBanner } from '@/components/layout';
import { HeartRefillModal } from '@/features/gamification/heart-refill-modal';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.appLayout}>
      {/* Skip to Content for Keyboard and Screen Reader Users */}
      <SkipLink targetId="main-content" />

      {/* Desktop Persistent Sidebar */}
      <Sidebar />

      {/* Main Body */}
      <div className={styles.mainWrapper}>
        <DemoModeBanner />
        <StatsBar />
        <main id="main-content" tabIndex={-1} className={styles.contentContainer}>
          {children}
        </main>
      </div>

      {/* Mobile Floating Nav Dock */}
      <MobileNav />

      {/* Global Interactive Modals */}
      <HeartRefillModal />
    </div>
  );
}
