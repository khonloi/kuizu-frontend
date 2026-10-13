'use client';

import React from 'react';
import styles from './illustrations.module.css';

export function ScienceIllustration() {
  return (
    <div className={styles.illusWrapper} aria-label="Kuizu science-backed learning illustration">
      <svg viewBox="0 0 420 380" className={styles.illusSvg} fill="none" role="img">
        {/* Tablet / Screen Base with Pink Frame */}
        <path d="M70 230 L280 180 L350 250 L140 300 Z" fill="#fbcfe8" stroke="#f472b6" strokeWidth="6" />
        <path d="M85 230 L275 185 L335 245 L145 290 Z" fill="#ffffff" />

        {/* Teal Progress Line on Tablet */}
        <path d="M100 240 L160 225" stroke="#00cd9c" strokeWidth="16" strokeLinecap="round" />

        {/* Sound Wave Bars on Tablet */}
        <line x1="200" y1="210" x2="200" y2="230" stroke="#1cb0f6" strokeWidth="8" strokeLinecap="round" />
        <line x1="216" y1="200" x2="216" y2="240" stroke="#1cb0f6" strokeWidth="8" strokeLinecap="round" />
        <line x1="232" y1="195" x2="232" y2="245" stroke="#1cb0f6" strokeWidth="8" strokeLinecap="round" />
        <line x1="248" y1="205" x2="248" y2="235" stroke="#1cb0f6" strokeWidth="8" strokeLinecap="round" />
        <line x1="264" y1="215" x2="264" y2="225" stroke="#1cb0f6" strokeWidth="8" strokeLinecap="round" />

        {/* 3D Microscope */}
        <path d="M260 80 L330 140 L310 160 L240 100 Z" fill="#60a5fa" />
        <circle cx="340" cy="150" r="28" fill="#1d4ed8" />
        <ellipse cx="280" cy="90" rx="20" ry="14" fill="#93c5fd" />
        {/* Microscope Eyepiece */}
        <path d="M220 50 L270 90" stroke="#3b82f6" strokeWidth="18" strokeLinecap="round" />

        {/* Lily Character (Purple Hair) */}
        {/* Body */}
        <ellipse cx="140" cy="140" rx="22" ry="26" fill="#4c1d95" />
        {/* Arms holding flask */}
        <path d="M125 145 C110 150, 95 135, 105 120" stroke="#4c1d95" strokeWidth="10" strokeLinecap="round" />
        {/* Chemical Flask */}
        <polygon points="98,110 114,110 120,126 92,126" fill="#86efac" stroke="#22c55e" strokeWidth="3" />
        <rect x="103" y="102" width="6" height="8" fill="#a7f3d0" />
        {/* Head */}
        <circle cx="150" cy="95" r="20" fill="#fde047" />
        {/* Purple Bob Hair */}
        <path d="M130 90 C130 65, 175 65, 175 90 C175 110, 168 118, 168 118 L130 118 Z" fill="#9333ea" />
        {/* Lily Neutral Eyes */}
        <line x1="144" y1="96" x2="152" y2="96" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
        <line x1="158" y1="96" x2="166" y2="96" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
