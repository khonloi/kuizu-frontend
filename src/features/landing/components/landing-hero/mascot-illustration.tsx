'use client';

import React from 'react';
import styles from './mascot-illustration.module.css';

export function MascotIllustration() {
  return (
    <div className={styles.mascotWrapper} aria-label="Kuizu teal mobile app showing Kuizu mascot">
      <div className={styles.phonePerspective}>
        {/* 3D Teal Case */}
        <div className={styles.phoneCase}>
          <div className={styles.phoneScreen}>
            {/* Kuizu Mascot Vector Icon inside phone */}
            {/* Kuizu App Icon Widget */}
            <div className={styles.appIconWidget}>
              <svg viewBox="0 0 140 140" width="100%" height="100%" fill="none" role="img" aria-label="Kuizu App Icon">
                {/* Kuizu Teal Squircle Base */}
                <rect width="140" height="140" rx="36" fill="#00cd9c" />
                
                {/* Lighter Teal Eye Surround Contour */}
                <ellipse cx="48" cy="74" rx="30" ry="32" fill="#35eec0" />
                <ellipse cx="92" cy="74" rx="30" ry="32" fill="#35eec0" />

                {/* Big White Eyes */}
                <ellipse cx="48" cy="74" rx="22" ry="24" fill="#ffffff" />
                <ellipse cx="92" cy="74" rx="22" ry="24" fill="#ffffff" />

                {/* Looking Pupils */}
                <circle cx="50" cy="74" r="11" fill="#3c3c3c" />
                <circle cx="90" cy="74" r="11" fill="#3c3c3c" />

                {/* Eye Light Highlights */}
                <circle cx="53" cy="71" r="4.5" fill="#ffffff" />
                <circle cx="93" cy="71" r="4.5" fill="#ffffff" />

                {/* Orange Beak */}
                <path d="M 70 94 L 59 78 L 81 78 Z" fill="#ff9600" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
