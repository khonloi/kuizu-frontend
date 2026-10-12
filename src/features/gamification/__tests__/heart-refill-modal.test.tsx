import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { HeartRefillModal } from '../heart-refill-modal';
import { useUiStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { renderWithProviders } from '@/test/test-utils';
import type { User } from '@/types/api.types';

const mockUser: User = {
  id: 'u-1',
  email: 'test@kuizu.test',
  username: 'HeroLearner',
  role: 'user',
  xp: 500,
  streak: { count: 3, lastActiveDate: '2026-10-12' },
  streakFreezes: 0,
  hearts: 3,
  gems: 600,
  league: 'Silver',
};

describe('HeartRefillModal Component', () => {
  beforeEach(() => {
    useUiStore.setState({ isHeartModalOpen: true });
    useAuthStore.setState({ user: { ...mockUser } });
  });

  it('renders modal with user current gems balance', () => {
    renderWithProviders(<HeartRefillModal />);

    expect(screen.getByText('Hearts & Health')).toBeInTheDocument();
    expect(screen.getByText('600')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refill all \(350 gems\)/i })).toBeEnabled();
  });

  it('disables refill button when hearts are already full (5/5)', () => {
    useAuthStore.setState({ user: { ...mockUser, hearts: 5 } });

    renderWithProviders(<HeartRefillModal />);

    const button = screen.getByRole('button', { name: /hearts are full/i });
    expect(button).toBeDisabled();
  });

  it('disables refill button when user has insufficient gems', () => {
    useAuthStore.setState({ user: { ...mockUser, hearts: 2, gems: 100 } });

    renderWithProviders(<HeartRefillModal />);

    const button = screen.getByRole('button', { name: /refill all \(350 gems\)/i });
    expect(button).toBeDisabled();
  });

  it('closes modal when cancel button is clicked', () => {
    renderWithProviders(<HeartRefillModal />);

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(useUiStore.getState().isHeartModalOpen).toBe(false);
  });
});
