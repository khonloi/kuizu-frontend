import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from '../divider';

describe('Divider Layout Primitive', () => {
  it('renders separator with default line', () => {
    render(<Divider />);

    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });

  it('renders label in center when provided', () => {
    render(<Divider label="OR CONTINUE WITH" />);

    expect(screen.getByText('OR CONTINUE WITH')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
