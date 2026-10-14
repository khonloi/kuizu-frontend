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
import styles from '../auth.module.css';

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
    <Card padding="lg">
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          Sign in to resume your learning quests & battles
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className={styles.alert}
        >
          <AlertCircle size={18} className={styles.alertIcon} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
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
          className={styles.submitBtn}
        >
          Sign In
        </Button>
      </form>

      <div className={styles.footer}>
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          onClick={playPop}
          className={styles.footerLink}
        >
          Sign up for free
        </Link>
      </div>
    </Card>
  );
}
