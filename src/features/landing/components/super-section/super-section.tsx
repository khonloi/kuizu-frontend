"use client";

import React from "react";
import Link from "next/link";
import styles from "./super-section.module.css";
import { useAudioStore } from "@/stores/audio.store";

export function SuperSection() {
  const { playPop } = useAudioStore();

  return (
    <section
      className={styles.superWrapper}
      aria-label="Super Kuizu Membership"
    >
      <div className={styles.inner}>
        {/* Left Column: Super Kuizu Graphic */}
        <div className={styles.visualCol}>
          <div className={styles.superDuoVector}>
            <svg
              viewBox="0 0 340 320"
              width="100%"
              height="100%"
              fill="none"
              role="img"
              aria-label="Super Kuizu Mascot"
            >
              {/* Dynamic Gradients */}
              <defs>
                <linearGradient
                  id="capeGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>

              {/* Super Duo Cape */}
              <path
                d="M100 140 C50 170, 30 250, 80 270 C130 250, 110 180, 100 140 Z"
                fill="url(#capeGrad)"
              />
              <path
                d="M240 140 C290 170, 310 250, 260 270 C210 250, 230 180, 240 140 Z"
                fill="url(#capeGrad)"
              />

              {/* Kuizu Mascot Body */}
              <rect
                x="90"
                y="80"
                width="160"
                height="150"
                rx="55"
                fill="#00cd9c"
              />
              <rect
                x="90"
                y="80"
                width="160"
                height="150"
                rx="55"
                stroke="#ffffff"
                strokeWidth="6"
              />

              {/* Neon Visor / Eyes */}
              <circle cx="135" cy="140" r="30" fill="#ffffff" />
              <circle cx="140" cy="140" r="15" fill="#0284c7" />
              <circle cx="145" cy="135" r="5" fill="#ffffff" />

              <circle cx="205" cy="140" r="30" fill="#ffffff" />
              <circle cx="200" cy="140" r="15" fill="#0284c7" />
              <circle cx="195" cy="135" r="5" fill="#ffffff" />

              {/* Determined Beak */}
              <polygon points="170,175 156,155 184,155" fill="#ff9600" />

              {/* Infinite Hearts Badge in hands */}
              <rect
                x="135"
                y="220"
                width="70"
                height="40"
                rx="14"
                fill="#ffffff"
                stroke="#c084fc"
                strokeWidth="4"
              />
              <text
                x="170"
                y="247"
                textAnchor="middle"
                fill="#ef4444"
                fontSize="24"
                fontWeight="900"
              >
                ∞
              </text>
            </svg>
          </div>
        </div>

        {/* Right Column: Copy and CTA */}
        <div className={styles.contentCol}>
          <h2 className={styles.title}>POWER UP WITH SUPER KUIZU</h2>
          <p className={styles.subtitle}>
            Accelerate your language learning with no ads, unlimited hearts, and
            personalized review to target your mistakes.
          </p>
          <Link href="/shop" onClick={playPop} className={styles.ctaButton}>
            TRY 1 WEEK FREE
          </Link>
        </div>
      </div>
    </section>
  );
}
