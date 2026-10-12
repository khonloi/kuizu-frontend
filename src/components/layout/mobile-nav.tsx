'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { BookOpen, Trophy, ShoppingBag, Gamepad2, User } from 'lucide-react';
import styles from './mobile-nav.module.css';
import { useAudioStore } from '../../stores/audio.store';

const MOBILE_ITEMS = [
  { href: '/learn', label: 'Learn', icon: BookOpen, theme: 'learn' },
  { href: '/leaderboard', label: 'Leagues', icon: Trophy, theme: 'leaderboard' },
  { href: '/arena/join', label: 'Arena', icon: Gamepad2, theme: 'arena' },
  { href: '/shop', label: 'Shop', icon: ShoppingBag, theme: 'shop' },
  { href: '/profile', label: 'Profile', icon: User, theme: 'profile' },
];

export function MobileNav() {
  const pathname = usePathname();
  const playPop = useAudioStore((s) => s.playPop);

  return (
    <nav className={styles.mobileNav} aria-label="Mobile Navigation">
      {MOBILE_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={playPop}
            className={clsx(styles.item, {
              [styles.itemActive]: isActive,
              [styles[item.theme]]: isActive,
            })}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
