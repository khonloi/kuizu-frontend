"use client";

import React from "react";
import { Heart, RotateCcw, HeartCrack } from "lucide-react";
import { Button } from "@/components/ui";
import styles from "../../lesson-runner.module.css";

interface LessonOutOfHeartsScreenProps {
  onRestart: () => void;
}

export function LessonOutOfHeartsScreen({
  onRestart,
}: LessonOutOfHeartsScreenProps) {
  return (
    <div className={styles.runnerWrapper}>
      <div className={styles.completionScreen}>
        <div className={`${styles.brokenHeartIcon} animate-shake`}>
          <HeartCrack size={64} color="var(--duo-red)" fill="var(--duo-red)" />
        </div>

        <div>
          <h1 className={styles.outOfHeartsTitle}>Out of Hearts!</h1>
          <p className={styles.outOfHeartsSubtitle}>
            You ran out of quest hearts. Refill them in the shop or restart
            practice to keep learning.
          </p>
        </div>

        <div className={styles.outOfHeartsActions}>
          <Button
            href="/shop"
            variant="duo"
            size="lg"
            fullWidth
            leftIcon={<Heart size={20} fill="var(--text-inverse)" />}
          >
            Refill Hearts in Shop
          </Button>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onRestart}
            leftIcon={<RotateCcw size={18} />}
          >
            Try Lesson Again
          </Button>
        </div>
      </div>
    </div>
  );
}
