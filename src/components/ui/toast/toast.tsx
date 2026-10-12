'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Sparkles,
  X,
} from 'lucide-react';
import styles from './toast.module.css';
import { useToastStore, type ToastItem } from '@/stores/toast.store';
import { useAudioStore } from '@/stores/audio.store';

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const { playPop } = useAudioStore();

  useEffect(() => {
    const duration = toast.duration ?? 4500;
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const handleClose = () => {
    playPop();
    onDismiss(toast.id);
  };

  const IconComponent = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    duo: Sparkles,
  }[toast.variant || 'info'];

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(styles.toast, styles[toast.variant || 'info'])}
    >
      <div className={styles.iconSlot}>
        <IconComponent size={20} />
      </div>

      <div className={styles.body}>
        <span className={styles.title}>{toast.title}</span>
        {toast.description && (
          <span className={styles.description}>{toast.description}</span>
        )}
      </div>

      <button
        type="button"
        onClick={handleClose}
        className={styles.closeBtn}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer} aria-label="Notifications">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={removeToast} />
      ))}
    </div>
  );
}
