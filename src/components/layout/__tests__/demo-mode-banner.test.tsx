import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DemoModeBanner } from '../demo-mode-banner';
import * as demoModeModule from '@/lib/demo-mode';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('DemoModeBanner Layout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when demo mode is not active', () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(false);

    const { container } = render(<DemoModeBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders badge, message, and action buttons when demo mode is active', () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(true);

    render(<DemoModeBanner />);

    expect(screen.getByText(/DEMO MODE ACTIVE/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Simulated live backend with offline storage/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Reset Progress/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Exit Demo/i }),
    ).toBeInTheDocument();
  });

  it('triggers resetDemoProgress on clicking Reset Progress button', () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(true);
    const resetSpy = vi.spyOn(demoModeModule, 'resetDemoProgress');

    render(<DemoModeBanner />);

    const resetBtn = screen.getByRole('button', { name: /Reset Progress/i });
    fireEvent.click(resetBtn);

    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  it('triggers disableDemoMode and routes to /login on clicking Exit Demo button', async () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(true);
    const disableSpy = vi.spyOn(demoModeModule, 'disableDemoMode').mockResolvedValue();

    render(<DemoModeBanner />);

    const exitBtn = screen.getByRole('button', { name: /Exit Demo/i });
    fireEvent.click(exitBtn);

    expect(disableSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
});
