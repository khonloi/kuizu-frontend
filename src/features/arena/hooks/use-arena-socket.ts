'use client';

import { useEffect, useCallback, useState } from 'react';
import { getGameSocket, disconnectGameSocket } from '@/lib/socket';
import { useGameStore } from '@/stores/game.store';
import { toast } from '@/stores/toast.store';
import { arenaSimulator } from '../services/arena-simulator';
import type {
  PlayerJoinedPayload,
  PlayerLeftPayload,
  QuestionStartPayload,
  AnswerCountPayload,
  QuestionRevealPayload,
  GameEndedPayload,
  GameCancelledPayload,
  HostCreateResponse,
  PlayerJoinResponse,
  PlayerAnswerResponse,
} from '@/types/socket.types';

export function useArenaSocket() {
  const [isConnected, setIsConnected] = useState(() => {
    if (typeof window !== 'undefined') {
      return getGameSocket().connected;
    }
    return false;
  });
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const socket = getGameSocket();

    const onConnect = () => {
      setIsConnected(true);
      setConnectionError(null);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onConnectError = (err: Error) => {
      setIsConnected(false);
      setConnectionError(err.message || 'Failed to connect to game arena');
    };

    const onPlayerJoined = (data: PlayerJoinedPayload) => {
      const store = useGameStore.getState();
      store.addPlayer({
        nickname: data.nickname,
        socketId: data.socketId,
        score: 0,
        streak: 0,
      });
      store.setAnswerCount(0, data.playerCount);
    };

    const onPlayerLeft = (data: PlayerLeftPayload) => {
      useGameStore.getState().removePlayer(data.socketId);
    };

    const onQuestionStart = (data: QuestionStartPayload) => {
      useGameStore.getState().setCurrentQuestion(data);
    };

    const onAnswerCount = (data: AnswerCountPayload) => {
      useGameStore.getState().setAnswerCount(data.answeredCount, data.totalPlayers);
    };

    const onQuestionReveal = (data: QuestionRevealPayload) => {
      useGameStore.getState().setRevealResult(data);
    };

    const onGameEnded = (data: GameEndedPayload) => {
      useGameStore.getState().setGameEnded(data);
    };

    const onGameCancelled = (data: GameCancelledPayload) => {
      toast.error('Game Ended', data.message);
      useGameStore.getState().resetGame();
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('player:joined', onPlayerJoined);
    socket.on('player:left', onPlayerLeft);
    socket.on('question:start', onQuestionStart);
    socket.on('question:answer_count', onAnswerCount);
    socket.on('question:reveal', onQuestionReveal);
    socket.on('game:ended', onGameEnded);
    socket.on('game:cancelled', onGameCancelled);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('player:joined', onPlayerJoined);
      socket.off('player:left', onPlayerLeft);
      socket.off('question:start', onQuestionStart);
      socket.off('question:answer_count', onAnswerCount);
      socket.off('question:reveal', onQuestionReveal);
      socket.off('game:ended', onGameEnded);
      socket.off('game:cancelled', onGameCancelled);
      arenaSimulator.reset();
    };
  }, []);

  // 1. Host Create Game Room
  const createGame = useCallback(
    async (quizId: string): Promise<HostCreateResponse> => {
      const socket = getGameSocket();
      const store = useGameStore.getState();

      if (socket.connected) {
        return new Promise((resolve) => {
          socket.emit('host:create', { quizId }, (res: HostCreateResponse) => {
            if (res.success && res.pin) {
              store.setPin(res.pin);
              store.setIsHost(true);
              store.setQuizTitle(res.quizTitle || 'Arena Quiz');
              store.setStatus('lobby');
            }
            resolve(res);
          });
        });
      }

      return arenaSimulator.createGame(quizId);
    },
    [],
  );

  // 2. Player Join Game
  const joinGame = useCallback(
    async (pin: string, nickname: string): Promise<PlayerJoinResponse> => {
      const socket = getGameSocket();
      const store = useGameStore.getState();

      if (socket.connected) {
        return new Promise((resolve) => {
          socket.emit('player:join', { pin, nickname }, (res: PlayerJoinResponse) => {
            if (res.success && res.pin) {
              store.setPin(res.pin);
              store.setNickname(nickname);
              store.setIsHost(false);
              store.setQuizTitle(res.quizTitle || 'Live Arena');
              store.setStatus('lobby');
            }
            resolve(res);
          });
        });
      }

      return arenaSimulator.joinGame(pin, nickname);
    },
    [],
  );

  // 3. Host Start Game
  const startGame = useCallback(async () => {
    const socket = getGameSocket();

    if (socket.connected) {
      return new Promise<{ success: boolean; questionIndex?: number }>((resolve) => {
        socket.emit('host:start', (res: { success: boolean; questionIndex?: number }) => {
          resolve(res);
        });
      });
    }

    return arenaSimulator.startGame();
  }, []);

  // 4. Player Submit Answer
  const submitAnswer = useCallback(
    async (pin: string, choiceId: string): Promise<PlayerAnswerResponse> => {
      const socket = getGameSocket();
      const store = useGameStore.getState();

      store.setSelectedChoiceId(choiceId);

      if (socket.connected) {
        return new Promise((resolve) => {
          socket.emit(
            'player:answer',
            { pin, choiceId },
            (res: PlayerAnswerResponse) => {
              resolve(res);
            },
          );
        });
      }

      return arenaSimulator.submitAnswer(choiceId);
    },
    [],
  );

  // 5. Host Reveal Question
  const revealAnswer = useCallback(async () => {
    const socket = getGameSocket();

    if (socket.connected) {
      return new Promise<{ success: boolean }>((resolve) => {
        socket.emit('host:reveal', (res: { success: boolean }) => {
          resolve(res);
        });
      });
    }

    return arenaSimulator.revealAnswer();
  }, []);

  // 6. Host Next Question or Finish
  const nextQuestion = useCallback(async () => {
    const socket = getGameSocket();

    if (socket.connected) {
      return new Promise<{ success: boolean; isFinished?: boolean }>((resolve) => {
        socket.emit('host:next', (res: { success: boolean; isFinished?: boolean }) => {
          resolve(res);
        });
      });
    }

    return arenaSimulator.nextQuestion();
  }, []);

  const disconnect = useCallback(() => {
    disconnectGameSocket();
    arenaSimulator.reset();
    useGameStore.getState().resetGame();
  }, []);

  return {
    isConnected,
    connectionError,
    createGame,
    joinGame,
    startGame,
    submitAnswer,
    revealAnswer,
    nextQuestion,
    disconnect,
  };
}
