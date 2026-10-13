'use client';

import React from 'react';
import styles from './illustrations.module.css';

export function MotivationIllustration() {
  return (
    <div className={styles.illusWrapper} aria-label="Kuizu stay motivated illustration">
      <svg viewBox="0 0 420 380" className={styles.illusSvg} fill="none" role="img">
        {/* Stepping stone phones on ground */}
        {/* Phone 1 */}
        <rect x="80" y="260" width="90" height="60" rx="14" fill="#ffffff" stroke="#00cd9c" strokeWidth="6" transform="rotate(-15 80 260)" />
        <circle cx="120" cy="285" r="14" fill="#ff9600" />
        
        {/* Phone 2 */}
        <rect x="180" y="270" width="110" height="75" rx="16" fill="#ffffff" stroke="#00cd9c" strokeWidth="6" transform="rotate(25 180 270)" />
        <circle cx="210" cy="305" r="16" fill="#cbd5e1" />

        {/* Junior in Red Track Jacket sprinting */}
        {/* Head */}
        <circle cx="230" cy="180" r="24" fill="#fde047" />
        {/* Blonde/Brown Hair */}
        <path d="M210 170 C205 140, 245 140, 250 170 Z" fill="#eab308" />
        <rect x="210" y="172" width="40" height="8" rx="4" fill="#ef4444" />
        {/* Face features */}
        <circle cx="236" cy="180" r="3" fill="#1f2937" />
        <ellipse cx="240" cy="190" rx="4" ry="3" fill="#ef4444" />
        {/* Red track body */}
        <ellipse cx="232" cy="226" rx="28" ry="24" fill="#ef4444" />
        <line x1="232" y1="205" x2="232" y2="245" stroke="#ffffff" strokeWidth="4" />
        {/* Running legs */}
        <path d="M220 245 L205 275 L225 285" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M245 245 L255 260 L240 295" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        {/* Blue sneakers */}
        <ellipse cx="225" cy="290" rx="12" ry="6" fill="#1cb0f6" />
        <ellipse cx="240" cy="300" rx="12" ry="6" fill="#1cb0f6" />

        {/* Cheerleading Kuizu mascot flying above */}
        {/* Mascot Head / Body */}
        <ellipse cx="320" cy="130" rx="34" ry="30" fill="#00cd9c" />
        {/* Left Wing waving up */}
        <path d="M295 130 C280 110, 275 90, 295 85 C310 90, 305 115, 295 130 Z" fill="#00cd9c" />
        {/* Right Wing waving up */}
        <path d="M345 130 C360 110, 365 90, 345 85 C330 90, 335 115, 345 130 Z" fill="#00cd9c" />
        {/* Happy closed squinting eyes */}
        <path d="M305 125 C310 118, 318 118, 322 125" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M326 125 C330 118, 338 118, 342 125" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        {/* Open happy beak */}
        <polygon points="324,130 318,138 330,138" fill="#ff9600" />
      </svg>
    </div>
  );
}
