'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './subject-ribbon.module.css';
import { useAudioStore } from '@/stores/audio.store';

interface SubjectItem {
  id: string;
  name: string;
  iconType: 'flag' | 'chess' | 'math';
  flag?: string;
  href: string;
}

const SUBJECTS: SubjectItem[] = [
  { id: 'en', name: 'ENGLISH', iconType: 'flag', flag: '🇺🇸', href: '/learn' },
  { id: 'chess', name: 'CHESS', iconType: 'chess', href: '/learn' },
  { id: 'math', name: 'MATH', iconType: 'math', href: '/learn' },
  { id: 'es', name: 'SPANISH', iconType: 'flag', flag: '🇪🇸', href: '/learn' },
  { id: 'fr', name: 'FRENCH', iconType: 'flag', flag: '🇫🇷', href: '/learn' },
  { id: 'de', name: 'GERMAN', iconType: 'flag', flag: '🇩🇪', href: '/learn' },
  { id: 'it', name: 'ITALIAN', iconType: 'flag', flag: '🇮🇹', href: '/learn' },
  { id: 'pt', name: 'PORTUGUESE', iconType: 'flag', flag: '🇧🇷', href: '/learn' },
  { id: 'ja', name: 'JAPANESE', iconType: 'flag', flag: '🇯🇵', href: '/learn' },
  { id: 'zh', name: 'CHINESE', iconType: 'flag', flag: '🇨🇳', href: '/learn' },
  { id: 'ko', name: 'KOREAN', iconType: 'flag', flag: '🇰🇷', href: '/learn' },
];

function renderVerticalTricolor(
  clipId: string,
  label: string,
  leftColor: string,
  midColor: string,
  rightColor: string
) {
  return (
    <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label={label}>
      <clipPath id={clipId}><rect width="32" height="22" rx="4" /></clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="11" height="22" fill={leftColor} />
        <rect x="11" width="10" height="22" fill={midColor} />
        <rect x="21" width="11" height="22" fill={rightColor} />
      </g>
      <rect width="32" height="22" rx="4" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
    </svg>
  );
}

function FlagIcon({ id }: { id: string }) {
  switch (id) {
    case 'en':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="English">
          <clipPath id="flagEnClip"><rect width="32" height="22" rx="4" /></clipPath>
          <g clipPath="url(#flagEnClip)">
            <rect width="32" height="22" fill="#b91c1c" />
            <line x1="0" y1="2.5" x2="32" y2="2.5" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="6" x2="32" y2="6" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="9.5" x2="32" y2="9.5" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="13" x2="32" y2="13" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="16.5" x2="32" y2="16.5" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="20" x2="32" y2="20" stroke="#ffffff" strokeWidth="2" />
            <rect width="14" height="11" fill="#1e3a8a" />
            <circle cx="4" cy="3.5" r="1" fill="#ffffff" />
            <circle cx="10" cy="3.5" r="1" fill="#ffffff" />
            <circle cx="7" cy="6" r="1" fill="#ffffff" />
            <circle cx="4" cy="8.5" r="1" fill="#ffffff" />
            <circle cx="10" cy="8.5" r="1" fill="#ffffff" />
          </g>
          <rect width="32" height="22" rx="4" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      );
    case 'chess':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="Chess">
          <rect width="32" height="22" rx="4" fill="#00cd9c" />
          <path d="M11 17h10v-2h-2v-4h1l-1-4h-2v2h-2V7h-2l-1 4h1v4h-2v2z" fill="#ffffff" />
        </svg>
      );
    case 'math':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="Math">
          <rect width="32" height="22" rx="4" fill="#1cb0f6" />
          <text x="16" y="15" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900" fontFamily="sans-serif">+−</text>
        </svg>
      );
    case 'es':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="Spanish">
          <clipPath id="flagEsClip"><rect width="32" height="22" rx="4" /></clipPath>
          <g clipPath="url(#flagEsClip)">
            <rect width="32" height="6" fill="#dc2626" />
            <rect y="6" width="32" height="10" fill="#facc15" />
            <rect y="16" width="32" height="6" fill="#dc2626" />
            <circle cx="9" cy="11" r="2.5" fill="#b45309" />
          </g>
          <rect width="32" height="22" rx="4" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      );
    case 'fr':
      return renderVerticalTricolor('flagFrClip', 'French', '#1d4ed8', '#ffffff', '#dc2626');
    case 'de':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="German">
          <clipPath id="flagDeClip"><rect width="32" height="22" rx="4" /></clipPath>
          <g clipPath="url(#flagDeClip)">
            <rect width="32" height="7.33" fill="#1e293b" />
            <rect y="7.33" width="32" height="7.33" fill="#dc2626" />
            <rect y="14.66" width="32" height="7.34" fill="#facc15" />
          </g>
          <rect width="32" height="22" rx="4" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      );
    case 'it':
      return renderVerticalTricolor('flagItClip', 'Italian', '#16a34a', '#ffffff', '#dc2626');
    case 'pt':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="Portuguese">
          <clipPath id="flagPtClip"><rect width="32" height="22" rx="4" /></clipPath>
          <g clipPath="url(#flagPtClip)">
            <rect width="32" height="22" fill="#16a34a" />
            <polygon points="16,3 27,11 16,19 5,11" fill="#facc15" />
            <circle cx="16" cy="11" r="4.5" fill="#1e3a8a" />
          </g>
          <rect width="32" height="22" rx="4" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      );
    case 'ja':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="Japanese">
          <clipPath id="flagJaClip"><rect width="32" height="22" rx="4" /></clipPath>
          <g clipPath="url(#flagJaClip)">
            <rect width="32" height="22" fill="#ffffff" />
            <circle cx="16" cy="11" r="6" fill="#dc2626" />
          </g>
          <rect width="32" height="22" rx="4" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      );
    case 'zh':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="Chinese">
          <clipPath id="flagZhClip"><rect width="32" height="22" rx="4" /></clipPath>
          <g clipPath="url(#flagZhClip)">
            <rect width="32" height="22" fill="#dc2626" />
            <polygon points="7,4 8,6 10,6.5 8.5,8 9,10 7,9 5,10 5.5,8 4,6.5 6,6" fill="#facc15" />
          </g>
          <rect width="32" height="22" rx="4" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      );
    case 'ko':
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" role="img" aria-label="Korean">
          <clipPath id="flagKoClip"><rect width="32" height="22" rx="4" /></clipPath>
          <g clipPath="url(#flagKoClip)">
            <rect width="32" height="22" fill="#ffffff" />
            <circle cx="16" cy="11" r="5" fill="#dc2626" />
            <path d="M16 11 C18.5 11 18.5 16 16 16 C13.5 16 13.5 11 16 11 Z" fill="#1e3a8a" />
          </g>
          <rect width="32" height="22" rx="4" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      );
    default:
      return null;
  }
}

export function SubjectRibbon() {
  const { playPop } = useAudioStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    playPop();
    if (scrollRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      if (typeof scrollRef.current.scrollBy === 'function') {
        scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollLeft += offset;
      }
    }
  };

  return (
    <section className={styles.ribbonContainer} aria-label="Available Courses and Topics">
      <div className={styles.inner}>
        <button
          type="button"
          className={`${styles.scrollButton} ${styles.scrollLeft}`}
          onClick={() => handleScroll('left')}
          aria-label="Scroll subjects left"
        >
          <ChevronLeft size={22} />
        </button>

        <div className={styles.scrollArea} ref={scrollRef}>
          {SUBJECTS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={styles.subjectCard}
              onClick={playPop}
              aria-label={item.name}
            >
              <div className={styles.flagWrapper} aria-hidden="true">
                <FlagIcon id={item.id} />
              </div>
              <span className={styles.subjectName}>{item.name}</span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.scrollButton} ${styles.scrollRight}`}
          onClick={() => handleScroll('right')}
          aria-label="Scroll subjects right"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
