import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from '../stack';

describe('Stack Layout Primitive', () => {
  it('renders children with horizontal and vertical directions', () => {
    const { rerender } = render(
      <Stack direction="horizontal" data-testid="stack">
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>
    );

    const stackEl = screen.getByTestId('stack');
    expect(stackEl).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    rerender(
      <Stack direction="vertical" data-testid="stack">
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>
    );

    expect(screen.getByTestId('stack')).toBeInTheDocument();
  });

  it('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Stack ref={ref} gap="lg" align="center" justify="between">
        <span>Content</span>
      </Stack>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
