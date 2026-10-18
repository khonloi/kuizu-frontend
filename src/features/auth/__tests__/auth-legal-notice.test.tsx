import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthLegalNotice } from '../components/auth-legal-notice';

describe('AuthLegalNotice Component', () => {
  it('renders signing in disclaimer for login mode', () => {
    render(<AuthLegalNotice action="signing in" />);

    expect(screen.getByText(/by signing in to kuizu/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^terms$/i })).toHaveAttribute('href', '/terms');

    const privacyLinks = screen.getAllByRole('link', { name: /^privacy policy$/i });
    expect(privacyLinks).toHaveLength(2);
    expect(privacyLinks[0]).toHaveAttribute('href', '/privacy');
    expect(privacyLinks[1]).toHaveAttribute('href', 'https://policies.google.com/privacy');
  });

  it('renders signing up disclaimer for register mode', () => {
    render(<AuthLegalNotice action="signing up" />);

    expect(screen.getByText(/by signing up for kuizu/i)).toBeInTheDocument();
  });

  it('applies custom className and styles', () => {
    const { container } = render(
      <AuthLegalNotice
        action="signing in"
        className="custom-class"
        styles={{
          legalNoticeContainer: 'custom-container',
          disclaimer: 'custom-disclaimer',
        }}
      />
    );

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('custom-container');
    expect(footer).toHaveClass('custom-class');
  });
});
