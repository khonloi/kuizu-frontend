"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Flame, Shield, Award } from "lucide-react";
import styles from "./mockups.module.css";
import { useAudioStore } from "@/stores/audio.store";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function StreakMockup() {
  const { playPop } = useAudioStore();
  const [activeDays, setActiveDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const toggleDay = (idx: number) => {
    playPop();
    setActiveDays((prev) =>
      prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx],
    );
  };

  return (
    <div className={styles.mockupCard} aria-label="Streak Engine Preview">
      <div className={styles.streakHeader}>
        <div className={styles.streakFlameIcon}>
          <Flame size={40} color="var(--duo-orange)" fill="var(--duo-orange)" />
        </div>
        <div
          style={{
            fontSize: "1.75rem",
            fontWeight: 900,
            color: "var(--duo-orange)",
          }}
        >
          {activeDays.length} DAYS STREAK
        </div>
        <div
          style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            fontWeight: 700,
          }}
        >
          You are on fire! Complete a quest today to keep it lit.
        </div>
      </div>

      <div className={styles.streakDaysGrid}>
        {DAYS.map((day, idx) => {
          const isActive = activeDays.includes(idx);
          return (
            <button
              key={day}
              type="button"
              className={clsx(styles.dayPill, isActive && styles.dayPillActive)}
              onClick={() => toggleDay(idx)}
              aria-label={`${day} ${isActive ? "Active" : "Inactive"}`}
            >
              <span>{day}</span>
              <Flame
                size={16}
                fill={isActive ? "var(--duo-orange)" : "none"}
                className={styles.miniFlame}
              />
            </button>
          );
        })}
      </div>

      <div className={styles.leagueShield}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Shield size={20} color="var(--duo-purple)" />
          <span>DIAMOND LEAGUE • TOP 3 PROMOTION</span>
        </div>
        <Award size={20} color="var(--duo-purple)" />
      </div>
    </div>
  );
}
