'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  BookOpen,
  Trophy,
  ShoppingBag,
  Gamepad2,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';
import styles from './sidebar.module.css';
import { useAudioStore } from '@/stores/audio.store';
import { useAuthStore } from '@/stores/auth.store';
import { Avatar } from '@/components/ui';

interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  theme: 'learn' | 'leaderboard' | 'arena' | 'shop' | 'profile';
}

const NAV_LINKS: NavLink[] = [
  { href: '/learn', label: 'Learn', icon: BookOpen, theme: 'learn' },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy, theme: 'leaderboard' },
  { href: '/shop', label: 'Shop', icon: ShoppingBag, theme: 'shop' },
  { href: '/arena/join', label: 'Live Arena', icon: Gamepad2, theme: 'arena' },
  { href: '/profile', label: 'Profile', icon: User, theme: 'profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isMuted, toggleMute, playPop } = useAudioStore();
  const user = useAuthStore((s) => s.user);

  return (
    <aside className={styles.sidebar}>
      {/* Brand logo */}
      <Link href="/learn" className={styles.brand} onClick={playPop} aria-label="Kuizu Home">
        <div className={styles.logoIcon} aria-hidden="true">
          <svg viewBox="0 0 130 110" width="38" height="32" fill="none">
            {/* Kuizu Mascot Head Silhouette with Feather Tufts */}
            <path
              d="M 28 85 C 10 75 8 40 26 22 C 38 10 58 10 76 16 C 88 10 102 8 114 16 C 118 20 120 28 116 34 C 122 40 124 50 120 58 C 122 66 118 76 110 82 C 96 96 60 105 38 98 C 32 95 29 90 28 85 Z"
              fill="#00cd9c"
            />
            {/* Lighter Teal Eye Surround Masks */}
            <ellipse cx="50" cy="52" rx="22" ry="24" fill="#35eec0" />
            <ellipse cx="88" cy="52" rx="22" ry="24" fill="#35eec0" />
            {/* Large White Eyes */}
            <ellipse cx="52" cy="52" rx="16" ry="18" fill="#ffffff" />
            <ellipse cx="86" cy="52" rx="16" ry="18" fill="#ffffff" />
            {/* Expressive Pupils */}
            <circle cx="54" cy="52" r="8" fill="#4b4b4b" />
            <circle cx="84" cy="52" r="8" fill="#4b4b4b" />
            {/* Pupil Highlights */}
            <circle cx="56" cy="50" r="3" fill="#ffffff" />
            <circle cx="86" cy="50" r="3" fill="#ffffff" />
            {/* Orange Beak */}
            <path d="M 69 70 L 61 56 L 77 56 Z" fill="#ff9600" />
          </svg>
        </div>
        <span className={styles.logoText}>kuizu</span>
      </Link>

      {/* Nav items */}
      <nav className={styles.navGroup} aria-label="Main Navigation">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={playPop}
              className={clsx(styles.navItem, {
                [styles.navItemActive]: isActive,
                [styles[link.theme]]: isActive,
              })}
            >
              <Icon size={22} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer tools & profile snippet */}
      <div className={styles.footer}>
        <button
          type="button"
          onClick={toggleMute}
          className={styles.soundToggle}
          aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          <span>Sound SFX</span>
          {isMuted ? <VolumeX size={18} color="var(--duo-red)" /> : <Volume2 size={18} color="var(--duo-green)" />}
        </button>

        {user ? (
          <Link
            href="/profile"
            onClick={playPop}
            className={styles.userProfileLink}
          >
            <Avatar name={user.username} src={user.avatarUrl} size="sm" ring="duo" />
            <div className={styles.userProfileInfo}>
              <span className={styles.userProfileName}>
                {user.username}
              </span>
              <span className={styles.userProfileLeague}>
                {user.league || 'Bronze'} League
              </span>
            </div>
          </Link>
        ) : (
          <Link
            href="/login"
            onClick={playPop}
            className={styles.loginButton}
          >
            Sign In
          </Link>
        )}
      </div>
    </aside>
  );
}
