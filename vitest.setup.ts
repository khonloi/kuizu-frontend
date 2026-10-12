import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock Web Audio API for tests
class MockAudioContext {
  currentTime = 0;
  destination = {};

  createOscillator() {
    return {
      type: 'sine',
      frequency: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {},
      },
      connect: () => {},
      start: () => {},
      stop: () => {},
    };
  }

  createGain() {
    return {
      gain: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {},
      },
      connect: () => {},
    };
  }
}

if (typeof window !== 'undefined') {
  (window as unknown as { AudioContext: typeof MockAudioContext }).AudioContext = MockAudioContext;
  (window as unknown as { webkitAudioContext: typeof MockAudioContext }).webkitAudioContext = MockAudioContext;
}

// Mock canvas-confetti to prevent jsdom HTMLCanvasElement context missing errors
vi.mock('canvas-confetti', () => {
  return {
    default: vi.fn(),
  };
});

// Mock next/navigation for app router components
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
