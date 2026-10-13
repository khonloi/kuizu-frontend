'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './programs-section.module.css';
import { useAudioStore } from '@/stores/audio.store';

export function ProgramsSection() {
  const { playPop } = useAudioStore();

  return (
    <section className={styles.programsWrapper} aria-label="Kuizu English Test and Schools">
      <div className={styles.inner}>
        {/* Row 1: Kuizu English Test (Visual Right, Copy Left) */}
        <div className={styles.row}>
          <div className={styles.contentCol}>
            <h2 className={styles.title}>kuizu english test</h2>
            <p className={styles.description}>
              Our convenient, fast, and affordable English test integrates the latest assessment science and AI — empowering anyone to accurately test their English where and when they’re at their best.
            </p>
            <Link href="/learn" onClick={playPop} style={{ textDecoration: 'none' }}>
              <button type="button" className={styles.outlineCta}>
                CERTIFY YOUR ENGLISH
              </button>
            </Link>
          </div>

          <div className={styles.visualCol}>
            <svg viewBox="0 0 360 300" width="100%" height="auto" style={{ maxWidth: '340px' }} fill="none" role="img" aria-label="Kuizu English Test wreath illustration">
              {/* Teal Laurel Wreath */}
              <circle cx="200" cy="150" r="85" fill="#00cd9c" />
              <circle cx="200" cy="150" r="70" fill="#00a87e" />
              <circle cx="200" cy="150" r="55" fill="#ffffff" />
              
              {/* Certificate Ribbon */}
              <polygon points="185,180 200,210 215,180" fill="#ff9600" />
              <polygon points="175,190 190,225 200,205" fill="#e08200" />
              <polygon points="225,190 210,225 200,205" fill="#e08200" />

              {/* Bea holding the certificate */}
              <circle cx="100" cy="200" r="30" fill="#fde047" />
              <path d="M75 180 C65 140, 130 140, 125 180 Z" fill="#1f2937" />
              <rect x="75" y="180" width="50" height="8" rx="4" fill="#ff9600" />
              <circle cx="106" cy="200" r="3.5" fill="#1f2937" />
              {/* Hand */}
              <ellipse cx="140" cy="180" rx="12" ry="10" fill="#fde047" />
            </svg>
          </div>
        </div>

        {/* Row 2: Kuizu for Schools (Visual Left, Copy Right) */}
        <div className={clsx(styles.row, styles.reversed)}>
          <div className={styles.contentCol}>
            <h2 className={styles.title}>kuizu for schools</h2>
            <p className={styles.description}>
              Free teacher tools to help students learn languages through the Kuizu app, both in and out of the classroom.
            </p>
            <Link href="/arena/host" onClick={playPop} style={{ textDecoration: 'none' }}>
              <button type="button" className={styles.outlineCta}>
                BRING KUIZU TO YOUR CLASSROOM
              </button>
            </Link>
          </div>

          <div className={styles.visualCol}>
            <svg viewBox="0 0 360 300" width="100%" height="auto" style={{ maxWidth: '340px' }} fill="none" role="img" aria-label="Kuizu for Schools illustration">
              {/* Classroom Chalkboard */}
              <rect x="40" y="50" width="280" height="180" rx="16" fill="#1e293b" stroke="#a16207" strokeWidth="10" />
              {/* Chalk Math / Words on Board */}
              <text x="75" y="100" fill="#ffffff" fontSize="24" fontWeight="800" fontFamily="sans-serif">Bonjour !</text>
              <text x="75" y="140" fill="#38bdf8" fontSize="20" fontWeight="700" fontFamily="sans-serif">¡Hola mundo!</text>
              <line x1="75" y1="170" x2="250" y2="170" stroke="#fde047" strokeWidth="4" strokeDasharray="8 6" />

              {/* Kuizu Mascot Teacher with Graduation Cap */}
              <ellipse cx="270" cy="220" rx="36" ry="32" fill="#00cd9c" />
              <circle cx="258" cy="216" r="12" fill="#ffffff" />
              <circle cx="282" cy="216" r="12" fill="#ffffff" />
              <polygon points="270,224 265,220 275,220" fill="#ff9600" />
              {/* Cap */}
              <polygon points="270,180 240,195 270,205 300,195" fill="#1e293b" />
              <rect x="260" y="200" width="20" height="8" fill="#1e293b" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
