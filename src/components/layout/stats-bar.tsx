"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { Flame, Heart, Gem, Zap, Volume2, VolumeX } from "lucide-react";
import styles from "./stats-bar.module.css";
import { useAuthStore } from "@/stores/auth.store";
import { useAudioStore } from "@/stores/audio.store";
import { useUiStore } from "@/stores/ui.store";
import { Avatar } from "@/components/ui";

export function StatsBar() {
  const user = useAuthStore((s) => s.user);
  const { isMuted, toggleMute, playPop } = useAudioStore();
  const openHeartModal = useUiStore((s) => s.openHeartModal);

  // Fallback guest stats
  const streak = user?.streak?.count ?? 0;
  const hearts = user?.hearts ?? 5;
  const gems = user?.gems ?? 100;
  const xp = user?.xp ?? 0;

  const handleHeartClick = () => {
    playPop();
    openHeartModal();
  };

  return (
    <header className={styles.statsBar} aria-label="User Stats Bar">
      <div className={styles.statGroup}>
        {/* Streak counter */}
        <Link
          href="/profile"
          onClick={playPop}
          className={clsx(styles.statBadge, styles.streakFlame)}
          title="Daily Activity Streak"
        >
          <Flame
            size={18}
            className={streak > 0 ? "animate-heart-beat" : undefined}
            color="var(--duo-orange)"
            fill="var(--duo-orange)"
          />
          <span>{streak}</span>
        </Link>

        {/* Hearts counter (interactive refill modal) */}
        <button
          type="button"
          onClick={handleHeartClick}
          className={clsx(styles.statBadge, styles.hearts)}
          title="Hearts Remaining (Click to Refill)"
          aria-label={`Hearts remaining: ${hearts}. Click to refill`}
        >
          <Heart size={18} color="var(--duo-red)" fill="var(--duo-red)" />
          <span>{hearts}</span>
        </button>

        {/* Gems stash */}
        <Link
          href="/shop"
          onClick={playPop}
          className={clsx(styles.statBadge, styles.gems)}
          title="Gems Balance (Click to Visit Shop)"
        >
          <Gem size={18} color="var(--duo-blue)" fill="var(--duo-blue)" />
          <span>{gems}</span>
        </Link>

        {/* Total XP */}
        <div
          className={clsx(styles.statBadge, styles.xp, styles.xpStat)}
          title="Experience Points Earned"
        >
          <Zap size={18} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
          <span>{xp} XP</span>
        </div>
      </div>

      {/* Audio Quick Mute */}
      <button
        type="button"
        onClick={toggleMute}
        className={styles.audioBtn}
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        title={isMuted ? "Unmute SFX" : "Mute SFX"}
      >
        {isMuted ? (
          <VolumeX size={20} color="var(--duo-red)" />
        ) : (
          <Volume2 size={20} color="var(--duo-green)" />
        )}
      </button>

      {/* User Avatar */}
      {user ? (
        <Link href="/profile" onClick={playPop} title="My Profile">
          <Avatar
            name={user.username}
            src={user.avatarUrl}
            size="sm"
            ring="duo"
            showStatus
          />
        </Link>
      ) : (
        <Link href="/login" onClick={playPop} className={styles.loginLink}>
          Sign In
        </Link>
      )}
    </header>
  );
}
