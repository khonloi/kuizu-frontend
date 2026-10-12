import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton Primitive', () => {
  it('renders default text skeleton with status role', () => {
    render(<Skeleton />);

    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-label', 'Loading content...');
  });

  it('renders circle variant for avatars', () => {
    const { container } = render(<Skeleton variant="circle" width={48} height={48} />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: '48px', height: '48px' });
  });

  it('renders rectangular variant for cards', () => {
    const { container } = render(<Skeleton variant="rect" width="100%" height={150} />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: '100%', height: '150px' });
  });
});
