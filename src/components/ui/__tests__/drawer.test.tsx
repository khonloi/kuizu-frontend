import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from '../drawer';
import { Button } from '../button';

describe('Drawer Component (Feedback Slider)', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Drawer
        isOpen={false}
        headline="Hidden Drawer"
        action={<Button>Continue</Button>}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders success state with headline, subtext and action button', () => {
    render(
      <Drawer
        isOpen={true}
        status="success"
        headline="Nicely done!"
        subtext="Great job! Your answer matches perfectly."
        action={<Button>Continue</Button>}
      />
    );

    expect(screen.getByText('Nicely done!')).toBeInTheDocument();
    expect(screen.getByText('Great job! Your answer matches perfectly.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('renders error state and handles action click', () => {
    const handleNext = vi.fn();
    render(
      <Drawer
        isOpen={true}
        status="error"
        headline="Correct solution:"
        subtext="Konnichiwa"
        action={<Button onClick={handleNext}>Got it</Button>}
      />
    );

    expect(screen.getByText('Correct solution:')).toBeInTheDocument();
    expect(screen.getByText('Konnichiwa')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Got it' }));
    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});
