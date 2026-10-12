import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from '../tooltip';

describe('Tooltip Primitive', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders trigger element and shows tooltip on mouse enter after delay', () => {
    render(
      <Tooltip content="Bonus XP boost" delayMs={100}>
        <button type="button">Hover Me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Hover Me' });
    expect(screen.queryByRole('tooltip')).toBeNull();

    fireEvent.mouseEnter(trigger);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Bonus XP boost');
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Hint text" delayMs={50}>
        <button type="button">Target</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Target' });
    fireEvent.mouseEnter(trigger);

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('shows tooltip on focus and hides on blur', () => {
    render(
      <Tooltip content="Keyboard tooltip" delayMs={50}>
        <button type="button">Focusable</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Focusable' });

    fireEvent.focus(trigger);
    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.blur(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
});
