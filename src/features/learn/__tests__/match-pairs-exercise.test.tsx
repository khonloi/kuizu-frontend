import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MatchPairsExercise } from '../exercises/match-pairs-exercise';
import type { Exercise } from '@/types/api.types';

const mockMatchExercise: Exercise = {
  id: 'ex-match-1',
  type: 'match-pairs',
  prompt: 'Match Japanese greetings with English meanings',
  options: [
    'Konnichiwa : Hello',
    'Arigatou : Thank you',
    'Sayounara : Goodbye',
  ],
  answer: 'all_matched',
};

describe('MatchPairsExercise Component', () => {
  it('renders prompt and all terms and definitions', () => {
    render(
      <MatchPairsExercise
        exercise={mockMatchExercise}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByText('Match Japanese greetings with English meanings')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Konnichiwa' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hello' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Arigatou' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Thank you' })).toBeInTheDocument();
  });

  it('selects term on click and pairs it with matching definition', () => {
    const handleSelect = vi.fn();
    render(
      <MatchPairsExercise
        exercise={mockMatchExercise}
        onSelect={handleSelect}
      />
    );

    // Click Konnichiwa then Hello
    fireEvent.click(screen.getByRole('button', { name: 'Konnichiwa' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hello' }));

    // Both should now be marked as matched (disabled and has matched state)
    expect(screen.getByRole('button', { name: /Konnichiwa/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Hello/i })).toBeDisabled();

    // Not all pairs matched yet, so onSelect not called yet
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('calls onSelect with exercise answer when all pairs are successfully matched', () => {
    const handleSelect = vi.fn();
    render(
      <MatchPairsExercise
        exercise={mockMatchExercise}
        onSelect={handleSelect}
      />
    );

    // Pair 1
    fireEvent.click(screen.getByRole('button', { name: 'Konnichiwa' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hello' }));

    // Pair 2
    fireEvent.click(screen.getByRole('button', { name: 'Arigatou' }));
    fireEvent.click(screen.getByRole('button', { name: 'Thank you' }));

    // Pair 3
    fireEvent.click(screen.getByRole('button', { name: 'Sayounara' }));
    fireEvent.click(screen.getByRole('button', { name: 'Goodbye' }));

    expect(handleSelect).toHaveBeenCalledWith('all_matched');
  });

  it('disables all buttons when disabled prop is true', () => {
    render(
      <MatchPairsExercise
        exercise={mockMatchExercise}
        onSelect={vi.fn()}
        disabled
      />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
