import { SAMPLE_QUIZZES, type MockQuiz } from '@/mock/sample-quizzes';
import { useGameStore } from '@/stores/game.store';
import type {
  HostCreateResponse,
  PlayerJoinResponse,
  PlayerAnswerResponse,
  PlayerScore,
} from '@/types/socket.types';

export interface SimulatedBot extends PlayerScore {
  socketId: string;
}

export class ArenaSimulator {
  private activeQuiz: MockQuiz = SAMPLE_QUIZZES[0];
  private currentPin: string = '888888';
  private timer: NodeJS.Timeout | null = null;
  private bots: SimulatedBot[] = [];

  constructor() {
    this.resetBots();
  }

  private resetBots() {
    this.bots = [
      { nickname: 'Sakura 🌸', socketId: 'bot-1', score: 0, streak: 0 },
      { nickname: 'Kenji ⚡', socketId: 'bot-2', score: 0, streak: 0 },
      { nickname: 'Aoi 🌊', socketId: 'bot-3', score: 0, streak: 0 },
      { nickname: 'Takeshi 🔥', socketId: 'bot-4', score: 0, streak: 0 },
    ];
  }

  public createGame(quizId: string): HostCreateResponse {
    const store = useGameStore.getState();
    const quiz = SAMPLE_QUIZZES.find((q) => q.id === quizId) || SAMPLE_QUIZZES[0];
    this.activeQuiz = quiz;

    this.currentPin = Math.floor(100000 + Math.random() * 900000).toString();
    this.resetBots();

    store.setPin(this.currentPin);
    store.setIsHost(true);
    store.setQuizTitle(quiz.title);
    store.setStatus('lobby');
    store.setPlayers(this.bots);
    store.setAnswerCount(0, this.bots.length);

    return {
      success: true,
      pin: this.currentPin,
      quizTitle: quiz.title,
      totalQuestions: quiz.questions.length,
    };
  }

  public joinGame(pin: string, nickname: string): PlayerJoinResponse {
    const store = useGameStore.getState();
    this.activeQuiz = SAMPLE_QUIZZES[0];
    this.currentPin = pin;

    store.setPin(pin);
    store.setNickname(nickname);
    store.setIsHost(false);
    store.setQuizTitle(this.activeQuiz.title);
    store.setStatus('lobby');

    return {
      success: true,
      pin,
      nickname,
      quizTitle: this.activeQuiz.title,
      totalQuestions: this.activeQuiz.questions.length,
    };
  }

  public startGame(): { success: boolean; questionIndex: number } {
    const store = useGameStore.getState();
    const firstQ = this.activeQuiz.questions[0];

    store.setCurrentQuestion({
      questionIndex: 0,
      totalQuestions: this.activeQuiz.questions.length,
      questionText: firstQ.questionText,
      timeLimit: firstQ.timeLimit,
      points: firstQ.points,
      choices: firstQ.choices.map((c) => ({
        id: c.id,
        text: c.text,
        color: c.color,
      })),
    });

    // Simulate bot answers incrementally
    let answered = 0;
    this.clearTimer();
    this.timer = setInterval(() => {
      answered += 1;
      useGameStore.getState().setAnswerCount(answered, this.bots.length);
      if (answered >= this.bots.length) {
        this.clearTimer();
      }
    }, 1500);

    return { success: true, questionIndex: 0 };
  }

  public submitAnswer(choiceId: string): PlayerAnswerResponse {
    const store = useGameStore.getState();
    store.setSelectedChoiceId(choiceId);

    const currentQ = this.activeQuiz.questions[store.currentQuestion?.questionIndex ?? 0];
    const correctChoice = currentQ?.choices.find((c) => c.isCorrect) || currentQ?.choices[0];
    const isCorrect = choiceId === correctChoice?.id || choiceId.includes('c1');

    const pts = isCorrect ? Math.max(500, Math.round(currentQ?.points ?? 1000 * 0.94)) : 0;
    const newStreak = isCorrect ? (store.streak || 0) + 1 : 0;
    const newScore = (store.score || 0) + pts;

    return {
      success: true,
      isCorrect,
      pointsEarned: pts,
      newScore,
      streak: newStreak,
    };
  }

  public revealAnswer(): { success: boolean } {
    this.clearTimer();
    const store = useGameStore.getState();
    const currentQIndex = store.currentQuestion?.questionIndex ?? 0;
    const currentQ = this.activeQuiz.questions[currentQIndex];
    const correctChoice = currentQ?.choices.find((c) => c.isCorrect) || currentQ?.choices[0];

    // Simulate updated scores with some randomness for dynamic leaderboard
    this.bots = this.bots.map((b, idx) => ({
      ...b,
      score: b.score + (idx % 2 === 0 ? 800 + idx * 50 : 600),
      streak: idx % 2 === 0 ? (b.streak ?? 0) + 1 : 0,
    })).sort((a, b) => b.score - a.score);

    store.setRevealResult({
      correctChoiceId: correctChoice?.id || 'q1-c1',
      correctChoiceText: correctChoice?.text,
      answersDistribution: {
        [currentQ?.choices[0]?.id || '1']: 3,
        [currentQ?.choices[1]?.id || '2']: 1,
        [currentQ?.choices[2]?.id || '3']: 0,
        [currentQ?.choices[3]?.id || '4']: 0,
      },
      leaderboard: this.bots,
    });

    return { success: true };
  }

  public nextQuestion(): { success: boolean; isFinished: boolean } {
    this.clearTimer();
    const store = useGameStore.getState();
    const currentIdx = store.currentQuestion?.questionIndex ?? 0;

    if (currentIdx + 1 >= this.activeQuiz.questions.length) {
      const sorted = [...this.bots].sort((a, b) => b.score - a.score);
      const podium = sorted.slice(0, 3);
      store.setGameEnded({
        podium,
        fullLeaderboard: sorted,
      });
      return { success: true, isFinished: true };
    }

    const nextQ = this.activeQuiz.questions[currentIdx + 1];
    store.setCurrentQuestion({
      questionIndex: currentIdx + 1,
      totalQuestions: this.activeQuiz.questions.length,
      questionText: nextQ.questionText,
      timeLimit: nextQ.timeLimit,
      points: nextQ.points,
      choices: nextQ.choices.map((c) => ({
        id: c.id,
        text: c.text,
        color: c.color,
      })),
    });

    // Re-simulate bot answering for the next question
    let answered = 0;
    this.timer = setInterval(() => {
      answered += 1;
      useGameStore.getState().setAnswerCount(answered, this.bots.length);
      if (answered >= this.bots.length) {
        this.clearTimer();
      }
    }, 1500);

    return { success: true, isFinished: false };
  }

  public reset() {
    this.clearTimer();
    this.resetBots();
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const arenaSimulator = new ArenaSimulator();
