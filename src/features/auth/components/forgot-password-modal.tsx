'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Modal, Button, Input } from '@/components/ui';
import { useAudioStore } from '@/stores/audio.store';
import styles from './forgot-password-modal.module.css';

export interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
  defaultEmail = '',
}: ForgotPasswordModalProps) {
  const { playSuccess, playPop } = useAudioStore();
  const [email, setEmail] = useState(defaultEmail);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate sending password reset instructions
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      playSuccess();
    }, 600);
  };

  const handleClose = () => {
    playPop();
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSubmitted ? 'Email Sent!' : 'Reset Password'}
    >
      {isSubmitted ? (
        <div className={styles.successWrapper}>
          <div className={styles.iconCircle}>
            <CheckCircle2 size={36} className={styles.checkIcon} />
          </div>
          <h3 className={styles.successTitle}>Check Your Inbox</h3>
          <p className={styles.successText}>
            We have sent a password reset link to{' '}
            <strong className={styles.highlight}>{email}</strong>. Follow the link in
            the email to choose a new password.
          </p>
          <Button
            variant="blue"
            size="lg"
            fullWidth
            onClick={handleClose}
            className={styles.doneBtn}
          >
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <p className={styles.introText}>
            Enter your email address and we will send you instructions to reset your
            password.
          </p>

          <Input
            id="forgot-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter your email"
            error={error || undefined}
            leftIcon={<Mail size={18} />}
          />

          <Button
            type="submit"
            variant="blue"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className={styles.submitBtn}
          >
            Send Reset Link
          </Button>
        </form>
      )}
    </Modal>
  );
}
