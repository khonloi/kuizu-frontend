import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LeaderboardView } from '../leaderboard-view';
import { useAuthStore } from '@/stores/auth.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { LeaderboardEntry } from '@/types/gamification.types';

const mockEntries: LeaderboardEntry[] = [
  {
    userId: 'u1',
    username: 'Hikaru',
    rank: 1,
    xp: 2400,
    league: 'Diamond',
    streakCount: 20,
    avatarUrl: '/avatars/1.png',
  },
  {
    userId: 'u2',
    username: 'BaoNguyen',
    rank: 2,
    xp: 1850,
    league: 'Diamond',
    streakCount: 14,
    avatarUrl: '/avatars/2.png',
    isCurrentUser: true,
  },
  {
    userId: 'u3',
    username: 'Alex',
    rank: 3,
    xp: 1600,
    league: 'Diamond',
    streakCount: 9,
    avatarUrl: '/avatars/3.png',
  },
  {
    userId: 'u4',
    username: 'Chloe',
    rank: 4,
    xp: 1200,
    league: 'Diamond',
    streakCount: 4,
    avatarUrl: '/avatars/4.png',
  },
];

let mockIsLoading = false;
let mockData: LeaderboardEntry[] = mockEntries;

vi.mock('@/hooks/queries', () => ({
  useLeaderboardQuery: () => ({
    data: mockData,
    isLoading: mockIsLoading,
  }),
}));

describe('LeaderboardView Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsLoading = false;
    mockData = mockEntries;

    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    useAuthStore.setState({
      user: {
        id: 'u2',
        email: 'bao@example.com',
        username: 'BaoNguyen',
        role: 'user',
        gems: 300,
        hearts: 5,
        xp: 1850,
        streak: { count: 14, lastActiveDate: '2026-10-19' },
        streakFreezes: 0,
        league: 'Diamond',
      },
      isAuthenticated: true,
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <LeaderboardView />
      </QueryClientProvider>
    );

  it('renders league banner with active user league', () => {
    renderComponent();

    expect(screen.getByText('Diamond League')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE TOURNAMENT')).toBeInTheDocument();
    expect(screen.getByText(/Top 3 advance to the Champion division/i)).toBeInTheDocument();
  });

  it('renders leaderboard table with entries and medals for top 3', () => {
    renderComponent();

    expect(screen.getByText('Hikaru')).toBeInTheDocument();
    expect(screen.getByTestId('rank-medal-1')).toBeInTheDocument();
    expect(screen.getByTestId('rank-medal-2')).toBeInTheDocument();
    expect(screen.getByTestId('rank-medal-3')).toBeInTheDocument();
    expect(screen.getByText('#4')).toBeInTheDocument();
    expect(screen.getByText('(You)')).toBeInTheDocument();
  });

  it('renders loading notice when loading and entries are empty', () => {
    mockIsLoading = true;
    mockData = [];

    renderComponent();

    expect(screen.getByTestId('leaderboard-loading')).toHaveTextContent(
      'Loading league rankings...'
    );
  });
});
