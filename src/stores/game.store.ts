import { create } from 'zustand';

export interface PlayerInfo {
  nickname: string;
  socketId?: string;
  score?: number;
  streak?: number;
}

export interface QuestionChoice {
  id: string;
  text: string;
  color: 'red' | 'blue' | 'yellow' | 'green';
}

export interface CurrentQuestion {
  questionIndex: number;
  totalQuestions: number;
  questionText: string;
  timeLimit: number;
  points: number;
  mediaUrl?: string;
  choices: QuestionChoice[];
}

interface GameState {
  pin: string | null;
  nickname: string | null;
  isHost: boolean;
  status: 'idle' | 'lobby' | 'question' | 'reveal' | 'ended';
  players: PlayerInfo[];
  currentQuestion: CurrentQuestion | null;
  selectedChoiceId: string | null;
  score: number;
  lastPointsEarned: number;
  correctChoiceId: string | null;
  podium: PlayerInfo[];

  setPin: (pin: string | null) => void;
  setNickname: (nickname: string | null) => void;
  setIsHost: (isHost: boolean) => void;
  setStatus: (status: GameState['status']) => void;
  setPlayers: (players: PlayerInfo[]) => void;
  addPlayer: (player: PlayerInfo) => void;
  setCurrentQuestion: (question: CurrentQuestion | null) => void;
  setSelectedChoiceId: (choiceId: string | null) => void;
  setRevealResult: (correctChoiceId: string, leaderboard: PlayerInfo[]) => void;
  setGameEnded: (podium: PlayerInfo[]) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  pin: null,
  nickname: null,
  isHost: false,
  status: 'idle',
  players: [],
  currentQuestion: null,
  selectedChoiceId: null,
  score: 0,
  lastPointsEarned: 0,
  correctChoiceId: null,
  podium: [],

  setPin: (pin) => set({ pin }),
  setNickname: (nickname) => set({ nickname }),
  setIsHost: (isHost) => set({ isHost }),
  setStatus: (status) => set({ status }),
  setPlayers: (players) => set({ players }),
  addPlayer: (player) =>
    set((state) => ({ players: [...state.players, player] })),
  setCurrentQuestion: (currentQuestion) =>
    set({ currentQuestion, selectedChoiceId: null, correctChoiceId: null }),
  setSelectedChoiceId: (selectedChoiceId) => set({ selectedChoiceId }),
  setRevealResult: (correctChoiceId, leaderboard) =>
    set({ correctChoiceId, players: leaderboard, status: 'reveal' }),
  setGameEnded: (podium) => set({ podium, status: 'ended' }),
  resetGame: () =>
    set({
      pin: null,
      nickname: null,
      isHost: false,
      status: 'idle',
      players: [],
      currentQuestion: null,
      selectedChoiceId: null,
      score: 0,
      lastPointsEarned: 0,
      correctChoiceId: null,
      podium: [],
    }),
}));
