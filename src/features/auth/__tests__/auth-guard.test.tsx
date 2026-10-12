import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthGuard } from '../auth-guard';
import { useAuthStore } from '@/stores/auth.store';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
  }),
}));

describe('AuthGuard Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('renders loading spinner when auth is checking state', () => {
    useAuthStore.setState({ isLoading: true });

    const { container } = render(
      <AuthGuard>
        <div>Secret Learning Material</div>
      </AuthGuard>
    );

    expect(screen.queryByText('Secret Learning Material')).toBeNull();
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('redirects unauthenticated user to login and renders fallback', () => {
    useAuthStore.setState({
      isLoading: false,
      isAuthenticated: false,
      user: null,
    });

    render(
      <AuthGuard fallback={<div>Please Sign In</div>}>
        <div>Secret Learning Material</div>
      </AuthGuard>
    );

    expect(screen.getByText('Please Sign In')).toBeInTheDocument();
    expect(screen.queryByText('Secret Learning Material')).toBeNull();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('renders protected children when user is authenticated', () => {
    useAuthStore.setState({
      isLoading: false,
      isAuthenticated: true,
      user: {
        id: 'u-1',
        email: 'learner@kuizu.test',
        username: 'HeroLearner',
        role: 'user',
        xp: 100,
        hearts: 5,
        gems: 200,
        streak: { count: 1, lastActiveDate: '2026-10-12' },
        streakFreezes: 0,
        league: 'Bronze',
      },
    });

    render(
      <AuthGuard>
        <div>Secret Learning Material</div>
      </AuthGuard>
    );

    expect(screen.getByText('Secret Learning Material')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
