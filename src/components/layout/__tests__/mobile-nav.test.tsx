import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileNav } from '../mobile-nav';
import { useAudioStore } from '@/stores/audio.store';

// Mock next/navigation for custom pathname testing
vi.mock('next/navigation', () => ({
  usePathname: () => '/learn',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

describe('MobileNav Layout Component', () => {
  it('renders all 5 navigation destination links', () => {
    render(<MobileNav />);

    expect(screen.getByRole('link', { name: /learn/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /leagues/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /arena/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
  });

  it('marks current active route with aria-current="page"', () => {
    render(<MobileNav />);

    const learnLink = screen.getByRole('link', { name: /learn/i });
    expect(learnLink).toHaveAttribute('aria-current', 'page');

    const shopLink = screen.getByRole('link', { name: /shop/i });
    expect(shopLink).not.toHaveAttribute('aria-current');
  });

  it('plays pop sound when link is clicked', () => {
    const playPopSpy = vi.spyOn(useAudioStore.getState(), 'playPop');
    render(<MobileNav />);

    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    expect(playPopSpy).toHaveBeenCalled();
  });
});
