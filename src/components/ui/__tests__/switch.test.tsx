import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../switch';

describe('Switch Primitive', () => {
  it('renders switch with role and aria-checked false by default', () => {
    render(<Switch label="Dark Mode" checked={false} />);

    const switchBtn = screen.getByRole('switch');
    expect(switchBtn).toBeInTheDocument();
    expect(switchBtn).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('triggers onChange with toggled boolean on click', () => {
    const handleChange = vi.fn();
    render(<Switch label="Sound Effects" checked={false} onChange={handleChange} />);

    const switchBtn = screen.getByRole('switch');
    fireEvent.click(switchBtn);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('supports keyboard toggling with Space and Enter', () => {
    const handleChange = vi.fn();
    render(<Switch label="Notifications" checked={true} onChange={handleChange} />);

    const switchBtn = screen.getByRole('switch');
    fireEvent.keyDown(switchBtn, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(false);

    fireEvent.keyDown(switchBtn, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('does not toggle when disabled is true', () => {
    const handleChange = vi.fn();
    render(<Switch label="Locked Feature" disabled={true} onChange={handleChange} />);

    const switchBtn = screen.getByRole('switch');
    expect(switchBtn).toBeDisabled();

    fireEvent.click(switchBtn);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
