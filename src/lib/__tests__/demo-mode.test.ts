import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  isDemoModeActive,
  enableDemoMode,
  disableDemoMode,
  resetDemoProgress,
  INITIAL_DEMO_USER,
  DEMO_MODE_COOKIE,
  DEMO_SESSION_COOKIE,
  DEMO_STORAGE_KEY,
  DEMO_CHANGE_EVENT,
} from '../demo-mode';
import { useAuthStore } from '@/stores/auth.store';

describe('Demo Mode Runtime Engine (demo-mode.ts)', () => {
  const originalEnv = process.env.NEXT_PUBLIC_DEMO_MODE;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_DEMO_MODE;
    document.cookie = `${DEMO_MODE_COOKIE}=; path=/; max-age=0`;
    document.cookie = `${DEMO_SESSION_COOKIE}=; path=/; max-age=0`;
    localStorage.clear();
    useAuthStore.getState().setUser(null);
  });

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_DEMO_MODE = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_DEMO_MODE;
    }
  });

  it('detects demo mode via NEXT_PUBLIC_DEMO_MODE environment variable', () => {
    expect(isDemoModeActive()).toBe(false);
    process.env.NEXT_PUBLIC_DEMO_MODE = 'true';
    expect(isDemoModeActive()).toBe(true);
  });

  it('detects demo mode via kuizu_demo_mode cookie', () => {
    expect(isDemoModeActive()).toBe(false);
    document.cookie = `${DEMO_MODE_COOKIE}=true; path=/`;
    expect(isDemoModeActive()).toBe(true);
  });

  it('detects demo mode via demo-token session cookie', () => {
    expect(isDemoModeActive()).toBe(false);
    document.cookie = `${DEMO_SESSION_COOKIE}=demo-token; path=/`;
    expect(isDemoModeActive()).toBe(true);
  });

  it('detects demo mode via localStorage flag', () => {
    expect(isDemoModeActive()).toBe(false);
    localStorage.setItem(DEMO_STORAGE_KEY, 'true');
    expect(isDemoModeActive()).toBe(true);
  });

  it('enables demo mode properly with cookies, localStorage, and auth store', async () => {
    const listener = vi.fn();
    window.addEventListener(DEMO_CHANGE_EVENT, listener);

    await enableDemoMode();

    expect(isDemoModeActive()).toBe(true);
    expect(document.cookie).toContain(`${DEMO_MODE_COOKIE}=true`);
    expect(document.cookie).toContain(`${DEMO_SESSION_COOKIE}=demo-token`);
    expect(localStorage.getItem(DEMO_STORAGE_KEY)).toBe('true');
    expect(useAuthStore.getState().user?.username).toBe(INITIAL_DEMO_USER.username);
    expect(listener).toHaveBeenCalled();

    window.removeEventListener(DEMO_CHANGE_EVENT, listener);
  });

  it('disables demo mode and resets state and cookies', async () => {
    await enableDemoMode();
    expect(isDemoModeActive()).toBe(true);

    const listener = vi.fn();
    window.addEventListener(DEMO_CHANGE_EVENT, listener);

    await disableDemoMode();

    expect(localStorage.getItem(DEMO_STORAGE_KEY)).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
    expect(listener).toHaveBeenCalled();

    window.removeEventListener(DEMO_CHANGE_EVENT, listener);
  });

  it('resets demo user progress back to initial baseline', async () => {
    await enableDemoMode();

    // Modify progress
    useAuthStore.getState().updateXp(500);
    expect(useAuthStore.getState().user?.xp).toBe(1950);

    resetDemoProgress();

    expect(useAuthStore.getState().user?.xp).toBe(INITIAL_DEMO_USER.xp);
    expect(useAuthStore.getState().user?.hearts).toBe(5);
  });
});
