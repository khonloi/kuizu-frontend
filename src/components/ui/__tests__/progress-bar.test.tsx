import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../progress-bar';

describe('ProgressBar Primitive', () => {
  it('renders with appropriate accessibility attributes', () => {
    render(<ProgressBar value={40} max={100} label="Lesson Progress" />);

    const bar = screen.getByRole('progressbar', { name: /lesson progress/i });
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuenow', '40');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps values correctly between 0 and max', () => {
    render(<ProgressBar value={150} max={100} label="Overfilled" />);

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
  });
});
