import React from 'react';
import { AuthHeader } from './auth-header';
import styles from './layout.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authContainer}>
      <AuthHeader />
      <main className={styles.mainContent}>
        <div className={styles.cardWrapper}>{children}</div>
      </main>
    </div>
  );
}
