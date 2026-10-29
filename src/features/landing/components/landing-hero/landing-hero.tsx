'use client';

import React from 'react';
import Link from 'next/link';
import styles from './landing-hero.module.css';
import { MascotIllustration } from './mascot-illustration';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti } from '@/lib/confetti';

interface LandingHeroProps {
  heroRef?: React.RefObject<HTMLElement | null>;
}

export function LandingHero({ heroRef }: LandingHeroProps) {
  const { playPop, playSuccess } = useAudioStore();

  const handleGetStartedClick = () => {
    playSuccess();
    fireVictoryConfetti();
  };

  return (
    <section className={styles.heroContainer} ref={heroRef as React.RefObject<HTMLDivElement>} aria-label="Introduction">
      {/* Left Column: 3D Phone with Duo mascot */}
      <div className={styles.visualCol}>
        <MascotIllustration />
      </div>

      {/* Right Column: Exact Duolingo Headline & Buttons */}
      <div className={styles.contentCol}>
        <h1 className={styles.headline}>
          The most fun way to learn languages, chess, and more!
        </h1>

        <div className={styles.buttonGroup}>
          <Link
            href="/learn"
            onClick={handleGetStartedClick}
            className={styles.primaryCta}
          >
            GET STARTED
          </Link>

          <Link
            href="/login"
            onClick={playPop}
            className={styles.secondaryCta}
          >
            I ALREADY HAVE AN ACCOUNT
          </Link>
        </div>
      </div>
    </section>
  );
}
