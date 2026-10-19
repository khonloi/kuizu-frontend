'use client';

import React, { useRef } from 'react';
import styles from './page.module.css';
import {
  LandingNavbar,
  LandingHero,
  SubjectRibbon,
  FeatureSection,
  FreeFunIllustration,
  ScienceIllustration,
  MotivationIllustration,
  PersonalizedIllustration,
  AnytimeSection,
  SuperSection,
  ProgramsSection,
  BottomCtaSection,
  LandingFooter,
  useScrollPast,
} from '@/features/landing';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isPastHero = useScrollPast({ thresholdRef: heroRef, offset: 350 });

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Header with sticky conversion button when scrolled */}
      <LandingNavbar isScrolledPastHero={isPastHero} />

      <main id="main-content" className={styles.mainContent}>
        {/* 2. Hero & Subject Ribbon Viewport Section */}
        <div className={styles.heroViewportSection}>
          <LandingHero heroRef={heroRef} />
          <SubjectRibbon />
        </div>

        {/* 4. Alternating Feature Sections */}
        {/* Section 1: free. fun. effective. */}
        <FeatureSection
          id="free-fun-effective"
          title="free. fun. effective."
          description={
            <p>
              Learning with Kuizu is fun, and{' '}
              <a href="#research" className={styles.researchLink}>
                research shows that it works
              </a>
              ! With quick, bite-sized lessons, you’ll earn points and unlock new levels while gaining real-world communication skills.
            </p>
          }
          visual={<FreeFunIllustration />}
        />

        {/* Section 2: backed by science (Reversed) */}
        <FeatureSection
          id="backed-by-science"
          title="backed by science"
          description={
            <p>
              We use a combination of research-backed teaching methods and delightful content to create courses that effectively teach reading, writing, listening, and speaking skills!
            </p>
          }
          visual={<ScienceIllustration />}
          reversed
        />

        {/* Section 3: stay motivated */}
        <FeatureSection
          id="stay-motivated"
          title="stay motivated"
          description={
            <p>
              We make it easy to form a habit of language learning with game-like features, fun challenges, and reminders from our friendly mascot, Kuizu the owl.
            </p>
          }
          visual={<MotivationIllustration />}
        />

        {/* Section 4: personalized learning (Reversed) */}
        <FeatureSection
          id="personalized-learning"
          title="personalized learning"
          description={
            <p>
              Combining the best of AI and language science, lessons are tailored to help you learn at just the right level and pace.
            </p>
          }
          visual={<PersonalizedIllustration />}
          reversed
        />

        {/* 5. learn anytime, anywhere */}
        <AnytimeSection />

        {/* 6. Power up with Super Kuizu */}
        <SuperSection />

        {/* 7. Kuizu English Test & Kuizu for Schools */}
        <ProgramsSection />

        {/* 8. learn a language with kuizu */}
        <BottomCtaSection />
      </main>

      {/* 9. Iconic Kuizu Teal Footer */}
      <LandingFooter />
    </div>
  );
}
