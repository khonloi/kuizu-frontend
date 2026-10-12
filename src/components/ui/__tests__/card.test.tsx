import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../card';

describe('Card Primitive', () => {
  it('renders children content correctly', () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card description text</p>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description text')).toBeInTheDocument();
  });

  it('renders with padding and glow styles', () => {
    const { container } = render(
      <Card padding="lg" glow="duo" className="test-card">
        <span>Glow Card</span>
      </Card>
    );

    const card = container.querySelector('.test-card');
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Glow Card')).toBeInTheDocument();
  });

  it('renders interactive state and forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Card ref={ref} interactive={true}>
        <span>Clickable Card</span>
      </Card>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(container.firstChild).toBeInTheDocument();
  });
});
