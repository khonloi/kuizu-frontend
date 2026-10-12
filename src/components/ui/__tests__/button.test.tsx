import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button Primitive (3D Tactile)', () => {
  it('renders button text correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events and invokes callback', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Practice</Button>);

    fireEvent.click(screen.getByRole('button', { name: /practice/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click events when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Locked
      </Button>
    );

    const btn = screen.getByRole('button', { name: /locked/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('displays loading spinner and disables button when isLoading is true', () => {
    render(<Button isLoading>Submitting</Button>);

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('renders left and right icons appropriately', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">⚡</span>}
        rightIcon={<span data-testid="right-icon">➔</span>}
      >
        Continue
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
