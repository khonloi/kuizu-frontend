import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KahootTile } from '../components/kahoot-tile';

describe('KahootTile Component', () => {
  it('renders correct shape symbol for red color (triangle)', () => {
    render(<KahootTile color="red" label="Kamehameha" mode="host" />);

    expect(screen.getByText('▲')).toBeInTheDocument();
    expect(screen.getByText('Kamehameha')).toBeInTheDocument();
  });

  it('renders blue diamond shape symbol', () => {
    render(<KahootTile color="blue" label="Totoro" mode="host" />);

    expect(screen.getByText('◆')).toBeInTheDocument();
    expect(screen.getByText('Totoro')).toBeInTheDocument();
  });

  it('handles player gamepad touch selection', () => {
    const handleClick = vi.fn();
    render(<KahootTile color="green" onClick={handleClick} mode="player" />);

    const tileBtn = screen.getByRole('button', { name: /square: green/i });
    fireEvent.click(tileBtn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents selection when disabled', () => {
    const handleClick = vi.fn();
    render(<KahootTile color="yellow" onClick={handleClick} disabled mode="player" />);

    const tileBtn = screen.getByRole('button');
    expect(tileBtn).toBeDisabled();
    fireEvent.click(tileBtn);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
