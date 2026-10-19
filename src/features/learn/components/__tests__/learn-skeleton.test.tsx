import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LearnSkeleton } from '../learn-skeleton';

describe('LearnSkeleton Component', () => {
  it('renders curriculum path and hero course banner skeletons', () => {
    render(<LearnSkeleton />);

    const skeletonContainer = screen.getByTestId('learn-skeleton');
    expect(skeletonContainer).toBeInTheDocument();

    const statusElements = screen.getAllByRole('status');
    expect(statusElements.length).toBeGreaterThan(5);
  });
});
