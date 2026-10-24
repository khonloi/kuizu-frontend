import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useArenaSocket } from '../use-arena-socket';
import * as socketModule from '@/lib/socket';
import { useGameStore } from '@/stores/game.store';

describe('useArenaSocket', () => {
  let mockSocket: any;
  let listeners: Record<string, Function> = {};

  beforeEach(() => {
    listeners = {};
    mockSocket = {
      connected: false,
      on: vi.fn((event: string, cb: Function) => {
        listeners[event] = cb;
      }),
      off: vi.fn((event: string) => {
        delete listeners[event];
      }),
      emit: vi.fn(),
      connect: vi.fn(),
      disconnect: vi.fn(),
      removeAllListeners: vi.fn(),
    };

    vi.spyOn(socketModule, 'getGameSocket').mockReturnValue(mockSocket);
    useGameStore.getState().resetGame();
  });

  it('subscribes to socket events on mount and unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => useArenaSocket());

    expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('player:joined', expect.any(Function));

    unmount();

    expect(mockSocket.off).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(mockSocket.off).toHaveBeenCalledWith('disconnect', expect.any(Function));
  });

  it('updates isConnected when connect and disconnect events fire', () => {
    const { result } = renderHook(() => useArenaSocket());
    expect(result.current.isConnected).toBe(false);

    act(() => {
      listeners['connect']?.();
    });
    expect(result.current.isConnected).toBe(true);

    act(() => {
      listeners['disconnect']?.();
    });
    expect(result.current.isConnected).toBe(false);
  });

  it('handles player:joined event and updates game store', () => {
    renderHook(() => useArenaSocket());

    act(() => {
      listeners['player:joined']?.({
        nickname: 'Alice',
        socketId: 'sock-123',
        playerCount: 1,
      });
    });

    const state = useGameStore.getState();
    expect(state.players).toHaveLength(1);
    expect(state.players[0].nickname).toBe('Alice');
    expect(state.totalPlayers).toBe(1);
  });
});
