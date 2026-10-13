'use client';

import React from 'react';
import styles from './illustrations.module.css';

export function FreeFunIllustration() {
  return (
    <div className={styles.illusWrapper} aria-label="Kuizu free, fun, effective illustration">
      <svg viewBox="0 0 420 380" className={styles.illusSvg} fill="none" role="img">
        {/* Phone Body with Gold Border */}
        <rect x="130" y="30" width="180" height="260" rx="36" fill="#ffffff" stroke="#f59e0b" strokeWidth="8" />
        
        {/* Top Progress Bar on Phone */}
        <rect x="150" y="52" width="140" height="10" rx="5" fill="#e5e5e5" />
        <rect x="150" y="52" width="60" height="10" rx="5" fill="#00cd9c" />

        {/* 4 Avatar Grid in Phone */}
        {/* Avatar 1: Blue Cat / Bear */}
        <rect x="150" y="80" width="64" height="64" rx="16" fill="#f7f7f7" />
        <circle cx="182" cy="112" r="20" fill="#1cb0f6" />
        <circle cx="176" cy="110" r="3" fill="#ffffff" />
        <circle cx="188" cy="110" r="3" fill="#ffffff" />

        {/* Avatar 2: Kuizu Mascot */}
        <rect x="226" y="80" width="64" height="64" rx="16" fill="#f7f7f7" />
        <circle cx="258" cy="112" r="20" fill="#00cd9c" />
        <circle cx="252" cy="110" r="3" fill="#ffffff" />
        <circle cx="264" cy="110" r="3" fill="#ffffff" />
        <polygon points="258,118 255,114 261,114" fill="#ff9600" />

        {/* Avatar 3: Bea (Orange curly hair) */}
        <rect x="150" y="154" width="64" height="64" rx="16" fill="#f7f7f7" />
        <circle cx="182" cy="186" r="20" fill="#ff9600" />
        <circle cx="178" cy="184" r="3" fill="#3c3c3c" />
        <circle cx="186" cy="184" r="3" fill="#3c3c3c" />

        {/* Avatar 4: Vikram (Moustache & brown hair) */}
        <rect x="226" y="154" width="64" height="64" rx="16" fill="#f7f7f7" />
        <circle cx="258" cy="186" r="20" fill="#a16207" />
        <rect x="252" y="190" width="12" height="4" rx="2" fill="#3c3c3c" />

        {/* Gold #1 Podium Base */}
        <rect x="210" y="270" width="90" height="34" rx="10" fill="#facc15" />
        <text x="255" y="294" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="900" fontFamily="sans-serif">#1</text>

        {/* Red VIP Rope */}
        <path d="M190 280 C230 340, 310 320, 340 270" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />

        {/* Gold Stanchion Pole */}
        <circle cx="340" cy="245" r="12" fill="#facc15" />
        <rect x="336" y="255" width="8" height="65" rx="4" fill="#facc15" />
        <rect x="325" y="315" width="30" height="10" rx="5" fill="#facc15" />

        {/* Oscar Character */}
        {/* Body */}
        <ellipse cx="140" cy="275" rx="24" ry="22" fill="#f472b6" />
        {/* Legs / Trousers */}
        <ellipse cx="132" cy="310" rx="14" ry="12" fill="#00cd9c" />
        <ellipse cx="152" cy="305" rx="14" ry="12" fill="#00cd9c" />
        {/* Shoes */}
        <ellipse cx="126" cy="324" rx="12" ry="5" fill="#1cb0f6" />
        <ellipse cx="158" cy="318" rx="12" ry="5" fill="#1cb0f6" />
        {/* Head */}
        <ellipse cx="145" cy="240" rx="20" ry="22" fill="#d97706" />
        {/* Hair */}
        <path d="M130 226 C135 210, 160 212, 164 228 Z" fill="#1f2937" />
        {/* Eyes */}
        <circle cx="140" cy="238" r="3" fill="#1f2937" />
        <circle cx="152" cy="238" r="3" fill="#1f2937" />
        {/* Big Moustache */}
        <path d="M136 248 C144 242, 154 242, 160 248 C154 254, 142 254, 136 248 Z" fill="#1f2937" />
        {/* Arm holding rope */}
        <path d="M155 268 C175 260, 195 275, 205 265" stroke="#f472b6" strokeWidth="12" strokeLinecap="round" />
      </svg>
    </div>
  );
}
