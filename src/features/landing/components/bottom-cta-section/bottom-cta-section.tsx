'use client';

import React from 'react';
import Link from 'next/link';
import styles from './bottom-cta-section.module.css';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti } from '@/lib/confetti';

export function BottomCtaSection() {
  const { playSuccess } = useAudioStore();

  const handleGetStarted = () => {
    playSuccess();
    fireVictoryConfetti();
  };

  return (
    <section className={styles.bottomCtaWrapper} aria-label="Get started learning a language">
      <div className={styles.inner}>
        <h2 className={styles.title}>learn a language with kuizu</h2>

        <Link href="/learn" onClick={handleGetStarted} style={{ textDecoration: 'none' }}>
          <button type="button" className={styles.ctaButton}>
            GET STARTED
          </button>
        </Link>

        {/* Floating Collectibles (Chest, Coins, Heart, Phone, Flame, Weights) */}
        <div className={styles.collectiblesWrapper} aria-hidden="true">
          <svg viewBox="0 0 680 140" width="100%" height="100%" fill="none">
            {/* Treasure Chest */}
            <g transform="translate(60, 25)">
              <rect x="0" y="30" width="70" height="50" rx="10" fill="#a16207" />
              <polygon points="-5,30 75,30 65,0 5,0" fill="#ca8a04" />
              <circle cx="35" cy="45" r="8" fill="#facc15" />
              {/* Spilling Blue Gems */}
              <polygon points="50,15 65,30 45,30" fill="#38bdf8" />
              <polygon points="70,35 85,45 70,55" fill="#0284c7" />
              <polygon points="55,50 68,60 52,68" fill="#38bdf8" />
            </g>

            {/* Floating Gold Coins */}
            <ellipse cx="200" cy="80" rx="24" ry="14" fill="#facc15" stroke="#eab308" strokeWidth="4" />
            <ellipse cx="240" cy="95" rx="30" ry="16" fill="#facc15" stroke="#eab308" strokeWidth="4" />
            <ellipse cx="215" cy="40" rx="20" ry="10" fill="#facc15" stroke="#eab308" strokeWidth="3" />

            {/* Red Heart */}
            <path d="M260 40 C260 25, 275 25, 280 35 C285 25, 300 25, 300 40 C300 55, 280 65, 280 65 C280 65, 260 55, 260 40 Z" fill="#ef4444" />

            {/* Phone Base in Center */}
            <g transform="translate(290, 30)">
              <rect x="0" y="0" width="100" height="100" rx="22" fill="#ffffff" stroke="#00cd9c" strokeWidth="8" />
              <ellipse cx="50" cy="40" rx="28" ry="14" fill="#facc15" />
            </g>

            {/* Streak Flame */}
            <g transform="translate(460, 25)">
              <path d="M20 50 C10 30, 30 10, 40 0 C55 20, 70 35, 50 60 C40 65, 25 65, 20 50 Z" fill="#ff9600" />
              <ellipse cx="38" cy="45" rx="8" ry="12" fill="#fde047" />
            </g>

            {/* Dumbbells (Blue) */}
            <g transform="translate(540, 35)">
              <circle cx="15" cy="15" r="12" fill="#1cb0f6" />
              <circle cx="45" cy="35" r="12" fill="#1cb0f6" />
              <line x1="15" y1="15" x2="45" y2="35" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* Full-width seamless rolling hill transitioning into footer */}
      <div className={styles.hillsDivider} aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
          className={styles.hillsSvg}
        >
          <path
            d="M 0 50 Q 240 10, 520 40 T 1000 30 Q 1240 50, 1440 20 L 1440 90 L 0 90 Z"
            fill="#00cd9c"
          />
        </svg>
      </div>
    </section>
  );
}
