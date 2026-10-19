import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileView } from '../profile-view';
import { useAuthStore } from '@/stores/auth.store';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('ProfileView Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders guest card when user is not authenticated', () => {
    useAuthStore.setState({ user: null, isAuthenticated: false });

    render(<ProfileView />);

    expect(screen.getByTestId('profile-guest-card')).toBeInTheDocument();
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Profile/i })).toBeInTheDocument();
  });

  it('renders user details and statistics when authenticated', () => {
    useAuthStore.setState({
      user: {
        id: 'user-42',
        username: 'BaoMaster',
        email: 'bao@example.com',
        role: 'user',
        gems: 850,
        hearts: 4,
        xp: 4200,
        streak: { count: 12, lastActiveDate: '2026-10-19' },
        streakFreezes: 1,
        league: 'Diamond',
      },
      isAuthenticated: true,
    });

    render(<ProfileView />);

    expect(screen.getByTestId('profile-header-card')).toBeInTheDocument();
    expect(screen.getByText('BaoMaster')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.getByText('bao@example.com')).toBeInTheDocument();

    expect(screen.getByTestId('profile-stats-section')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('4200')).toBeInTheDocument();
    expect(screen.getByText('Diamond')).toBeInTheDocument();
    expect(screen.getByText('4 / 5')).toBeInTheDocument();
    expect(screen.getByText('850')).toBeInTheDocument();
  });

  it('handles sign out action and redirects to login', async () => {
    const logoutSpy = vi.fn().mockResolvedValue(undefined);
    useAuthStore.setState({
      user: {
        id: 'user-42',
        email: 'bao@example.com',
        username: 'BaoMaster',
        role: 'user',
        gems: 100,
        hearts: 5,
        xp: 200,
        streak: { count: 1, lastActiveDate: null },
        streakFreezes: 0,
        league: 'Bronze',
      },
      isAuthenticated: true,
      logout: logoutSpy,
    });

    render(<ProfileView />);

    const signOutBtn = screen.getByRole('button', { name: /Sign Out/i });
    fireEvent.click(signOutBtn);

    expect(logoutSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
});
