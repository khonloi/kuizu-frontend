'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './auth-alert.module.css';

export interface AuthAlertProps {
  message: string | null;
}

export function AuthAlert({ message }: AuthAlertProps) {
  if (!message) return null;

  return (
    <div role="alert" className={styles.alert}>
      <AlertCircle size={18} className={styles.alertIcon} />
      <span>{message}</span>
    </div>
  );
}
