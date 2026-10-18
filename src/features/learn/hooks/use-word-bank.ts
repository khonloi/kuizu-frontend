'use client';

import { useState, useCallback } from 'react';
import { useAudioStore } from '@/stores/audio.store';

export interface UseWordBankOptions {
  onSelect: (answer: string) => void;
  disabled?: boolean;
  initialTokens?: string[];
}

export function useWordBank({
  onSelect,
  disabled = false,
  initialTokens = [],
}: UseWordBankOptions) {
  const { playPop } = useAudioStore();
  const [selectedTokens, setSelectedTokens] = useState<string[]>(initialTokens);

  const handleAddToken = useCallback(
    (token: string) => {
      if (disabled || selectedTokens.includes(token)) return;
      playPop();
      const updated = [...selectedTokens, token];
      setSelectedTokens(updated);
      onSelect(updated.join(' '));
    },
    [disabled, selectedTokens, playPop, onSelect]
  );

  const handleRemoveToken = useCallback(
    (token: string) => {
      if (disabled) return;
      playPop();
      const updated = selectedTokens.filter((t) => t !== token);
      setSelectedTokens(updated);
      onSelect(updated.join(' '));
    },
    [disabled, selectedTokens, playPop, onSelect]
  );

  const handleReset = useCallback(() => {
    setSelectedTokens([]);
    onSelect('');
  }, [onSelect]);

  const isTokenPlaced = useCallback(
    (token: string) => selectedTokens.includes(token),
    [selectedTokens]
  );

  return {
    selectedTokens,
    handleAddToken,
    handleRemoveToken,
    handleReset,
    isTokenPlaced,
  };
}
