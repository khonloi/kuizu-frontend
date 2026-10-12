import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast, ToastContainer } from '../toast';
import { useToastStore, toast } from '@/stores/toast.store';

describe('Toast Primitive & Container', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useToastStore.getState().clearToasts();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders single toast with title, description, and status role', () => {
    const onDismiss = vi.fn();
    render(
      <Toast
        toast={{
          id: 't-1',
          title: 'Quest Completed!',
          description: '+50 XP Awarded',
          variant: 'success',
        }}
        onDismiss={onDismiss}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Quest Completed!')).toBeInTheDocument();
    expect(screen.getByText('+50 XP Awarded')).toBeInTheDocument();
  });

  it('invokes onDismiss when close button is clicked', () => {
    const onDismiss = vi.fn();
    render(
      <Toast
        toast={{
          id: 't-1',
          title: 'Network Warning',
          variant: 'warning',
        }}
        onDismiss={onDismiss}
      />
    );

    const closeBtn = screen.getByRole('button', { name: /dismiss notification/i });
    fireEvent.click(closeBtn);

    expect(onDismiss).toHaveBeenCalledWith('t-1');
  });

  it('renders toasts dynamically through ToastContainer via toast store', () => {
    render(<ToastContainer />);

    expect(screen.queryByRole('status')).toBeNull();

    act(() => {
      toast.success('Heart Refilled', 'Your hearts are at maximum!');
    });

    expect(screen.getByText('Heart Refilled')).toBeInTheDocument();
    expect(screen.getByText('Your hearts are at maximum!')).toBeInTheDocument();
  });
});
