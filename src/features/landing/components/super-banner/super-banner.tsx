'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Target, Zap, Shield, ArrowRight } from 'lucide-react';
import styles from './super-banner.module.css';
import { Button } from '@/components/ui';
import { useAudioStore } from '@/stores/audio.store';

export function SuperBanner() {
  const { playPop } = useAudioStore();

  return (
    <section className={styles.bannerWrapper} aria-label="Super Kuizu Subscription Plan">
      <div className={styles.card}>
        {/* Left Column: Perks and Description */}
        <div className={styles.leftCol}>
          <div className={styles.superBadge}>
            <Sparkles size={16} />
            <span>Super Kuizu Experience</span>
          </div>

          <h2 className={styles.title}>
            Supercharge your learning with{' '}
            <span className={styles.titleGradient}>Super Kuizu</span>
          </h2>

          <p className={styles.description}>
            Remove mistake cooldowns, review tricky exercises in the Practice Hub, and unlock unlimited hearts for non-stop learning.
          </p>

          <div className={styles.perksGrid}>
            <div className={styles.perkItem}>
              <div className={styles.perkIcon}>
                <Heart size={20} color="var(--duo-red)" fill="var(--duo-red)" />
              </div>
              <div>
                <div className={styles.perkTitle}>Unlimited Hearts</div>
                <div className={styles.perkSubtitle}>Keep learning at your own pace without cooldown delays</div>
              </div>
            </div>

            <div className={styles.perkItem}>
              <div className={styles.perkIcon}>
                <Target size={20} color="var(--duo-blue)" />
              </div>
              <div>
                <div className={styles.perkTitle}>Personalized Practice Hub</div>
                <div className={styles.perkSubtitle}>Target your mistakes with tailored AI review sessions</div>
              </div>
            </div>

            <div className={styles.perkItem}>
              <div className={styles.perkIcon}>
                <Zap size={20} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
              </div>
              <div>
                <div className={styles.perkTitle}>Zero Battle Cooldowns</div>
                <div className={styles.perkSubtitle}>Jump straight into consecutive multiplayer arena rounds</div>
              </div>
            </div>

            <div className={styles.perkItem}>
              <div className={styles.perkIcon}>
                <Shield size={20} color="var(--duo-purple)" />
              </div>
              <div>
                <div className={styles.perkTitle}>Monthly Streak Shield</div>
                <div className={styles.perkSubtitle}>Automatic protection for your streak if you miss a day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: CTA Box */}
        <div className={styles.rightCol}>
          <div className={styles.trialHeading}>Power Up Today</div>
          <div className={styles.trialSub}>Available in the Kuizu Shop with earned Gems or Premium</div>
          <Link href="/shop" onClick={playPop} style={{ width: '100%' }}>
            <Button
              variant="duo"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight size={18} />}
            >
              VISIT KUIZU SHOP
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
