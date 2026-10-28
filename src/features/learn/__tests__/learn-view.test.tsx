import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '@/test/test-utils';
import { LearnView } from '../learn-view';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('LearnView Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders active Chinese course overview and curriculum skill tree', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <LearnView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/ACTIVE COURSE • CHINESE FOUNDATIONS/i)).toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { name: /Chinese Foundations \(Mandarin\)/i, level: 1 }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Master Mandarin essentials/i),
    ).toBeInTheDocument();

    // Next lesson recommended since lesson-cn-1 is completed
    expect(
      screen.getByRole('button', { name: /Continue: Self-Introductions & Nationalities/i }),
    ).toBeInTheDocument();

    // Arena join button
    expect(
      screen.getByRole('button', { name: /Join Arena Battle/i }),
    ).toBeInTheDocument();
  });
});
