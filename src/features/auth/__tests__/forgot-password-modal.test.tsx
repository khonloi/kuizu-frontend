import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ForgotPasswordModal } from '../components/forgot-password-modal';

describe('ForgotPasswordModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(<ForgotPasswordModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Reset Password')).toBeNull();
  });

  it('renders modal with email input and submit button when isOpen is true', () => {
    render(<ForgotPasswordModal isOpen={true} onClose={vi.fn()} defaultEmail="test@kuizu.app" />);

    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@kuizu.app')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('displays error if submitted with invalid email', () => {
    render(<ForgotPasswordModal isOpen={true} onClose={vi.fn()} defaultEmail="" />);

    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'invalid-email' } });

    const submitBtn = screen.getByRole('button', { name: /send reset link/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it('shows success message after valid submission', async () => {
    render(<ForgotPasswordModal isOpen={true} onClose={vi.fn()} defaultEmail="hero@kuizu.app" />);

    const submitBtn = screen.getByRole('button', { name: /send reset link/i });
    fireEvent.click(submitBtn);

    await waitFor(
      () => {
        expect(screen.getByText('Email Sent!')).toBeInTheDocument();
        expect(screen.getByText('Check Your Inbox')).toBeInTheDocument();
        expect(screen.getByText(/hero@kuizu.app/i)).toBeInTheDocument();
      },
      { timeout: 1500 },
    );
  });
});
