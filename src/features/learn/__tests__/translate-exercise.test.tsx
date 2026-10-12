import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TranslateExercise } from '../exercises/translate-exercise';
import type { Exercise } from '@/types/api.types';

const mockExercise: Exercise = {
  id: 'ex-trans-1',
  type: 'translate',
  prompt: 'Good morning',
  options: ['Ohayou', 'gozaimasu', 'Konnichiwa'],
  answer: 'Ohayou gozaimasu',
  hint: 'Used before 10 AM',
};

describe('TranslateExercise Component', () => {
  it('renders prompt text, hint, speaker button, and available word options', () => {
    const onSelect = vi.fn();
    render(<TranslateExercise exercise={mockExercise} onSelect={onSelect} />);

    expect(screen.getByText('Good morning')).toBeInTheDocument();
    expect(screen.getByText(/Used before 10 AM/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /listen to prompt/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ohayou' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'gozaimasu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Konnichiwa' })).toBeInTheDocument();
  });

  it('assembles sentence when words are selected and calls onSelect', () => {
    const onSelect = vi.fn();
    render(<TranslateExercise exercise={mockExercise} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ohayou' }));
    expect(onSelect).toHaveBeenLastCalledWith('Ohayou');

    fireEvent.click(screen.getByRole('button', { name: 'gozaimasu' }));
    expect(onSelect).toHaveBeenLastCalledWith('Ohayou gozaimasu');
  });

  it('removes placed word when clicked in assembly line', () => {
    const onSelect = vi.fn();
    render(<TranslateExercise exercise={mockExercise} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ohayou' }));
    fireEvent.click(screen.getByRole('button', { name: 'gozaimasu' }));

    const placedOhayou = screen.getAllByRole('button', { name: 'Ohayou' })[0];
    fireEvent.click(placedOhayou);

    expect(onSelect).toHaveBeenLastCalledWith('gozaimasu');
  });

  it('prevents interactions when disabled is true', () => {
    const onSelect = vi.fn();
    render(<TranslateExercise exercise={mockExercise} onSelect={onSelect} disabled={true} />);

    const chip = screen.getByRole('button', { name: 'Ohayou' });
    expect(chip).toBeDisabled();

    fireEvent.click(chip);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
