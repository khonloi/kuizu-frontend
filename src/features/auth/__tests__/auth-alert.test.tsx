import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthAlert } from '../components/auth-alert';

describe('AuthAlert Component', () => {
  it('renders nothing when message is null or empty', () => {
    const { container } = render(<AuthAlert message={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders alert with role="alert" and message text', () => {
    render(<AuthAlert message="Invalid credentials provided" />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Invalid credentials provided');
  });
});
