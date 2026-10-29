import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DemoModeBanner } from '../demo-mode-banner';
import * as demoModeModule from '@/lib/demo-mode';

describe('DemoModeBanner Layout Component (Demo Badge)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders trigger button indicating Demo: OFF when inactive', () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(false);

    render(<DemoModeBanner />);

    const trigger = screen.getByRole('button', { name: /demo: off/i });
    expect(trigger).toBeInTheDocument();
  });

  it('renders trigger button indicating Demo: ON when active', () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(true);

    render(<DemoModeBanner />);

    const trigger = screen.getByRole('button', { name: /demo: on/i });
    expect(trigger).toBeInTheDocument();
  });

  it('opens popup modal when trigger badge is clicked', () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(true);

    render(<DemoModeBanner />);

    const trigger = screen.getByRole('button', { name: /demo: on/i });
    fireEvent.click(trigger);

    expect(screen.getByText('Offline Demo Mode')).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle demo mode/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset fixtures & state/i })).toBeInTheDocument();
  });

  it('toggles demo mode to disabled when switch is clicked while active', async () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(true);
    const disableSpy = vi.spyOn(demoModeModule, 'disableDemoMode').mockResolvedValue();

    render(<DemoModeBanner />);

    fireEvent.click(screen.getByRole('button', { name: /demo: on/i }));
    const toggle = screen.getByRole('switch', { name: /toggle demo mode/i });
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(disableSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('triggers resetDemoProgress on clicking Reset Fixtures button', () => {
    vi.spyOn(demoModeModule, 'isDemoModeActive').mockReturnValue(true);
    const resetSpy = vi.spyOn(demoModeModule, 'resetDemoProgress');

    render(<DemoModeBanner />);

    fireEvent.click(screen.getByRole('button', { name: /demo: on/i }));
    const resetBtn = screen.getByRole('button', { name: /reset fixtures & state/i });
    fireEvent.click(resetBtn);

    expect(resetSpy).toHaveBeenCalledTimes(1);
  });
});
