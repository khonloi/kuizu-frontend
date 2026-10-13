'use client';

import React from 'react';
import Link from 'next/link';
import styles from './landing-footer.module.css';
import { useAudioStore } from '@/stores/audio.store';

const SITE_LANGUAGES = [
  'العربية', 'বাংলা', 'Čeština', 'Deutsch', 'Ελληνικά', 'English', 'Español', 'Français',
  'हिंदी', 'Magyar', 'Bahasa Indonesia', 'Italiano', '日本語', 'ಕನ್ನಡ', '한국어', 'मराठी',
  'Nederlands', 'ਪੰਜਾਬੀ', 'Polski', 'Português', 'Română', 'Русский', 'svenska', 'தமிழ்',
  'తెలుగు', 'ภาษาไทย', 'Tagalog', 'Türkçe', 'Українською', 'اُردُو', 'Tiếng Việt', '中文'
];

export function LandingFooter() {
  const { playPop } = useAudioStore();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* 5 Column Grid */}
        <div className={styles.linksGrid}>
          {/* Column 1: About us */}
          <div className={styles.column}>
            <div className={styles.columnTitle}>About us</div>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Courses</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Mission</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Approach</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Efficacy</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Kuizu Handbook</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Research</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Careers</Link>
            <Link href="/shop" className={styles.footerLink} onClick={playPop}>Store</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Press</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Investors</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Contact us</Link>
          </div>

          {/* Column 2: Products */}
          <div className={styles.column}>
            <div className={styles.columnTitle}>Products</div>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Kuizu</Link>
            <Link href="/arena/host" className={styles.footerLink} onClick={playPop}>Kuizu for Schools</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Kuizu English Test</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Podcast</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Kuizu for Business</Link>
            <Link href="/shop" className={styles.footerLink} onClick={playPop}>Super Kuizu</Link>
            <Link href="/shop" className={styles.footerLink} onClick={playPop}>Gift Super Kuizu</Link>
            <Link href="/shop" className={styles.footerLink} onClick={playPop}>Kuizu Max</Link>
          </div>

          {/* Column 3: Apps */}
          <div className={styles.column}>
            <div className={styles.columnTitle}>Apps</div>
            <a href="https://play.google.com" target="_blank" rel="noreferrer" className={styles.footerLink} onClick={playPop}>
              Kuizu for Android
            </a>
            <a href="https://apps.apple.com" target="_blank" rel="noreferrer" className={styles.footerLink} onClick={playPop}>
              Kuizu for iOS
            </a>
          </div>

          {/* Column 4: Help and support */}
          <div className={styles.column}>
            <div className={styles.columnTitle}>Help and support</div>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Kuizu FAQs</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Schools FAQs</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Kuizu English Test FAQs</Link>
            <a href="http://localhost:4000/api/docs" target="_blank" rel="noreferrer" className={styles.footerLink} onClick={playPop}>
              Status
            </a>
          </div>

          {/* Column 5: Privacy and terms + Social */}
          <div className={styles.column}>
            <div className={styles.columnTitle}>Privacy and terms</div>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Community guidelines</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Terms</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>Privacy</Link>
            <Link href="/learn" className={styles.footerLink} onClick={playPop}>
              Do Not Sell or Share My Personal Information
            </Link>

            <div className={styles.socialSubGroup}>
              <div className={styles.columnTitle}>Social</div>
              <Link href="/learn" className={styles.footerLink} onClick={playPop}>Blog</Link>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.footerLink}>Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className={styles.footerLink}>TikTok</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.footerLink}>Twitter</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.footerLink}>YouTube</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.footerLink}>LinkedIn</a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Bottom Section: Site Language */}
        <div className={styles.langSection}>
          <div className={styles.langTitle}>Site language:</div>
          <div className={styles.langList}>
            {SITE_LANGUAGES.map((lang) => (
              <span key={lang} className={styles.langItem} onClick={playPop} style={{ cursor: 'pointer' }}>
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
