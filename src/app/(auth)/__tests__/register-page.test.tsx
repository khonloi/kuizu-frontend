import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../register/page';
import { api } from '@/lib/api';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/register',
}));

vi.mock('@/lib/confetti', () => ({
  fireVictoryConfetti: vi.fn(),
}));

describe('RegisterPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Duolingo registration structure', () => {
    render(<RegisterPage />);

    expect(screen.getByRole('heading', { name: /^create your profile$/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^username$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^create account$/i })).toBeInTheDocument();
    expect(screen.getByText(/^or$/i)).toBeInTheDocument();
    expect(screen.getByText(/^google$/i)).toBeInTheDocument();
    expect(screen.getByText(/by signing up for kuizu/i)).toBeInTheDocument();
  });

  it('displays error if username is too short', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText(/^username$/i), { target: { value: 'ab' } });
    fireEvent.click(screen.getByRole('button', { name: /^create account$/i }));

    expect(
      await screen.findByText(/username must be at least 3 characters long/i),
    ).toBeInTheDocument();
  });

  it('submits valid registration and redirects to learn', async () => {
    vi.spyOn(api, 'post').mockResolvedValueOnce({
      user: {
        id: 'u-456',
        username: 'KuizuMaster',
        email: 'master@kuizu.app',
      },
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText(/^username$/i), { target: { value: 'KuizuMaster' } });
    fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'master@kuizu.app' } });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /^create account$/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/learn');
    });
  });
});
