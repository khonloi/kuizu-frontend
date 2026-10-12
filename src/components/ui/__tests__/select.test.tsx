import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../select';

const options = [
  { value: 'jp', label: 'Japanese' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French', disabled: true },
];

describe('Select Primitive', () => {
  it('renders trigger with placeholder and label', () => {
    render(<Select label="Course Language" options={options} placeholder="Choose language" />);

    expect(screen.getByText('Course Language')).toBeInTheDocument();
    expect(screen.getByText('Choose language')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /choose language/i })).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('opens options menu on click and selects an option', () => {
    const handleChange = vi.fn();
    render(<Select options={options} value="jp" onChange={handleChange} />);

    const trigger = screen.getByRole('button');
    expect(screen.queryByRole('listbox')).toBeNull();

    // Click trigger to open menu
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Select Spanish
    const spanishOpt = screen.getByRole('option', { name: 'Spanish' });
    fireEvent.click(spanishOpt);

    expect(handleChange).toHaveBeenCalledWith('es');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('navigates with keyboard arrow keys and closes on Escape', () => {
    render(<Select options={options} />);

    const trigger = screen.getByRole('button');

    // Arrow down opens menu
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Escape closes menu
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('does not select disabled options', () => {
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button'));

    const disabledOpt = screen.getByRole('option', { name: 'French' });
    expect(disabledOpt).toBeDisabled();

    fireEvent.click(disabledOpt);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
