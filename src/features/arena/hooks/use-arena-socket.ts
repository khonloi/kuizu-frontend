'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { getGameSocket, disconnectGameSocket } from '@/lib/socket';
import { useGameStore } from '@/stores/game.store';
import { toast } from '@/stores/toast.store';
import { SAMPLE_QUIZZES } from '@/mock/sample-quizzes';
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

  // Demo simulation mode state
  const isDemoRef = useRef(false);
  const demoIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    };
  }, []);

  // Clean up demo simulation interval on unmount
  useEffect(() => {
    return () => {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
      }
    };
  }, []);

  // 1. Host Create Game Room
  const createGame = useCallback(
    async (quizId: string): Promise<HostCreateResponse> => {
      const socket = getGameSocket();
      const store = useGameStore.getState();

      // If connected to live server, emit host:create
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

      // Offline / Demo Mode Fallback
      isDemoRef.current = true;
      const demoQuiz = SAMPLE_QUIZZES.find((q) => q.id === quizId) || SAMPLE_QUIZZES[0];
      const demoPin = Math.floor(100000 + Math.random() * 900000).toString();

      store.setPin(demoPin);
      store.setIsHost(true);
      store.setQuizTitle(demoQuiz.title);
      store.setStatus('lobby');

      // Populate with 4 simulated bot players
      const demoBots = [
        { nickname: 'Sakura 🌸', socketId: 'bot-1', score: 0, streak: 0 },
        { nickname: 'Kenji ⚡', socketId: 'bot-2', score: 0, streak: 0 },
        { nickname: 'Aoi 🌊', socketId: 'bot-3', score: 0, streak: 0 },
        { nickname: 'Takeshi 🔥', socketId: 'bot-4', score: 0, streak: 0 },
      ];
      store.setPlayers(demoBots);
      store.setAnswerCount(0, 4);

      return {
        success: true,
        pin: demoPin,
        quizTitle: demoQuiz.title,
        totalQuestions: demoQuiz.questions.length,
      };
    },
    []
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

      // Offline / Demo Mode Fallback
      isDemoRef.current = true;
      const demoQuiz = SAMPLE_QUIZZES[0];
      store.setPin(pin);
      store.setNickname(nickname);
      store.setIsHost(false);
      store.setQuizTitle(demoQuiz.title);
      store.setStatus('lobby');

      return {
        success: true,
        pin,
        nickname,
        quizTitle: demoQuiz.title,
        totalQuestions: demoQuiz.questions.length,
      };
    },
    []
  );

  // 3. Host Start Game
  const startGame = useCallback(async () => {
    const socket = getGameSocket();
    const store = useGameStore.getState();

    if (socket.connected) {
      return new Promise<{ success: boolean; questionIndex?: number }>((resolve) => {
        socket.emit('host:start', (res: { success: boolean; questionIndex?: number }) => {
          resolve(res);
        });
      });
    }

    // Demo simulation start
    const demoQuiz = SAMPLE_QUIZZES[0];
    const firstQ = demoQuiz.questions[0];

    store.setCurrentQuestion({
      questionIndex: 0,
      totalQuestions: demoQuiz.questions.length,
      questionText: firstQ.questionText,
      timeLimit: firstQ.timeLimit,
      points: firstQ.points,
      choices: firstQ.choices.map((c) => ({
        id: c.id,
        text: c.text,
        color: c.color,
      })),
    });

    // Simulate bots answering
    let answered = 0;
    demoIntervalRef.current = setInterval(() => {
      answered += 1;
      useGameStore.getState().setAnswerCount(answered, 4);
      if (answered >= 4 && demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
      }
    }, 1500);

    return { success: true, questionIndex: 0 };
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
              if (res.success && res.newScore !== undefined) {
                // Update score state in game store
              }
              resolve(res);
            }
          );
        });
      }

      // Demo fallback
      const isCorrect = choiceId.includes('c1') || choiceId.includes('Totoro');
      const pts = isCorrect ? 940 : 0;
      return {
        success: true,
        isCorrect,
        pointsEarned: pts,
        newScore: (store.score || 0) + pts,
        streak: isCorrect ? (store.streak || 0) + 1 : 0,
      };
    },
    []
  );

  // 5. Host Reveal Question
  const revealAnswer = useCallback(async () => {
    const socket = getGameSocket();
    const store = useGameStore.getState();

    if (socket.connected) {
      return new Promise<{ success: boolean }>((resolve) => {
        socket.emit('host:reveal', (res: { success: boolean }) => {
          resolve(res);
        });
      });
    }

    // Demo reveal
    const currentQ = store.currentQuestion;
    const correctId = currentQ?.choices[0]?.id || 'q1-c1';

    const simulatedLeaderboard = [
      { nickname: 'Sakura 🌸', score: 950, streak: 1 },
      { nickname: 'Takeshi 🔥', score: 880, streak: 1 },
      { nickname: 'Kenji ⚡', score: 820, streak: 1 },
      { nickname: 'Aoi 🌊', score: 710, streak: 1 },
    ];

    store.setRevealResult({
      correctChoiceId: correctId,
      answersDistribution: {
        [currentQ?.choices[0]?.id || '1']: 3,
        [currentQ?.choices[1]?.id || '2']: 1,
        [currentQ?.choices[2]?.id || '3']: 0,
        [currentQ?.choices[3]?.id || '4']: 0,
      },
      leaderboard: simulatedLeaderboard,
    });

    return { success: true };
  }, []);

  // 6. Host Next Question or Finish
  const nextQuestion = useCallback(async () => {
    const socket = getGameSocket();
    const store = useGameStore.getState();

    if (socket.connected) {
      return new Promise<{ success: boolean; isFinished?: boolean }>((resolve) => {
        socket.emit('host:next', (res: { success: boolean; isFinished?: boolean }) => {
          resolve(res);
        });
      });
    }

    // Demo next: advance or end
    const currentIdx = store.currentQuestion?.questionIndex ?? 0;
    const demoQuiz = SAMPLE_QUIZZES[0];

    if (currentIdx + 1 >= demoQuiz.questions.length) {
      // Game ended
      const podium = [
        { nickname: 'Sakura 🌸', score: 4850, streak: 5 },
        { nickname: 'Takeshi 🔥', score: 4120, streak: 4 },
        { nickname: 'Kenji ⚡', score: 3790, streak: 3 },
      ];
      store.setGameEnded({
        podium,
        fullLeaderboard: [
          ...podium,
          { nickname: 'Aoi 🌊', score: 2950, streak: 2 },
        ],
      });
      return { success: true, isFinished: true };
    }

    // Load next question
    const nextQ = demoQuiz.questions[currentIdx + 1];
    store.setCurrentQuestion({
      questionIndex: currentIdx + 1,
      totalQuestions: demoQuiz.questions.length,
      questionText: nextQ.questionText,
      timeLimit: nextQ.timeLimit,
      points: nextQ.points,
      choices: nextQ.choices.map((c) => ({
        id: c.id,
        text: c.text,
        color: c.color,
      })),
    });

    return { success: true, isFinished: false };
  }, []);

  const disconnect = useCallback(() => {
    disconnectGameSocket();
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
