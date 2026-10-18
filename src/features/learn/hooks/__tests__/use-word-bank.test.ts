import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWordBank } from '../use-word-bank';
import { useAudioStore } from '@/stores/audio.store';

vi.mock('@/stores/audio.store', () => ({
  useAudioStore: vi.fn(),
}));

describe('useWordBank hook', () => {
  const mockPlayPop = vi.fn();
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAudioStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      playPop: mockPlayPop,
    });
  });

  it('initializes with empty tokens by default', () => {
    const { result } = renderHook(() =>
      useWordBank({ onSelect: mockOnSelect })
    );

    expect(result.current.selectedTokens).toEqual([]);
    expect(result.current.isTokenPlaced('hello')).toBe(false);
  });

  it('adds tokens in sequence and fires onSelect and playPop', () => {
    const { result } = renderHook(() =>
      useWordBank({ onSelect: mockOnSelect })
    );

    act(() => {
      result.current.handleAddToken('Konnichiwa');
    });

    expect(result.current.selectedTokens).toEqual(['Konnichiwa']);
    expect(result.current.isTokenPlaced('Konnichiwa')).toBe(true);
    expect(mockPlayPop).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('Konnichiwa');

    act(() => {
      result.current.handleAddToken('sekai');
    });

    expect(result.current.selectedTokens).toEqual(['Konnichiwa', 'sekai']);
    expect(mockOnSelect).toHaveBeenCalledWith('Konnichiwa sekai');
  });

  it('prevents adding duplicated tokens', () => {
    const { result } = renderHook(() =>
      useWordBank({ onSelect: mockOnSelect })
    );

    act(() => {
      result.current.handleAddToken('Arigato');
    });
    expect(result.current.selectedTokens).toEqual(['Arigato']);

    act(() => {
      result.current.handleAddToken('Arigato');
    });
    // Should still only have one
    expect(result.current.selectedTokens).toEqual(['Arigato']);
    expect(mockPlayPop).toHaveBeenCalledTimes(1);
  });

  it('removes tokens when clicked and updates onSelect', () => {
    const { result } = renderHook(() =>
      useWordBank({
        onSelect: mockOnSelect,
        initialTokens: ['I', 'love', 'Kuizu'],
      })
    );

    expect(result.current.selectedTokens).toEqual(['I', 'love', 'Kuizu']);

    act(() => {
      result.current.handleRemoveToken('love');
    });

    expect(result.current.selectedTokens).toEqual(['I', 'Kuizu']);
    expect(result.current.isTokenPlaced('love')).toBe(false);
    expect(mockOnSelect).toHaveBeenCalledWith('I Kuizu');
  });

  it('does nothing when disabled', () => {
    const { result } = renderHook(() =>
      useWordBank({ onSelect: mockOnSelect, disabled: true })
    );

    act(() => {
      result.current.handleAddToken('Tokyo');
    });

    expect(result.current.selectedTokens).toEqual([]);
    expect(mockPlayPop).not.toHaveBeenCalled();
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('resets all tokens when handleReset is called', () => {
    const { result } = renderHook(() =>
      useWordBank({
        onSelect: mockOnSelect,
        initialTokens: ['Word1', 'Word2'],
      })
    );

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.selectedTokens).toEqual([]);
    expect(mockOnSelect).toHaveBeenCalledWith('');
  });
});
