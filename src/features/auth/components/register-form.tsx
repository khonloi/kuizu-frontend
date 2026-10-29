'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Divider } from '@/components/ui';
import { AuthLegalNotice } from './auth-legal-notice';
import { SocialAuthButtons } from './social-auth-buttons';
import { useSocialAuth } from '../hooks/use-social-auth';
import { validateRegistrationForm } from '../utils/auth-validation';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti } from '@/lib/confetti';
import { toast } from '@/stores/toast.store';
import { api } from '@/lib/api';
import type { User } from '@/types/api.types';
import styles from '@/app/(auth)/auth.module.css';

export function RegisterForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const { playSuccess, playError, playPop } = useAudioStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { handleSocialAuth, isLoading: isSocialLoading } = useSocialAuth({
    mode: 'register',
    onSuccess: () => fireVictoryConfetti(),
    onError: (err) => toast.error('Social Registration Failed', err),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateRegistrationForm({
      username,
      email,
      password,
    });

    if (validationError) {
      toast.error('Validation Error', validationError);
      return;
    }

    setIsLoading(true);

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
      toast.error(
        'Registration Failed',
        (err as Error).message ||
          'Registration failed. Please try a different username/email.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormSubmitting = isLoading || isSocialLoading;

  return (
    <div className={styles.authFormWrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Create your profile</h1>
      </header>

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <Input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          aria-label="Username"
          wrapperClassName={styles.inputItem}
          disabled={isFormSubmitting}
        />

        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
          wrapperClassName={styles.inputItem}
          disabled={isFormSubmitting}
        />

        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
          wrapperClassName={styles.inputItem}
          disabled={isFormSubmitting}
        />

        <Button
          type="submit"
          variant="blue"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={isFormSubmitting}
          className={styles.submitBtn}
        >
          Create Account
        </Button>
      </form>

      <Divider label="or" className={styles.divider} />

      <SocialAuthButtons
        mode="register"
        disabled={isFormSubmitting}
        onSocialLogin={handleSocialAuth}
      />

      <AuthLegalNotice action="signing up" styles={styles} />

      <footer className={styles.footer}>
        Already have an account?{' '}
        <Link
          href="/login"
          onClick={playPop}
          className={styles.footerLink}
        >
          Log in
        </Link>
      </footer>
    </div>
  );
}
