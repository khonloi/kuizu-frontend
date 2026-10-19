import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShopSkeleton } from '../shop-skeleton';

describe('ShopSkeleton Component', () => {
  it('renders shop header and 3-card grid skeletons', () => {
    render(<ShopSkeleton />);

    const skeletonContainer = screen.getByTestId('shop-skeleton');
    expect(skeletonContainer).toBeInTheDocument();
    expect(skeletonContainer).toHaveAttribute('aria-label', 'Loading shop...');

    const statusElements = screen.getAllByRole('status');
    expect(statusElements.length).toBeGreaterThan(3);
  });
});
