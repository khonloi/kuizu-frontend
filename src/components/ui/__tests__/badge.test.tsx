import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge Primitive', () => {
  it('renders badge children text correctly', () => {
    render(<Badge>FOUNDATIONS</Badge>);

    expect(screen.getByText('FOUNDATIONS')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Badge icon={<span data-testid="badge-icon">⚡</span>}>XP BOOST</Badge>);

    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
    expect(screen.getByText('XP BOOST')).toBeInTheDocument();
  });

  it('renders with variant and custom className', () => {
    const { container } = render(
      <Badge variant="duo" size="sm" className="custom-badge">
        Active
      </Badge>
    );

    const badge = container.querySelector('.custom-badge');
    expect(badge).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
