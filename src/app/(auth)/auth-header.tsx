'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useAudioStore } from '@/stores/audio.store';
import styles from './auth-header.module.css';

export function AuthHeader() {
  const pathname = usePathname();
  const { playPop } = useAudioStore();

  const isLoginPage = pathname?.includes('/login') ?? true;

  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerInner}>
        {/* Close Button on the Left */}
        <Link
          href="/"
          onClick={playPop}
          className={styles.closeBtn}
          aria-label="Close and return to home"
        >
          <X size={24} strokeWidth={2.5} className={styles.closeIcon} />
        </Link>

        {/* Switcher Button on the Right */}
        <div className={styles.actionSlot}>
          {isLoginPage ? (
            <Link
              href="/register"
              onClick={playPop}
              className={styles.switchBtn}
              role="button"
            >
              Sign Up
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={playPop}
              className={styles.switchBtn}
              role="button"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
