import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CountdownTimer } from '../components/countdown-timer';

describe('CountdownTimer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial time limit and timer role', () => {
    render(<CountdownTimer timeLimit={15} />);

    expect(screen.getByRole('timer')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('decrements time every second', () => {
    render(<CountdownTimer timeLimit={10} />);

    expect(screen.getByText('10')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('invokes onExpire callback when countdown reaches zero', () => {
    const handleExpire = vi.fn();
    render(<CountdownTimer timeLimit={3} onExpire={handleExpire} />);

    expect(handleExpire).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(handleExpire).toHaveBeenCalledTimes(1);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('does not decrement when paused is true', () => {
    render(<CountdownTimer timeLimit={10} paused={true} />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
