import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthHeader } from '../auth-header';

let currentPath = '/login';

vi.mock('next/navigation', () => ({
  usePathname: () => currentPath,
}));

describe('AuthHeader Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders close button linking to home', () => {
    currentPath = '/login';
    render(<AuthHeader />);

    const closeBtn = screen.getByRole('link', { name: /close and return to home/i });
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveAttribute('href', '/');
  });

  it('renders "Sign Up" switch button when on /login', () => {
    currentPath = '/login';
    render(<AuthHeader />);

    const switchBtn = screen.getByRole('button', { name: /sign up/i });
    expect(switchBtn).toBeInTheDocument();
    expect(switchBtn).toHaveAttribute('href', '/register');
  });

  it('renders "Log In" switch button when on /register', () => {
    currentPath = '/register';
    render(<AuthHeader />);

    const switchBtn = screen.getByRole('button', { name: /log in/i });
    expect(switchBtn).toBeInTheDocument();
    expect(switchBtn).toHaveAttribute('href', '/login');
  });
});
