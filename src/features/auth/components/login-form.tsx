'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Divider } from '@/components/ui';
import { AuthLegalNotice } from './auth-legal-notice';
import { ForgotPasswordModal } from './forgot-password-modal';
import { SocialAuthButtons } from './social-auth-buttons';
import { useSocialAuth } from '../hooks/use-social-auth';
import { validateLoginForm } from '../utils/auth-validation';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { toast } from '@/stores/toast.store';
import { api } from '@/lib/api';
import type { User } from '@/types/api.types';
import styles from '@/app/(auth)/auth.module.css';

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const { playSuccess, playError, playPop } = useAudioStore();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const { handleSocialAuth, isLoading: isSocialLoading } = useSocialAuth({
    mode: 'login',
    onError: (err) => toast.error('Social Login Failed', err),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateLoginForm(emailOrUsername, password);
    if (validationError) {
      toast.error('Validation Error', validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post<{ user: User }>('/api/v1/auth/login', {
        emailOrUsername: emailOrUsername.trim(),
        password,
      });

      if (response.user) {
        setUser(response.user);
      } else {
        const profile = await api.get<User>('/api/v1/users/me');
        setUser(profile);
      }

      playSuccess();
      router.push('/learn');
    } catch (err) {
      playError();
      toast.error('Login Failed', (err as Error).message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenForgot = () => {
    playPop();
    setIsForgotModalOpen(true);
  };

  const isFormSubmitting = isLoading || isSocialLoading;

  return (
    <div className={styles.authFormWrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Log in</h1>
      </header>

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <Input
          id="emailOrUsername"
          name="emailOrUsername"
          type="text"
          required
          autoComplete="username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="Email or username"
          aria-label="Email or username"
          wrapperClassName={styles.inputItem}
          disabled={isFormSubmitting}
        />

        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
          wrapperClassName={styles.inputItem}
          className={styles.passwordInput}
          disabled={isFormSubmitting}
          rightIcon={
            <button
              type="button"
              onClick={handleOpenForgot}
              className={styles.forgotBtn}
            >
              Forgot?
            </button>
          }
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
          Log In
        </Button>
      </form>

      <Divider label="or" className={styles.divider} />

      <SocialAuthButtons
        mode="login"
        disabled={isFormSubmitting}
        onSocialLogin={handleSocialAuth}
      />

      <AuthLegalNotice action="signing in" styles={styles} />

      <footer className={styles.footer}>
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          onClick={playPop}
          className={styles.footerLink}
        >
          Sign up
        </Link>
      </footer>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        defaultEmail={emailOrUsername.includes('@') ? emailOrUsername : ''}
      />
    </div>
  );
}
