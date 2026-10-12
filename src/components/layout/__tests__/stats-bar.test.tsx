import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StatsBar } from '../stats-bar';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import { useAudioStore } from '@/stores/audio.store';

describe('StatsBar Layout Component', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        id: 'u-1',
        email: 'test@kuizu.test',
        username: 'StatsLearner',
        role: 'user',
        xp: 350,
        streak: { count: 12, lastActiveDate: '2026-10-12' },
        streakFreezes: 1,
        hearts: 4,
        gems: 800,
        league: 'Silver',
      },
    });
  });

  it('renders streak, hearts, gems, and XP counts for authenticated user', () => {
    render(<StatsBar />);

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('800')).toBeInTheDocument();
    expect(screen.getByText('350 XP')).toBeInTheDocument();
  });

  it('opens heart refill modal when heart badge is clicked', () => {
    const openHeartModalSpy = vi.spyOn(useUiStore.getState(), 'openHeartModal');
    render(<StatsBar />);

    const heartBtn = screen.getByTitle(/Hearts Remaining/i);
    fireEvent.click(heartBtn);

    expect(openHeartModalSpy).toHaveBeenCalledTimes(1);
  });

  it('toggles audio mute state when SFX button is clicked', () => {
    const toggleMuteSpy = vi.spyOn(useAudioStore.getState(), 'toggleMute');
    render(<StatsBar />);

    const sfxBtn = screen.getByRole('button', { name: /mute sounds/i });
    fireEvent.click(sfxBtn);

    expect(toggleMuteSpy).toHaveBeenCalledTimes(1);
  });

  it('renders sign in link when user is guest/null', () => {
    useAuthStore.setState({ user: null });
    render(<StatsBar />);

    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });
});
