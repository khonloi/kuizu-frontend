'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

import { Skeleton } from '@/components/ui';

import styles from './auth-guard.module.css';

export function useRequireAuth(redirectTo = '/login') {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  return { user, isAuthenticated, isLoading };
}

export function AuthGuard({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div
        className={styles.guardLoadingContainer}
        role="status"
        aria-label="Checking authentication..."
        data-testid="auth-guard-loading"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '420px', padding: '2rem' }}>
          <Skeleton variant="rect" width="100%" height="160px" />
          <Skeleton variant="text" width="75%" height="24px" />
          <Skeleton variant="text" width="90%" height="16px" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
