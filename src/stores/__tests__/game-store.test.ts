import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../game.store';
import type { QuestionStartPayload, QuestionRevealPayload, GameEndedPayload } from '@/types/socket.types';

describe('useGameStore (Arena Multiplayer State)', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  it('initializes with default idle values', () => {
    const state = useGameStore.getState();
    expect(state.status).toBe('idle');
    expect(state.pin).toBeNull();
    expect(state.players).toEqual([]);
    expect(state.score).toBe(0);
  });

  it('updates pin, nickname and room status', () => {
    useGameStore.getState().setPin('839201');
    useGameStore.getState().setNickname('Speedy');
    useGameStore.getState().setStatus('lobby');

    const state = useGameStore.getState();
    expect(state.pin).toBe('839201');
    expect(state.nickname).toBe('Speedy');
    expect(state.status).toBe('lobby');
  });

  it('adds and removes players correctly without duplicates', () => {
    useGameStore.getState().addPlayer({ socketId: 's-1', nickname: 'Alice', score: 0 });
    useGameStore.getState().addPlayer({ socketId: 's-2', nickname: 'Bob', score: 0 });

    expect(useGameStore.getState().players.length).toBe(2);

    // Adding same socketId updates existing
    useGameStore.getState().addPlayer({ socketId: 's-1', nickname: 'Alice Renamed', score: 100 });
    expect(useGameStore.getState().players.length).toBe(2);
    expect(useGameStore.getState().players[1].nickname).toBe('Alice Renamed');

    // Remove player
    useGameStore.getState().removePlayer('s-2');
    expect(useGameStore.getState().players.length).toBe(1);
    expect(useGameStore.getState().players[0].socketId).toBe('s-1');
  });

  it('transitions to question state with reset answered counters', () => {
    const mockQuestion: QuestionStartPayload = {
      questionIndex: 0,
      totalQuestions: 5,
      questionText: 'What is the capital of Japan?',
      timeLimit: 20,
      points: 1000,
      choices: [
        { id: 'c1', text: 'Tokyo', color: 'red' },
        { id: 'c2', text: 'Kyoto', color: 'blue' },
      ],
    };

    useGameStore.getState().setCurrentQuestion(mockQuestion);
    const state = useGameStore.getState();

    expect(state.status).toBe('question');
    expect(state.currentQuestion?.questionText).toBe('What is the capital of Japan?');
    expect(state.selectedChoiceId).toBeNull();
    expect(state.answeredCount).toBe(0);
  });

  it('handles question reveal results with leaderboard update', () => {
    const revealPayload: QuestionRevealPayload = {
      correctChoiceId: 'c1',
      answersDistribution: { c1: 4, c2: 1 },
      leaderboard: [{ socketId: 's-1', nickname: 'Alice', score: 950 }],
    };

    useGameStore.getState().setRevealResult(revealPayload);
    const state = useGameStore.getState();

    expect(state.status).toBe('reveal');
    expect(state.correctChoiceId).toBe('c1');
    expect(state.answersDistribution).toEqual({ c1: 4, c2: 1 });
    expect(state.players[0].score).toBe(950);
  });

  it('handles game ended and podium ceremony data', () => {
    const endPayload: GameEndedPayload = {
      podium: [
        { socketId: 's-1', nickname: 'Alice', score: 2800 },
        { socketId: 's-2', nickname: 'Bob', score: 2100 },
        { socketId: 's-3', nickname: 'Charlie', score: 1900 },
      ],
      fullLeaderboard: [],
    };

    useGameStore.getState().setGameEnded(endPayload);
    const state = useGameStore.getState();

    expect(state.status).toBe('ended');
    expect(state.podium.length).toBe(3);
    expect(state.podium[0].nickname).toBe('Alice');
  });

  it('resets all game state to initial clean state', () => {
    useGameStore.getState().setPin('123456');
    useGameStore.getState().setStatus('question');
    useGameStore.getState().resetGame();

    const state = useGameStore.getState();
    expect(state.pin).toBeNull();
    expect(state.status).toBe('idle');
    expect(state.players).toEqual([]);
  });
});
