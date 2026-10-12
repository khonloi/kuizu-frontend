import React from 'react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authContainer}>
      <Link href="/learn" className={styles.brand}>
        <div className={styles.logoIcon}>⚡</div>
        <span className={styles.logoText}>KUIZU</span>
      </Link>

      <div className={styles.cardWrapper}>{children}</div>
    </div>
  );
}
