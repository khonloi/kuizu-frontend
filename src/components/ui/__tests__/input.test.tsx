import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../input';

describe('Input Primitive', () => {
  it('renders input with label and placeholder', () => {
    render(<Input label="Username" placeholder="Enter username" />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('renders error message with alert role and aria-invalid', () => {
    render(
      <Input
        label="Email"
        error="Please enter a valid email address."
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address.');
  });

  it('renders helper text when no error is present', () => {
    render(
      <Input
        label="Password"
        helperText="Must be at least 8 characters."
      />
    );

    expect(screen.getByText('Must be at least 8 characters.')).toBeInTheDocument();
  });

  it('handles value changes and left/right icon slots', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Search"
        leftIcon={<span data-testid="left-icon">🔍</span>}
        onChange={handleChange}
      />
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();

    const input = screen.getByLabelText('Search');
    fireEvent.change(input, { target: { value: 'Japanese' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
