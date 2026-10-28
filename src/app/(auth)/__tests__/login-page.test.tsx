import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../login/page';
import { api } from '@/lib/api';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/login',
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Duolingo authentication structure', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /^log in$/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email or username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forgot\?/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^log in$/i })).toBeInTheDocument();
    expect(screen.getByText(/^or$/i)).toBeInTheDocument();
    expect(screen.getByText(/log in with google/i)).toBeInTheDocument();
    expect(screen.getByText(/by signing in to kuizu/i)).toBeInTheDocument();
  });

  it('displays error if submitted with empty fields', async () => {
    render(<LoginPage />);

    const submitBtn = screen.getByRole('button', { name: /^log in$/i });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText(/please enter both your email\/username and password/i),
    ).toBeInTheDocument();
  });

  it('opens ForgotPasswordModal when Forgot? button is clicked', () => {
    render(<LoginPage />);

    const forgotBtn = screen.getByRole('button', { name: /forgot\?/i });
    fireEvent.click(forgotBtn);

    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('submits credentials and navigates on successful login', async () => {
    vi.spyOn(api, 'post').mockResolvedValueOnce({
      user: {
        id: 'u-123',
        username: 'TestHero',
        email: 'hero@kuizu.app',
      },
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email or username/i), {
      target: { value: 'hero@kuizu.app' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /^log in$/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/learn');
    });
  });

  it('does not render Explore Demo Mode button on login page', () => {
    render(<LoginPage />);

    expect(
      screen.queryByRole('button', { name: /Explore Demo Mode/i }),
    ).not.toBeInTheDocument();
  });
});
