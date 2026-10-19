import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { A11yAnnouncer } from '../a11y-announcer';
import { useAnnouncerStore } from '@/lib/a11y/announcer.store';

describe('A11yAnnouncer Primitive', () => {
  beforeEach(() => {
    act(() => {
      useAnnouncerStore.getState().clear();
    });
  });

  it('renders status role with aria-live="polite" by default', () => {
    render(<A11yAnnouncer />);

    const announcer = screen.getByTestId('a11y-announcer');
    expect(announcer).toBeInTheDocument();
    expect(announcer).toHaveAttribute('role', 'status');
    expect(announcer).toHaveAttribute('aria-live', 'polite');
    expect(announcer).toHaveAttribute('aria-atomic', 'true');
    expect(announcer).toHaveTextContent('');
  });

  it('updates aria-live announcement when announce is dispatched', () => {
    render(<A11yAnnouncer />);

    act(() => {
      useAnnouncerStore.getState().announce('Lesson completed! 10 XP awarded.', 'assertive');
    });

    const announcer = screen.getByTestId('a11y-announcer');
    expect(announcer).toHaveAttribute('aria-live', 'assertive');
    expect(announcer).toHaveTextContent('Lesson completed! 10 XP awarded.');
  });

  it('clears message when clear is dispatched', () => {
    render(<A11yAnnouncer />);

    act(() => {
      useAnnouncerStore.getState().announce('Testing clear');
    });
    expect(screen.getByTestId('a11y-announcer')).toHaveTextContent('Testing clear');

    act(() => {
      useAnnouncerStore.getState().clear();
    });
    expect(screen.getByTestId('a11y-announcer')).toHaveTextContent('');
  });
});
