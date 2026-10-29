import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandingNavbar } from '../components/landing-navbar/landing-navbar';

vi.mock('@/stores/audio.store', () => {
  const playPop = vi.fn();
  const playSuccess = vi.fn();
  return {
    useAudioStore: () => ({
      playPop,
      playSuccess,
    }),
  };
});

describe('LandingNavbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Kuizu brand logo and site language selector at top', () => {
    render(<LandingNavbar isScrolledPastHero={false} />);

    expect(screen.getByText('kuizu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Site language: English/i })).toBeInTheDocument();
  });

  it('renders sticky "GET STARTED" button when scrolled past hero', () => {
    render(<LandingNavbar isScrolledPastHero={true} />);

    expect(screen.getByText('kuizu')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GET STARTED/i })).toHaveAttribute('href', '/learn');
  });

  it('opens language dropdown on click and allows selecting a language', () => {
    render(<LandingNavbar isScrolledPastHero={false} />);

    const langButton = screen.getByRole('button', { name: /Site language: English/i });
    fireEvent.click(langButton);

    const spanishOption = screen.getByText('Español');
    expect(spanishOption).toBeInTheDocument();

    fireEvent.click(spanishOption);

    // After selection, language label updates
    expect(screen.getByText(/SITE LANGUAGE: ESPAÑOL/i)).toBeInTheDocument();
  });
});
