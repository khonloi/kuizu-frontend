import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SocialAuthButtons } from '../components/social-auth-buttons';
import { useAudioStore } from '@/stores/audio.store';

describe('SocialAuthButtons Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Google, Facebook, and Apple buttons in login mode', () => {
    render(<SocialAuthButtons mode="login" />);

    expect(screen.getByText('Log in with Google')).toBeInTheDocument();
    expect(screen.getByText('Log in with Facebook')).toBeInTheDocument();
    expect(screen.getByText('Log in with Apple')).toBeInTheDocument();
  });

  it('renders short labels in register mode', () => {
    render(<SocialAuthButtons mode="register" />);

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('triggers onSocialLogin callback with corresponding provider on click', () => {
    const handleSocialLogin = vi.fn();
    const playPopSpy = vi.spyOn(useAudioStore.getState(), 'playPop');

    render(<SocialAuthButtons mode="login" onSocialLogin={handleSocialLogin} />);

    const googleBtn = screen.getByRole('button', { name: /sign in with google/i });
    fireEvent.click(googleBtn);

    expect(handleSocialLogin).toHaveBeenCalledWith('google');
    expect(playPopSpy).toHaveBeenCalled();

    const appleBtn = screen.getByRole('button', { name: /sign in with apple/i });
    fireEvent.click(appleBtn);

    expect(handleSocialLogin).toHaveBeenCalledWith('apple');
  });
});
