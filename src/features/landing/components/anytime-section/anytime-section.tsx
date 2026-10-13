'use client';

import React from 'react';
import styles from './anytime-section.module.css';

export function AnytimeSection() {
  return (
    <section className={styles.anytimeWrapper} aria-label="Learn anytime, anywhere">
      <div className={styles.inner}>
        <h2 className={styles.title}>learn anytime, anywhere</h2>

        <div className={styles.badgeGroup}>
          {/* Apple App Store */}
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noreferrer"
            className={styles.storeBadge}
            aria-label="Download on the App Store"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#3c3c3c">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1 .08 2.02-.5 2.64-1.24z" />
            </svg>
            <div className={styles.badgeText}>
              <span className={styles.badgeSubtitle}>Download on the</span>
              <span className={styles.badgeTitle}>App Store</span>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noreferrer"
            className={styles.storeBadge}
            aria-label="Get it on Google Play"
          >
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M3.6 2.3L13.7 12 3.6 21.7c-.4-.4-.6-1-.6-1.7V4c0-.7.2-1.3.6-1.7z" />
              <path fill="#FBBC04" d="M17.1 8.7L13.7 12l3.4 3.3 3.8-2.2c.7-.4.7-1.8 0-2.2l-3.8-2.2z" />
              <path fill="#34A853" d="M3.6 21.7L17.1 14.1l-3.4-2.1-10.1 9.7z" />
              <path fill="#EA4335" d="M3.6 2.3l10.1 9.7 3.4-2.1L3.6 2.3z" />
            </svg>
            <div className={styles.badgeText}>
              <span className={styles.badgeSubtitle}>Get it on</span>
              <span className={styles.badgeTitle}>Google Play</span>
            </div>
          </a>
        </div>

        {/* Floating Perspective Elements Graphic with Lucy & Kitten */}
        <div className={styles.floatingContainer} aria-hidden="true">
          <svg viewBox="0 0 780 240" width="100%" height="100%" fill="none">
            {/* Left Floating Perspective Phone */}
            <g transform="rotate(-18 100 80)">
              <rect x="70" y="30" width="85" height="130" rx="20" fill="#ffffff" stroke="#1f2937" strokeWidth="6" />
              <rect x="80" y="45" width="65" height="20" rx="8" fill="#1cb0f6" />
              <rect x="80" y="75" width="65" height="8" rx="4" fill="#e5e5e5" />
              <rect x="80" y="90" width="45" height="8" rx="4" fill="#e5e5e5" />
            </g>

            {/* Streak Flame */}
            <path d="M50 140 C40 120, 60 100, 70 90 C85 110, 100 125, 80 150 C70 155, 55 155, 50 140 Z" fill="#ff9600" />
            <ellipse cx="68" cy="135" rx="7" ry="10" fill="#fde047" />

            {/* Letter Block: ñ */}
            <rect x="135" y="115" width="44" height="44" rx="12" fill="#c084fc" />
            <text x="157" y="146" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif">ñ</text>

            {/* Letter Block: 中 */}
            <rect x="150" y="170" width="46" height="46" rx="12" fill="#f43f5e" />
            <text x="173" y="202" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif">中</text>

            {/* Gold Crown */}
            <polygon points="455,100 465,120 480,95 495,120 505,100 505,130 455,130" fill="#facc15" />

            {/* Center Phone Frame with Lucy Popping Out */}
            <g transform="rotate(-6 350 120)">
              {/* Phone Body */}
              <rect x="250" y="50" width="130" height="170" rx="28" fill="#ffffff" stroke="#1f2937" strokeWidth="7" />
              <rect x="262" y="62" width="106" height="146" rx="20" fill="#bae6fd" />

              {/* Lucy (Grandma) Popping Out */}
              {/* Orange Dress / Body */}
              <ellipse cx="345" cy="140" rx="36" ry="32" fill="#f97316" />
              <ellipse cx="345" cy="148" rx="18" ry="8" fill="#ffffff" />
              {/* Head */}
              <circle cx="360" cy="115" r="22" fill="#fde047" />
              {/* Grey Bun Hair */}
              <circle cx="355" cy="85" r="14" fill="#64748b" />
              <path d="M340 105 C340 88, 380 88, 380 105 Z" fill="#64748b" />
              {/* Surprised Eyes & Open Mouth */}
              <circle cx="356" cy="112" r="2.5" fill="#1e293b" />
              <circle cx="368" cy="112" r="2.5" fill="#1e293b" />
              <ellipse cx="363" cy="122" rx="4" ry="5" fill="#1e293b" />
              {/* Outstretched Arms */}
              <path d="M375 132 C395 142, 410 155, 418 168" stroke="#f97316" strokeWidth="12" strokeLinecap="round" />
              <circle cx="418" cy="168" r="6" fill="#fde047" />
            </g>

            {/* Little Blue Jumping Kitten */}
            <g transform="translate(370, 150)">
              {/* Cat Body */}
              <ellipse cx="60" cy="25" rx="18" ry="14" fill="#38bdf8" />
              {/* Cat Head */}
              <circle cx="75" cy="16" r="11" fill="#38bdf8" />
              {/* Ears */}
              <polygon points="70,7 74,13 67,12" fill="#0284c7" />
              <polygon points="78,7 82,13 75,12" fill="#0284c7" />
              {/* Eyes */}
              <circle cx="77" cy="16" r="2" fill="#ffffff" />
              {/* Paws */}
              <circle cx="48" cy="30" r="5" fill="#0284c7" />
              <circle cx="68" cy="35" r="5" fill="#0284c7" />
              {/* Tail */}
              <path d="M42 22 C32 20, 28 32, 34 38" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>

            {/* Right Perspective Phone */}
            <g transform="rotate(22 600 120)">
              <rect x="540" y="50" width="85" height="135" rx="20" fill="#ffffff" stroke="#1f2937" strokeWidth="6" />
              <rect x="550" y="65" width="65" height="24" rx="6" fill="#38bdf8" />
              <rect x="550" y="98" width="65" height="45" rx="8" fill="#e0f2fe" />
            </g>

            {/* Letter Block: 가 */}
            <rect x="705" y="170" width="46" height="46" rx="12" fill="#10b981" />
            <text x="728" y="202" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif">가</text>

            {/* Diamond Gem */}
            <polygon points="660,70 675,85 660,100 645,85" fill="#00cd9c" />
            <polygon points="660,70 675,85 660,85" fill="#5eead4" />

            {/* Floating Lingot / Diamond */}
            <polygon points="260,20 272,32 260,44 248,32" fill="#38bdf8" />
          </svg>
        </div>
      </div>
    </section>
  );
}
