import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShopView } from '../shop-view';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock mutations
const mockStreakFreezeMutate = vi.fn();
const mockDoubleWagerMutate = vi.fn();

vi.mock('@/hooks/queries', () => ({
  useStreakFreezeMutation: () => ({
    mutateAsync: mockStreakFreezeMutate,
    isPending: false,
  }),
  useDoubleWagerMutation: () => ({
    mutateAsync: mockDoubleWagerMutate,
    isPending: false,
  }),
}));

describe('ShopView Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    useAuthStore.setState({
      user: {
        id: 'user-1',
        email: 'bao@example.com',
        username: 'BaoNguyen',
        role: 'user',
        gems: 300,
        hearts: 3,
        xp: 1500,
        streak: { count: 5, lastActiveDate: '2026-10-19' },
        streakFreezes: 1,
        league: 'Diamond',
      },
      isAuthenticated: true,
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ShopView />
      </QueryClientProvider>
    );

  it('renders gem balance and shop items', () => {
    renderComponent();

    expect(screen.getByText('Gem Bazaar')).toBeInTheDocument();
    expect(screen.getByTestId('shop-gem-pill')).toHaveTextContent('300 Gems');
    expect(screen.getByText('Full Heart Refill')).toBeInTheDocument();
    expect(screen.getByText('Streak Freeze')).toBeInTheDocument();
    expect(screen.getByText('Double or Nothing')).toBeInTheDocument();
  });

  it('triggers heart refill modal on click', () => {
    const openHeartModalSpy = vi.spyOn(useUiStore.getState(), 'openHeartModal');
    renderComponent();

    const refillBtn = screen.getByRole('button', { name: /Refill \(350 Gems\)/i });
    fireEvent.click(refillBtn);

    expect(openHeartModalSpy).toHaveBeenCalled();
  });

  it('handles buying a streak freeze successfully', async () => {
    mockStreakFreezeMutate.mockResolvedValueOnce({ success: true });
    renderComponent();

    const freezeBtn = screen.getByRole('button', { name: /Equip Freeze \(200 Gems\)/i });
    fireEvent.click(freezeBtn);

    expect(mockStreakFreezeMutate).toHaveBeenCalled();
    await waitFor(() => {
      expect(
        screen.getByText(/Streak Freeze equipped! Your streak is protected/i)
      ).toBeInTheDocument();
    });
  });

  it('handles placing a double or nothing wager', async () => {
    mockDoubleWagerMutate.mockResolvedValueOnce({
      success: true,
      message: 'Double or Nothing wager placed!',
    });
    renderComponent();

    const wagerBtn = screen.getByRole('button', { name: /Wager 50 Gems/i });
    fireEvent.click(wagerBtn);

    expect(mockDoubleWagerMutate).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText(/Double or Nothing wager placed!/i)).toBeInTheDocument();
    });
  });
});
