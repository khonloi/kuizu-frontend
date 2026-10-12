import { create } from 'zustand';
import type {
  PlayerScore,
  QuestionStartPayload,
  QuestionRevealPayload,
  GameEndedPayload,
} from '../types/socket.types';

export type GameStatus =
  | 'idle'
  | 'lobby'
  | 'question'
  | 'reveal'
  | 'ended';

interface GameState {
  pin: string | null;
  nickname: string | null;
  quizTitle: string | null;
  isHost: boolean;
  status: GameStatus;
  players: PlayerScore[];
  currentQuestion: QuestionStartPayload | null;
  selectedChoiceId: string | null;
  score: number;
  streak: number;
  lastPointsEarned: number;
  correctChoiceId: string | null;
  answersDistribution: Record<string, number>;
  answeredCount: number;
  totalPlayers: number;
  podium: PlayerScore[];
  fullLeaderboard: PlayerScore[];

  setPin: (pin: string | null) => void;
  setNickname: (nickname: string | null) => void;
  setQuizTitle: (title: string | null) => void;
  setIsHost: (isHost: boolean) => void;
  setStatus: (status: GameStatus) => void;
  setPlayers: (players: PlayerScore[]) => void;
  addPlayer: (player: PlayerScore) => void;
  removePlayer: (socketId: string) => void;
  setCurrentQuestion: (question: QuestionStartPayload | null) => void;
  setSelectedChoiceId: (choiceId: string | null) => void;
  setAnswerCount: (answeredCount: number, totalPlayers: number) => void;
  setRevealResult: (payload: QuestionRevealPayload) => void;
  setGameEnded: (payload: GameEndedPayload) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  pin: null,
  nickname: null,
  quizTitle: null,
  isHost: false,
  status: 'idle',
  players: [],
  currentQuestion: null,
  selectedChoiceId: null,
  score: 0,
  streak: 0,
  lastPointsEarned: 0,
  correctChoiceId: null,
  answersDistribution: {},
  answeredCount: 0,
  totalPlayers: 0,
  podium: [],
  fullLeaderboard: [],

  setPin: (pin) => set({ pin }),
  setNickname: (nickname) => set({ nickname }),
  setQuizTitle: (quizTitle) => set({ quizTitle }),
  setIsHost: (isHost) => set({ isHost }),
  setStatus: (status) => set({ status }),
  setPlayers: (players) => set({ players }),
  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players.filter((p) => p.socketId !== player.socketId), player],
    })),
  removePlayer: (socketId) =>
    set((state) => ({
      players: state.players.filter((p) => p.socketId !== socketId),
    })),
  setCurrentQuestion: (currentQuestion) =>
    set({
      currentQuestion,
      selectedChoiceId: null,
      correctChoiceId: null,
      answersDistribution: {},
      answeredCount: 0,
      status: 'question',
    }),
  setSelectedChoiceId: (selectedChoiceId) => set({ selectedChoiceId }),
  setAnswerCount: (answeredCount, totalPlayers) =>
    set({ answeredCount, totalPlayers }),
  setRevealResult: (payload) =>
    set({
      correctChoiceId: payload.correctChoiceId,
      answersDistribution: payload.answersDistribution || {},
      players: payload.leaderboard || [],
      status: 'reveal',
    }),
  setGameEnded: (payload) =>
    set({
      podium: payload.podium || [],
      fullLeaderboard: payload.fullLeaderboard || [],
      status: 'ended',
    }),
  resetGame: () =>
    set({
      pin: null,
      nickname: null,
      quizTitle: null,
      isHost: false,
      status: 'idle',
      players: [],
      currentQuestion: null,
      selectedChoiceId: null,
      score: 0,
      streak: 0,
      lastPointsEarned: 0,
      correctChoiceId: null,
      answersDistribution: {},
      answeredCount: 0,
      totalPlayers: 0,
      podium: [],
      fullLeaderboard: [],
    }),
}));
