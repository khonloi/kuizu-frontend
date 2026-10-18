'use client';

import React from 'react';
import Link from 'next/link';
import styles from './auth-legal-notice.module.css';

export interface AuthLegalNoticeStyles {
  readonly legalNoticeContainer?: string;
  readonly disclaimer?: string;
  readonly disclaimerLink?: string;
  readonly recaptcha?: string;
}

export interface AuthLegalNoticeProps {
  action: 'signing in' | 'signing up';
  className?: string;
  styles?: AuthLegalNoticeStyles;
}

export function AuthLegalNotice({
  action,
  className,
  styles: customStyles,
}: AuthLegalNoticeProps) {
  const preposition = action === 'signing in' ? 'to' : 'for';
  const s = customStyles || styles;

  return (
    <footer className={`${s.legalNoticeContainer || ''} ${className || ''}`.trim()}>
      <p className={s.disclaimer}>
        By {action} {preposition} Kuizu, you agree to our{' '}
        <Link href="/terms" className={s.disclaimerLink}>
          Terms
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className={s.disclaimerLink}>
          Privacy Policy
        </Link>
        .
      </p>

      <p className={s.recaptcha}>
        This site is protected by reCAPTCHA Enterprise and the Google{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
          className={s.disclaimerLink}
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noreferrer"
          className={s.disclaimerLink}
        >
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </footer>
  );
}
