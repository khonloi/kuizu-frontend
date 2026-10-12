import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListenExercise } from '../exercises/listen-exercise';
import type { Exercise } from '@/types/api.types';

const mockExercise: Exercise = {
  id: 'ex-listen-1',
  type: 'listen',
  prompt: 'Arigatou gozaimasu',
  options: ['Arigatou', 'gozaimasu', 'Konnichiwa'],
  answer: 'Arigatou gozaimasu',
};

describe('ListenExercise Component', () => {
  it('renders normal and slow speed audio buttons and word bank tokens', () => {
    const onSelect = vi.fn();
    render(<ListenExercise exercise={mockExercise} onSelect={onSelect} />);

    expect(screen.getByRole('button', { name: /play audio at normal speed/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play audio at slow speed/i })).toBeInTheDocument();
    expect(screen.getByText('Arigatou')).toBeInTheDocument();
    expect(screen.getByText('gozaimasu')).toBeInTheDocument();
    expect(screen.getByText('Konnichiwa')).toBeInTheDocument();
  });

  it('adds tokens to assembly slot and notifies onSelect with joined string', () => {
    const onSelect = vi.fn();
    render(<ListenExercise exercise={mockExercise} onSelect={onSelect} />);

    // Click Arigatou
    fireEvent.click(screen.getByRole('button', { name: 'Arigatou' }));
    expect(onSelect).toHaveBeenLastCalledWith('Arigatou');

    // Click gozaimasu
    fireEvent.click(screen.getByRole('button', { name: 'gozaimasu' }));
    expect(onSelect).toHaveBeenLastCalledWith('Arigatou gozaimasu');
  });

  it('removes token from assembly slot when clicked', () => {
    const onSelect = vi.fn();
    render(<ListenExercise exercise={mockExercise} onSelect={onSelect} />);

    // Add two words
    fireEvent.click(screen.getByRole('button', { name: 'Arigatou' }));
    fireEvent.click(screen.getByRole('button', { name: 'gozaimasu' }));

    // Click first placed chip in assembly area to remove it
    const placedChips = screen.getAllByRole('button', { name: 'Arigatou' });
    fireEvent.click(placedChips[0]);

    expect(onSelect).toHaveBeenLastCalledWith('gozaimasu');
  });

  it('disables all buttons when disabled is true', () => {
    const onSelect = vi.fn();
    render(<ListenExercise exercise={mockExercise} onSelect={onSelect} disabled={true} />);

    const arigatouBtn = screen.getByRole('button', { name: 'Arigatou' });
    expect(arigatouBtn).toBeDisabled();

    fireEvent.click(arigatouBtn);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
