'use client';

import { type KeyboardEvent, useCallback } from 'react';
import { useAudioStore } from '@/stores/audio.store';

export interface UseToggleControlOptions {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function useToggleControl({
  checked = false,
  onChange,
  disabled = false,
}: UseToggleControlOptions) {
  const playPop = useAudioStore((s) => s.playPop);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    playPop();
    onChange?.(!checked);
  }, [disabled, playPop, onChange, checked]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    },
    [disabled, handleToggle]
  );

  return {
    handleToggle,
    handleKeyDown,
  };
}
