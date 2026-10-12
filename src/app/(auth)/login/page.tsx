'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, AlertCircle } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { api } from '@/lib/api';
import type { User } from '@/types/api.types';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const { playSuccess, playError, playPop } = useAudioStore();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername.trim() || !password) {
      setErrorMsg('Please enter both your email/username and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await api.post<{ user: User }>('/api/v1/auth/login', {
        emailOrUsername: emailOrUsername.trim(),
        password,
      });

      if (response.user) {
        setUser(response.user);
      } else {
        // Fetch fresh profile if only tokens are in cookies
        const profile = await api.get<User>('/api/v1/users/me');
        setUser(profile);
      }

      playSuccess();
      router.push('/learn');
    } catch (err) {
      playError();
      setErrorMsg((err as Error).message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding="lg" glow="duo">
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Sign in to resume your learning quests & battles
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.85rem 1rem',
            borderRadius: '12px',
            backgroundColor: 'var(--duo-red-subtle)',
            border: '1px solid rgba(255, 75, 75, 0.4)',
            color: 'var(--duo-red)',
            fontSize: '0.9rem',
            fontWeight: 700,
            marginBottom: '1.25rem',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Input
          id="emailOrUsername"
          label="Email or Username"
          type="text"
          required
          autoComplete="username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="e.g. learner@kuizu.app or kuizu_hero"
        />

        <Input
          id="password"
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <Button
          type="submit"
          variant="duo"
          size="lg"
          fullWidth
          isLoading={isLoading}
          leftIcon={<LogIn size={20} />}
          style={{ marginTop: '0.5rem' }}
        >
          Sign In
        </Button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          onClick={playPop}
          style={{ color: 'var(--duo-green)', fontWeight: 800, textDecoration: 'none' }}
        >
          Sign up for free
        </Link>
      </div>
    </Card>
  );
}
