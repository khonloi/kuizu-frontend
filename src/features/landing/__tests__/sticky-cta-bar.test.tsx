import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StickyBottomBar } from '../components/sticky-cta-bar/sticky-cta-bar';

vi.mock('@/stores/audio.store', () => ({
  useAudioStore: () => ({
    playSuccess: vi.fn(),
  }),
}));

describe('StickyBottomBar Component', () => {
  it('renders sticky bar content and controls aria-hidden based on isVisible', () => {
    const { rerender } = render(<StickyBottomBar isVisible={false} />);

    const bar = screen.getByRole('complementary', { hidden: true });
    expect(bar).toHaveAttribute('aria-hidden', 'true');

    rerender(<StickyBottomBar isVisible={true} />);
    expect(bar).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByText('Start learning on Kuizu for free')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /GET STARTED/i })).toBeInTheDocument();
  });
});
