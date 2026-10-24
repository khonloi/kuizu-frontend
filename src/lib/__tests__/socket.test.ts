import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getGameSocket, disconnectGameSocket } from '../socket';

vi.mock('socket.io-client', () => {
  return {
    io: vi.fn().mockImplementation((url, opts) => {
      return {
        url,
        opts,
        connected: false,
        auth: opts?.auth,
        connect: vi.fn(),
        disconnect: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
        removeAllListeners: vi.fn(),
      };
    }),
  };
});

describe('Socket Manager', () => {
  beforeEach(() => {
    disconnectGameSocket();
  });

  afterEach(() => {
    disconnectGameSocket();
  });

  it('creates a socket instance with default configuration', () => {
    const socket = getGameSocket() as unknown as {
      opts: { transports: string[]; withCredentials: boolean };
      auth?: { token: string };
    };
    expect(socket).toBeDefined();
    expect(socket.opts.transports).toEqual(['websocket', 'polling']);
    expect(socket.opts.withCredentials).toBe(true);
  });

  it('attaches auth token when provided', () => {
    const socket = getGameSocket('test-token-123');
    expect(socket.auth).toEqual({ token: 'test-token-123' });
  });

  it('updates token on existing socket instance', () => {
    const socket1 = getGameSocket();
    expect(socket1.auth).toBeUndefined();

    const socket2 = getGameSocket('new-token-456');
    expect(socket2).toBe(socket1);
    expect(socket2.auth).toEqual({ token: 'new-token-456' });
  });

  it('disconnects and resets socket instance cleanly', () => {
    const socket = getGameSocket();
    expect(socket).toBeDefined();

    disconnectGameSocket();
    expect(socket.removeAllListeners).toHaveBeenCalled();
    expect(socket.disconnect).toHaveBeenCalled();

    // Calling getGameSocket again should create a fresh instance
    const newSocket = getGameSocket();
    expect(newSocket).not.toBe(socket);
  });
});
