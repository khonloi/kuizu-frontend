'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, AlertCircle } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti } from '@/lib/confetti';
import { api } from '@/lib/api';
import type { User } from '@/types/api.types';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const { playSuccess, playError, playPop } = useAudioStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim().length < 3) {
      setErrorMsg('Username must be at least 3 characters long.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await api.post<{ user: User }>('/api/v1/auth/register', {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      if (response.user) {
        setUser(response.user);
      } else {
        const profile = await api.get<User>('/api/v1/users/me');
        setUser(profile);
      }

      playSuccess();
      fireVictoryConfetti();
      router.push('/learn');
    } catch (err) {
      playError();
      setErrorMsg((err as Error).message || 'Registration failed. Please try a different username/email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding="lg" glow="duo">
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>Create Your Account</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Join thousands of learners mastering skills and clashing in live arenas
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
          id="username"
          label="Username"
          type="text"
          required
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. kuizu_champion"
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="learner@kuizu.app"
        />

        <Input
          id="password"
          label="Password (Min 8 characters)"
          type="password"
          required
          autoComplete="new-password"
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
          leftIcon={<UserPlus size={20} />}
          style={{ marginTop: '0.5rem' }}
        >
          Create Profile
        </Button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <Link
          href="/login"
          onClick={playPop}
          style={{ color: 'var(--duo-green)', fontWeight: 800, textDecoration: 'none' }}
        >
          Sign In
        </Link>
      </div>
    </Card>
  );
}
