import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ArenaSimulator } from '../services/arena-simulator';
import { useGameStore } from '@/stores/game.store';

describe('ArenaSimulator Service', () => {
  let simulator: ArenaSimulator;

  beforeEach(() => {
    vi.useFakeTimers();
    useGameStore.getState().resetGame();
    simulator = new ArenaSimulator();
  });

  afterEach(() => {
    simulator.reset();
    vi.restoreAllMocks();
  });

  it('initializes host game room with PIN, bots, and lobby status', () => {
    const res = simulator.createGame('quiz-anime-pop');

    expect(res.success).toBe(true);
    expect(res.pin).toBeDefined();
    expect(res.pin).toMatch(/^\d{6}$/);

    const store = useGameStore.getState();
    expect(store.isHost).toBe(true);
    expect(store.status).toBe('lobby');
    expect(store.players.length).toBe(4);
    expect(store.players[0].nickname).toBe('Sakura 🌸');
  });

  it('allows a player to join with PIN and nickname', () => {
    const res = simulator.joinGame('123456', 'DragonSlayer');

    expect(res.success).toBe(true);
    expect(res.pin).toBe('123456');
    expect(res.nickname).toBe('DragonSlayer');

    const store = useGameStore.getState();
    expect(store.isHost).toBe(false);
    expect(store.status).toBe('lobby');
    expect(store.nickname).toBe('DragonSlayer');
  });

  it('starts game and transitions to question status with bot ticks', () => {
    simulator.createGame('quiz-anime-pop');
    const startRes = simulator.startGame();

    expect(startRes.success).toBe(true);
    expect(startRes.questionIndex).toBe(0);

    const store = useGameStore.getState();
    expect(store.status).toBe('question');
    expect(store.currentQuestion).not.toBeNull();
    expect(store.currentQuestion?.choices.length).toBeGreaterThan(0);

    // Fast-forward interval ticks
    vi.advanceTimersByTime(3000);
    expect(useGameStore.getState().answeredCount).toBeGreaterThan(0);
  });

  it('evaluates player answer submission and returns score/streak', () => {
    simulator.createGame('quiz-anime-pop');
    simulator.startGame();

    const currentQ = useGameStore.getState().currentQuestion;
    const firstChoiceId = currentQ?.choices[0]?.id || 'q1-c1';

    const answerRes = simulator.submitAnswer(firstChoiceId);
    expect(answerRes.success).toBe(true);
    expect(typeof answerRes.isCorrect).toBe('boolean');
    expect(answerRes.pointsEarned).toBeGreaterThanOrEqual(0);
  });

  it('reveals answers and calculates leaderboard standings', () => {
    simulator.createGame('quiz-anime-pop');
    simulator.startGame();

    const revealRes = simulator.revealAnswer();
    expect(revealRes.success).toBe(true);

    const store = useGameStore.getState();
    expect(store.status).toBe('reveal');
    expect(store.correctChoiceId).toBeDefined();
    expect(store.answersDistribution).toBeDefined();
    expect(store.players.length).toBe(4);
  });

  it('advances to next question and triggers game ended when complete', () => {
    simulator.createGame('quiz-anime-pop');
    simulator.startGame();

    // Advance through all questions
    let finished = false;
    for (let i = 0; i < 10; i++) {
      const res = simulator.nextQuestion();
      if (res.isFinished) {
        finished = true;
        break;
      }
    }

    expect(finished).toBe(true);
    const store = useGameStore.getState();
    expect(store.status).toBe('ended');
    expect(store.podium.length).toBeLessThanOrEqual(3);
    expect(store.fullLeaderboard.length).toBe(4);
  });
});
