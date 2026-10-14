'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAudioStore } from '@/stores/audio.store';

import styles from './countdown-timer.module.css';

interface CountdownTimerProps {
  timeLimit: number;
  onExpire?: () => void;
  paused?: boolean;
  size?: number;
}

export function CountdownTimer({
  timeLimit,
  onExpire,
  paused = false,
  size = 72,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [prevTimeLimit, setPrevTimeLimit] = useState(timeLimit);
  const playTick = useAudioStore((s) => s.playTick);
  const onExpireRef = useRef(onExpire);

  if (timeLimit !== prevTimeLimit) {
    setPrevTimeLimit(timeLimit);
    setTimeLeft(timeLimit);
  }

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpireRef.current?.();
          return 0;
        }

        const next = prev - 1;
        if (next <= 5) {
          playTick();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paused, playTick]);

  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.max(0, Math.min(1, timeLeft / timeLimit));
  const strokeDashoffset = circumference - progressRatio * circumference;

  let strokeColor = 'var(--duo-blue)';
  if (timeLeft <= 3) {
    strokeColor = 'var(--duo-red)';
  } else if (timeLeft <= 7) {
    strokeColor = 'var(--duo-yellow)';
  }

  const timerVars = {
    '--timer-size': `${size}px`,
    '--timer-font-size': `${size * 0.32}px`,
    '--timer-color': strokeColor,
  } as React.CSSProperties;

  return (
    <div
      role="timer"
      aria-label="Remaining question time"
      aria-live="polite"
      className={styles.timerWrapper}
      style={timerVars}
      title={`${timeLeft} seconds left`}
    >
      <svg
        width={size}
        height={size}
        className={styles.timerSvg}
        aria-hidden="true"
      >
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated countdown ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={styles.timerProgressCircle}
        />
      </svg>

      <span
        className={`${styles.timerNumber} ${timeLeft <= 3 ? 'animate-heart-beat' : ''}`}
      >
        {timeLeft}
      </span>
    </div>
  );
}
