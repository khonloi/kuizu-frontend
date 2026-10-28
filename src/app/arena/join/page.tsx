'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Gamepad2,
  Tv,
  Zap,
  Sparkles,
  Flame,
  Waves,
  Cat,
  Rocket,
  Heart,
  Star,
} from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useArenaSocket } from '@/features/arena/hooks/use-arena-socket';
import { useAudioStore } from '@/stores/audio.store';

import styles from './join.module.css';

const AVATAR_PRESETS = [
  { id: '⚡', label: 'Lightning', icon: Zap, color: 'var(--duo-yellow)' },
  { id: '🌸', label: 'Sparkles', icon: Sparkles, color: '#f472b6' },
  { id: '🔥', label: 'Flame', icon: Flame, color: 'var(--duo-orange)' },
  { id: '🌊', label: 'Waves', icon: Waves, color: '#38bdf8' },
  { id: '🐱', label: 'Cat', icon: Cat, color: '#fb923c' },
  { id: '🚀', label: 'Rocket', icon: Rocket, color: '#a855f7' },
  { id: '❤️', label: 'Heart', icon: Heart, color: 'var(--duo-red)' },
  { id: '⭐', label: 'Star', icon: Star, color: '#eab308' },
];

function ArenaJoinForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { joinGame, isConnected } = useArenaSocket();
  const { playPop, playSuccess, playError } = useAudioStore();

  const queryPin = searchParams?.get('pin') || '';
  const [pin, setPin] = useState(() => queryPin.replace(/\D/g, '').slice(0, 6));
  const [nickname, setNickname] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('⚡');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit room PIN.');
      playError();
      return;
    }

    if (!nickname.trim()) {
      setErrorMessage('Please enter a display nickname.');
      playError();
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    playPop();

    const fullNickname = `${selectedEmoji} ${nickname.trim()}`;
    const result = await joinGame(pin, fullNickname);

    setIsLoading(false);
    if (result.success) {
      playSuccess();
      router.push('/arena/play');
    } else {
      playError();
      setErrorMessage(result.message || 'Room not found or game already in progress.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <Badge variant="red" size="sm" icon={<Gamepad2 size={16} />}>
            LIVE MULTIPLAYER ARENA
          </Badge>
          <h1 className={styles.title}>
            Enter Game PIN
          </h1>
          <p className={styles.subtitle}>
            Look up at the host&apos;s big screen to find the 6-digit PIN code.
          </p>
        </div>

        {/* Join Card */}
        <Card padding="lg" className={styles.joinCard}>
          <form onSubmit={handleJoin} className={styles.form}>
            {/* 6-Digit PIN Field */}
            <div>
              <label htmlFor="game-pin-input" className={styles.label}>
                Game PIN
              </label>
              <input
                id="game-pin-input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setPin(val);
                }}
                placeholder="000 000"
                className={styles.pinInput}
              />
            </div>

            {/* Nickname Field */}
            <div>
              <label htmlFor="nickname-input" className={styles.label}>
                Choose Nickname & Avatar
              </label>

              {/* Avatar icon picker */}
              <div className={styles.emojiGrid}>
                {AVATAR_PRESETS.map((preset) => {
                  const Icon = preset.icon;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-label={`Select avatar ${preset.label}`}
                      onClick={() => {
                        playPop();
                        setSelectedEmoji(preset.id);
                      }}
                      className={`${styles.emojiBtn} ${selectedEmoji === preset.id ? styles.emojiBtnSelected : ''}`}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Icon size={20} color={preset.color} />
                    </button>
                  );
                })}
              </div>

              <input
                id="nickname-input"
                type="text"
                maxLength={20}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Your cool name"
                className={styles.nicknameInput}
              />
            </div>

            {errorMessage && (
              <div className={`${styles.errorMessage} animate-shake`}>
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              variant="kahoot"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={<ArrowRight size={20} />}
            >
              Enter Arena
            </Button>
          </form>

          {/* Offline / connection status footnote */}
          <div
            className={`${styles.statusFooter} ${isConnected ? styles.statusConnected : styles.statusDisconnected}`}
          >
            <ShieldCheck size={16} />
            <span>{isConnected ? 'Connected to live arena gateway' : 'Ready (Offline Demo Mode supported)'}</span>
          </div>
        </Card>

        {/* Switch to Host View */}
        <div className={styles.hostSwitch}>
          <Link href="/arena/host" onClick={playPop}>
            <span className={styles.hostLink}>
              <Tv size={16} color="var(--duo-blue)" />
              Want to host a live game on the projector? Click here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ArenaJoinPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.suspenseLoading}>
          Loading Arena...
        </div>
      }
    >
      <ArenaJoinForm />
    </Suspense>
  );
}
