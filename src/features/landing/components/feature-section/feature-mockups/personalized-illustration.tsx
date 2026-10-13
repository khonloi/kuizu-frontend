'use client';

import React from 'react';
import styles from './illustrations.module.css';

export function PersonalizedIllustration() {
  return (
    <div className={styles.illusWrapper} aria-label="Kuizu personalized learning illustration">
      <svg viewBox="0 0 420 380" className={styles.illusSvg} fill="none" role="img">
        {/* Track 1 (Orange Phone with Lin on Scooter) */}
        <path d="M60 260 L180 140 L240 200 L120 320 Z" fill="#ffffff" stroke="#f59e0b" strokeWidth="8" />
        
        {/* Scooter Wheel & Body */}
        <ellipse cx="140" cy="235" rx="18" ry="12" fill="#3c3c3c" />
        <ellipse cx="140" cy="235" rx="10" ry="6" fill="#cbd5e1" />
        <rect x="135" y="180" width="12" height="40" rx="6" fill="#ef4444" />
        <circle cx="141" cy="180" r="12" fill="#ef4444" />
        <circle cx="141" cy="180" r="6" fill="#ffffff" />

        {/* Lin (Grandmother with grey bun) */}
        <circle cx="150" cy="140" r="22" fill="#fde047" />
        <circle cx="150" cy="115" r="12" fill="#4b4b4b" />
        <path d="M135 130 C135 120, 165 120, 165 130 Z" fill="#4b4b4b" />
        {/* Focused eyes */}
        <line x1="145" y1="140" x2="152" y2="138" stroke="#1f2937" strokeWidth="3" />
        <line x1="156" y1="138" x2="162" y2="140" stroke="#1f2937" strokeWidth="3" />
        {/* Brown Coat */}
        <ellipse cx="155" cy="175" rx="26" ry="20" fill="#a16207" />

        {/* Track 2 (Navy Blue Phone with Vikram walking) */}
        <path d="M190 280 L290 180 L350 230 L250 330 Z" fill="#ffffff" stroke="#1d4ed8" strokeWidth="8" />

        {/* Vikram (Turbanned Jogger holding a flower) */}
        {/* Flowers on path */}
        <circle cx="215" cy="260" r="6" fill="#f43f5e" />
        <circle cx="228" cy="295" r="6" fill="#f43f5e" />
        {/* Legs walking */}
        <path d="M260 255 L255 285" stroke="#1cb0f6" strokeWidth="10" strokeLinecap="round" />
        <path d="M275 255 L285 280" stroke="#1cb0f6" strokeWidth="10" strokeLinecap="round" />
        {/* Pink/Magenta Kurta Body */}
        <ellipse cx="268" cy="230" rx="24" ry="22" fill="#db2777" />
        {/* Head & Blue Turban */}
        <circle cx="268" cy="185" r="20" fill="#d97706" />
        <circle cx="268" cy="170" r="18" fill="#0284c7" />
        {/* Beard & Moustache */}
        <ellipse cx="268" cy="195" rx="16" ry="10" fill="#1f2937" />
        <circle cx="264" cy="185" r="2.5" fill="#ffffff" />
        <circle cx="272" cy="185" r="2.5" fill="#ffffff" />
      </svg>
    </div>
  );
}
