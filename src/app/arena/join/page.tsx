'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Gamepad2, Tv } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useArenaSocket } from '@/features/arena/hooks/use-arena-socket';
import { useAudioStore } from '@/stores/audio.store';

const EMOJI_AVATARS = ['⚡', '🌸', '🔥', '🌊', '🐱', '🚀', '🦊', '⭐'];

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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'radial-gradient(circle at 50% 30%, rgba(226, 27, 60, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center' }}>
          <Badge variant="red" size="sm" icon={<Gamepad2 size={16} />}>
            LIVE MULTIPLAYER ARENA
          </Badge>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem', letterSpacing: '-0.03em' }}>
            Enter Game PIN
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Look up at the host&apos;s big screen to find the 6-digit PIN code.
          </p>
        </div>

        {/* Join Card */}
        <Card padding="lg" glow="kahoot" style={{ background: 'rgba(23, 32, 54, 0.88)' }}>
          <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* 6-Digit PIN Field */}
            <div>
              <label
                htmlFor="game-pin-input"
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.4rem',
                }}
              >
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
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '2rem',
                  fontWeight: 900,
                  textAlign: 'center',
                  letterSpacing: '0.25em',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontVariantNumeric: 'tabular-nums',
                }}
              />
            </div>

            {/* Nickname Field */}
            <div>
              <label
                htmlFor="nickname-input"
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.4rem',
                }}
              >
                Choose Nickname & Avatar
              </label>

              {/* Emoji quick picker */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                {EMOJI_AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      playPop();
                      setSelectedEmoji(emoji);
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      border: selectedEmoji === emoji ? '2px solid var(--kahoot-red)' : '1px solid var(--border-subtle)',
                      backgroundColor: selectedEmoji === emoji ? 'rgba(226, 27, 60, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <input
                id="nickname-input"
                type="text"
                maxLength={20}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Your cool name"
                style={{
                  width: '100%',
                  padding: '0.85rem 1.1rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '14px',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>

            {errorMessage && (
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(226, 27, 60, 0.15)',
                  border: '1px solid var(--kahoot-red)',
                  color: 'var(--kahoot-red)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
                className="animate-shake"
              >
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
            style={{
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: isConnected ? 'var(--duo-green)' : 'var(--text-muted)',
              fontWeight: 700,
            }}
          >
            <ShieldCheck size={16} />
            <span>{isConnected ? 'Connected to live arena gateway' : 'Ready (Offline Demo Mode supported)'}</span>
          </div>
        </Card>

        {/* Switch to Host View */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/arena/host" onClick={playPop}>
            <span
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
            >
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
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            fontWeight: 800,
          }}
        >
          Loading Arena...
        </div>
      }
    >
      <ArenaJoinForm />
    </Suspense>
  );
}
