import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FillBlankExercise } from '../exercises/fill-blank-exercise';
import type { Exercise } from '@/types/api.types';

const mockExercise: Exercise = {
  id: 'ex-fill-1',
  type: 'fill-blank',
  prompt: 'Watashi ___ Tanaka desu.',
  options: ['wa', 'no', 'ga'],
  answer: 'wa',
  hint: 'Topic marker particle',
};

describe('FillBlankExercise Component', () => {
  it('renders prompt, placeholder slot, and option choices', () => {
    const onSelect = vi.fn();
    render(
      <FillBlankExercise
        exercise={mockExercise}
        selectedAnswer={null}
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('Watashi ___ Tanaka desu.')).toBeInTheDocument();
    expect(screen.getByText('[ Tap an option below ]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'wa' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'no' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ga' })).toBeInTheDocument();
  });

  it('triggers onSelect when an option is clicked and displays selected answer in slot', () => {
    const onSelect = vi.fn();
    const { rerender } = render(
      <FillBlankExercise
        exercise={mockExercise}
        selectedAnswer={null}
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'wa' }));
    expect(onSelect).toHaveBeenCalledWith('wa');

    rerender(
      <FillBlankExercise
        exercise={mockExercise}
        selectedAnswer="wa"
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('[ wa ]')).toBeInTheDocument();
  });

  it('disables option buttons when disabled is true', () => {
    const onSelect = vi.fn();
    render(
      <FillBlankExercise
        exercise={mockExercise}
        selectedAnswer={null}
        onSelect={onSelect}
        disabled={true}
      />
    );

    const optionBtn = screen.getByRole('button', { name: 'wa' });
    expect(optionBtn).toBeDisabled();

    fireEvent.click(optionBtn);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
