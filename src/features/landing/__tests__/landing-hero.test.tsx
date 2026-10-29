import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandingHero } from '../components/landing-hero/landing-hero';

const mockPlaySuccess = vi.fn();
const mockPlayPop = vi.fn();
vi.mock('@/stores/audio.store', () => ({
  useAudioStore: () => ({
    playSuccess: mockPlaySuccess,
    playPop: mockPlayPop,
  }),
}));

vi.mock('@/lib/confetti', () => ({
  fireVictoryConfetti: vi.fn(),
}));

describe('LandingHero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exact Duolingo headline and action buttons', () => {
    render(<LandingHero />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /The most fun way to learn languages, chess, and more!/i
    );
    expect(screen.getByRole('link', { name: /GET STARTED/i })).toHaveAttribute('href', '/learn');
    expect(screen.getByRole('link', { name: /I ALREADY HAVE AN ACCOUNT/i })).toHaveAttribute('href', '/login');
  });

  it('triggers audio and confetti when clicking GET STARTED', () => {
    render(<LandingHero />);

    const getStartedBtn = screen.getByRole('link', { name: /GET STARTED/i });
    fireEvent.click(getStartedBtn);

    expect(mockPlaySuccess).toHaveBeenCalledTimes(1);
  });
});
