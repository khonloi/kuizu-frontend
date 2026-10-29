import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from '../loading';

describe('Root Loading Component', () => {
  it('renders quest skeleton instead of loading spinner circle', () => {
    const { container } = render(<Loading />);

    expect(screen.getByTestId('quest-skeleton')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading quest...')).toBeInTheDocument();
    expect(container.querySelector('.spinner')).toBeNull();
    expect(container.querySelector('.animate-spin')).toBeNull();
  });
});

