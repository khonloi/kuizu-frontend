import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../checkbox';

describe('Checkbox Primitive', () => {
  it('renders checkbox with label and role', () => {
    render(<Checkbox label="I agree to terms" checked={false} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByText('I agree to terms')).toBeInTheDocument();
  });

  it('toggles checked state when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Subscribe" checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('handles indeterminate mixed state', () => {
    render(<Checkbox label="Select all" indeterminate={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('supports keyboard toggling with Space and Enter', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Remember me" checked={true} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(false);

    fireEvent.keyDown(checkbox, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
