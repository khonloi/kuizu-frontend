'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import styles from './landing-navbar.module.css';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti } from '@/lib/confetti';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

interface LandingNavbarProps {
  isScrolledPastHero?: boolean;
}

export function LandingNavbar({ isScrolledPastHero = false }: LandingNavbarProps) {
  const { playPop, playSuccess } = useAudioStore();
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLangOpen(false);
    };

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLangOpen]);

  const handleSelectLang = (code: string) => {
    setSelectedLang(code);
    setIsLangOpen(false);
    playPop();
  };

  const handleGetStarted = () => {
    playSuccess();
    fireVictoryConfetti();
  };

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) ?? LANGUAGES[0];

  return (
    <header className={styles.navbarContainer} role="banner">
      <div className={styles.inner}>
        {/* Kuizu Brand Logo */}
        <Link href="/" className={styles.brand} onClick={playPop} aria-label="Kuizu Home">
          <div className={styles.logoIcon} aria-hidden="true">
            <svg viewBox="0 0 130 110" width="40" height="34" fill="none">
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

        {/* Right Actions */}
        <div className={styles.actions}>
          {isScrolledPastHero ? (
            <Link href="/learn" onClick={handleGetStarted} style={{ textDecoration: 'none' }}>
              <button type="button" className={styles.stickyGetStarted}>
                GET STARTED
              </button>
            </Link>
          ) : (
            <div className={styles.langSelectorWrapper} ref={dropdownRef}>
              <button
                type="button"
                className={styles.langButton}
                onClick={() => {
                  playPop();
                  setIsLangOpen(!isLangOpen);
                }}
                aria-expanded={isLangOpen}
                aria-haspopup="true"
                aria-label={`Site language: ${currentLang.name}`}
              >
                <span>SITE LANGUAGE: {currentLang.name.toUpperCase()}</span>
                <ChevronDown size={14} />
              </button>

              {isLangOpen && (
                <div className={styles.langDropdown} role="menu">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      role="menuitem"
                      className={clsx(
                        styles.langItem,
                        selectedLang === lang.code && styles.langItemActive
                      )}
                      onClick={() => handleSelectLang(lang.code)}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
