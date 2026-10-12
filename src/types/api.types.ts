export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'teacher' | 'admin';
  avatarUrl?: string;
  xp: number;
  streak: {
    count: number;
    lastActiveDate: string | null;
  };
  streakFreezes: number;
  hearts: number;
  gems: number;
  league: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ExerciseType =
  | 'multiple-choice'
  | 'translate'
  | 'match-pairs'
  | 'fill-blank'
  | 'listen';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  options: string[];
  answer: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon?: string;
  order: number;
  xpReward: number;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description?: string;
  color: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  isPublished: boolean;
  units: Unit[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EnrichedLesson extends Lesson {
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface EnrichedUnit extends Omit<Unit, 'lessons'> {
  lessons: EnrichedLesson[];
  completedCount: number;
  totalCount: number;
}

export interface EnrichedCurriculum {
  course: Omit<Course, 'units'>;
  units: EnrichedUnit[];
  overallProgress: {
    completedLessons: number;
    totalLessons: number;
    percent: number;
  };
}

export interface LessonCompletionResult {
  success: boolean;
  xpEarned: number;
  totalXp: number;
  alreadyCompleted: boolean;
  nextUnlockedLessonId?: string;
  message?: string;
}

export interface QuizChoice {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  timeLimit: number;
  points: number;
  mediaUrl?: string;
  choices: QuizChoice[];
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  isPublic: boolean;
  authorId?: string;
  questions?: QuizQuestion[];
  questionCount?: number;
  createdAt?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page?: number;
    limit?: number;
    total?: number;
    hasNextPage?: boolean;
    nextCursor?: string;
  };
}
