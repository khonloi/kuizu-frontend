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
import { useAudioStore } from '../../stores/audio.store';
import { useAuthStore } from '../../stores/auth.store';
import { Avatar } from '../ui/avatar';

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
      <Link href="/learn" className={styles.brand} onClick={playPop}>
        <div className={styles.logoIcon}>⚡</div>
        <span className={styles.logoText}>KUIZU</span>
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
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0.25rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Avatar name={user.username} src={user.avatarUrl} size="sm" ring="duo" />
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.username}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {user.league || 'Bronze'} League
              </span>
            </div>
          </Link>
        ) : (
          <Link
            href="/login"
            onClick={playPop}
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '0.65rem',
              borderRadius: '12px',
              backgroundColor: 'var(--duo-green-subtle)',
              color: 'var(--duo-green)',
              fontWeight: 800,
              fontSize: '0.85rem',
              textDecoration: 'none',
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </aside>
  );
}
