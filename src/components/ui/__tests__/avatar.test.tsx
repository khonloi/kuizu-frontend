import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '../avatar';

describe('Avatar Primitive', () => {
  it('renders initials when no image src is provided', () => {
    render(<Avatar name="Tanaka Taro" />);

    expect(screen.getByText('TT')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.png" alt="User Avatar" name="Tanaka Taro" />);

    const img = screen.getByRole('img', { name: 'User Avatar' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
  });

  it('falls back to initials when image loading fails', () => {
    render(<Avatar src="https://example.com/broken.png" name="Kenji Sato" />);

    const img = screen.getByRole('img');
    fireEvent.error(img);

    expect(screen.getByText('KS')).toBeInTheDocument();
  });

  it('renders online status dot when showStatus is true', () => {
    render(<Avatar name="Player One" showStatus={true} />);

    expect(screen.getByLabelText('Online')).toBeInTheDocument();
  });
});
