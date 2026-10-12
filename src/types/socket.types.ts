export type KahootTileColor = 'red' | 'blue' | 'yellow' | 'green';

export interface ArenaChoice {
  id: string;
  text: string;
  color: KahootTileColor;
}

export interface PlayerScore {
  nickname: string;
  socketId?: string;
  score: number;
  streak?: number;
  rank?: number;
}

export interface QuestionStartPayload {
  questionIndex: number;
  totalQuestions: number;
  questionText: string;
  timeLimit: number;
  points: number;
  mediaUrl?: string;
  choices: ArenaChoice[];
  serverStartTime?: number;
}

export interface AnswerCountPayload {
  answeredCount: number;
  totalPlayers: number;
}

export interface QuestionRevealPayload {
  correctChoiceId?: string;
  correctChoiceText?: string;
  answersDistribution?: Record<string, number>;
  leaderboard: PlayerScore[];
}

export interface GameEndedPayload {
  podium: PlayerScore[];
  fullLeaderboard: PlayerScore[];
}

export interface PlayerJoinedPayload {
  nickname: string;
  socketId: string;
  playerCount: number;
}

export interface PlayerLeftPayload {
  nickname: string;
  socketId: string;
}

export interface GameCancelledPayload {
  message: string;
}

export interface HostCreateResponse {
  success: boolean;
  pin?: string;
  quizTitle?: string;
  totalQuestions?: number;
  message?: string;
}

export interface PlayerJoinResponse {
  success: boolean;
  pin?: string;
  nickname?: string;
  quizTitle?: string;
  totalQuestions?: number;
  message?: string;
}

export interface PlayerAnswerResponse {
  success: boolean;
  isCorrect?: boolean;
  pointsEarned?: number;
  newScore?: number;
  streak?: number;
  message?: string;
}
