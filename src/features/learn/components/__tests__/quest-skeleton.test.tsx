import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuestSkeleton } from '../quest-skeleton';

describe('QuestSkeleton Component', () => {
  it('renders quest runner skeleton with top bar, stage area, and action bar', () => {
    render(<QuestSkeleton />);

    const skeletonContainer = screen.getByTestId('quest-skeleton');
    expect(skeletonContainer).toBeInTheDocument();
    expect(skeletonContainer).toHaveAttribute('aria-label', 'Loading quest...');

    const statusElements = screen.getAllByRole('status');
    expect(statusElements.length).toBeGreaterThan(5);
  });
});

