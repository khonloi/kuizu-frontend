import { SAMPLE_JAPANESE_COURSE } from './sample-courses';
import { SAMPLE_QUIZZES } from './sample-quizzes';
import type { User, LessonCompletionResult } from '@/types/api.types';
import type { LeaderboardEntry } from '@/types/gamification.types';

// In-memory / LocalStorage persistent store for offline demo mode
const STORAGE_KEY = 'kuizu_offline_demo_user';
const COMPLETED_LESSONS_KEY = 'kuizu_completed_lessons';

export function getCompletedLessons(): string[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(COMPLETED_LESSONS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as string[];
      } catch {
        // Fallback
      }
    }
  }
  return ['lesson-1']; // Default: Lesson 1 is completed so Lesson 2 is active!
}

export function saveCompletedLesson(lessonId: string): string[] {
  const current = getCompletedLessons();
  if (!current.includes(lessonId)) {
    const updated = [...current, lessonId];
    if (typeof window !== 'undefined') {
      localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(updated));
    }
    return updated;
  }
  return current;
}

function getInitialUser(): User {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as User;
      } catch {
        // Ignore JSON parse errors
      }
    }
  }

  return {
    id: 'demo-user-1',
    username: 'Alex Kenji',
    email: 'alex@kuizu.app',
    role: 'user',
    xp: 1450,
    hearts: 5,
    gems: 850,
    streak: {
      count: 7,
      lastActiveDate: null,
    },
    streakFreezes: 2,
    league: 'Diamond',
    avatarUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

let mockUser: User = getInitialUser();

function saveUser(user: User) {
  mockUser = user;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

export const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  { userId: 'lb-1', rank: 1, username: 'Kenji ⚡', xp: 2150, streakCount: 14, league: 'Diamond', isCurrentUser: false },
  { userId: 'lb-2', rank: 2, username: 'Alex Kenji', xp: 1450, streakCount: 7, league: 'Diamond', isCurrentUser: true },
  { userId: 'lb-3', rank: 3, username: 'Sakura 🌸', xp: 1380, streakCount: 9, league: 'Diamond', isCurrentUser: false },
  { userId: 'lb-4', rank: 4, username: 'Aoi 🌊', xp: 1120, streakCount: 5, league: 'Diamond', isCurrentUser: false },
  { userId: 'lb-5', rank: 5, username: 'Takeshi 🔥', xp: 980, streakCount: 4, league: 'Diamond', isCurrentUser: false },
  { userId: 'lb-6', rank: 6, username: 'Yuki ❄️', xp: 840, streakCount: 3, league: 'Diamond', isCurrentUser: false },
  { userId: 'lb-7', rank: 7, username: 'Ren 🗡️', xp: 710, streakCount: 2, league: 'Diamond', isCurrentUser: false },
  { userId: 'lb-8', rank: 8, username: 'Hina 🌻', xp: 590, streakCount: 1, league: 'Diamond', isCurrentUser: false },
];

export async function handleMockApiRequest<T = unknown>(
  url: string,
  method: string,
  body?: unknown
): Promise<T | null> {
  // Simulate natural realistic network latency (60ms)
  await new Promise((resolve) => setTimeout(resolve, 60));

  const cleanUrl = url.toLowerCase();

  // 1. Current User
  if (cleanUrl.includes('/users/me') && !cleanUrl.includes('/streak') && !cleanUrl.includes('/hearts') && !cleanUrl.includes('/progress') && method === 'GET') {
    return mockUser as unknown as T;
  }

  // 2. Auth Login
  if (cleanUrl.includes('/auth/login') && method === 'POST') {
    const payload = (body as { email?: string; username?: string }) || {};
    const updated = {
      ...mockUser,
      email: payload.email || mockUser.email,
      username: payload.username || mockUser.username,
    };
    saveUser(updated);
    if (typeof document !== 'undefined') {
      document.cookie = 'kuizu_session=demo-token; path=/; max-age=86400; SameSite=Lax';
    }
    return { user: updated, message: 'Logged in successfully' } as unknown as T;
  }

  // 3. Auth Register
  if (cleanUrl.includes('/auth/register') && method === 'POST') {
    const payload = (body as { email?: string; username?: string }) || {};
    const updated = {
      ...mockUser,
      email: payload.email || 'learner@kuizu.app',
      username: payload.username || 'New Learner',
      xp: 0,
      streak: { count: 1, lastActiveDate: null },
      streakFreezes: 2,
    };
    saveUser(updated);
    if (typeof document !== 'undefined') {
      document.cookie = 'kuizu_session=demo-token; path=/; max-age=86400; SameSite=Lax';
    }
    return { user: updated, message: 'Account created successfully' } as unknown as T;
  }

  // 4. Auth Logout
  if (cleanUrl.includes('/auth/logout') && method === 'POST') {
    if (typeof document !== 'undefined') {
      document.cookie = 'kuizu_session=; path=/; max-age=0; SameSite=Lax';
    }
    return { message: 'Logged out successfully' } as unknown as T;
  }

  // 5. Courses List & Detail
  if (cleanUrl.includes('/courses') && method === 'GET' && !cleanUrl.includes('/lessons')) {
    if (cleanUrl.includes('/courses/') && !cleanUrl.endsWith('/courses/')) {
      return SAMPLE_JAPANESE_COURSE as unknown as T;
    }
    return [SAMPLE_JAPANESE_COURSE] as unknown as T;
  }

  // 6. Complete Lesson
  if (cleanUrl.includes('/lessons/') && cleanUrl.includes('/complete') && method === 'POST') {
    const xpGained = 20;
    const updatedUser = {
      ...mockUser,
      xp: mockUser.xp + xpGained,
    };
    saveUser(updatedUser);

    // Extract lesson id from url: /api/v1/courses/:slug/lessons/:id/complete
    const parts = url.split('/');
    const lessonIdx = parts.indexOf('lessons');
    if (lessonIdx !== -1 && parts[lessonIdx + 1]) {
      saveCompletedLesson(parts[lessonIdx + 1]);
    }

    const result: LessonCompletionResult = {
      success: true,
      xpEarned: xpGained,
      totalXp: updatedUser.xp,
      alreadyCompleted: false,
      message: 'Lesson completed successfully',
    };
    return result as unknown as T;
  }

  // 7. Consume Heart
  if (cleanUrl.includes('/hearts/consume') && method === 'POST') {
    const nextHearts = Math.max(0, mockUser.hearts - 1);
    const updated = { ...mockUser, hearts: nextHearts };
    saveUser(updated);
    return { hearts: nextHearts } as unknown as T;
  }

  // 8. Refill Hearts (Shop purchase)
  if (cleanUrl.includes('/hearts/refill') && method === 'POST') {
    const cost = 350;
    const nextGems = Math.max(0, mockUser.gems - cost);
    const updated = { ...mockUser, hearts: 5, gems: nextGems };
    saveUser(updated);
    return { hearts: 5, gems: nextGems } as unknown as T;
  }

  // 9. Streak Freeze (Shop purchase)
  if (cleanUrl.includes('/streak/freeze') && method === 'POST') {
    const cost = 200;
    const nextGems = Math.max(0, mockUser.gems - cost);
    const nextFreezes = mockUser.streakFreezes + 1;
    const updated = { ...mockUser, gems: nextGems, streakFreezes: nextFreezes };
    saveUser(updated);
    return {
      success: true,
      gemsRemaining: nextGems,
      streakFreezesRemaining: nextFreezes,
      message: 'Streak Freeze activated!',
    } as unknown as T;
  }

  // 10. Double or Nothing Wager (Shop purchase)
  if (cleanUrl.includes('/wager/double') && method === 'POST') {
    const cost = 50;
    const nextGems = Math.max(0, mockUser.gems - cost);
    const updated = { ...mockUser, gems: nextGems };
    saveUser(updated);
    return {
      success: true,
      gemsRemaining: nextGems,
      message: 'Double or Nothing wager placed! Maintain a 7-day streak to win 100 gems.',
    } as unknown as T;
  }

  // 11. User Progress
  if (cleanUrl.includes('/users/me/progress') && method === 'GET') {
    return {
      completedLessons: getCompletedLessons(),
      currentLessonId: 'lesson-2',
    } as unknown as T;
  }

  // 12. Leaderboard
  if (cleanUrl.includes('/leaderboard') && method === 'GET') {
    return SAMPLE_LEADERBOARD as unknown as T;
  }

  // 13. Quizzes List & Detail
  if (cleanUrl.includes('/quizzes') && method === 'GET') {
    if (cleanUrl.includes('/quizzes/') && !cleanUrl.endsWith('/quizzes/')) {
      const parts = url.split('?')[0].split('/');
      const quizId = parts[parts.indexOf('quizzes') + 1];
      const match = SAMPLE_QUIZZES.find((q) => q.id === quizId) || SAMPLE_QUIZZES[0];
      return match as unknown as T;
    }
    return SAMPLE_QUIZZES as unknown as T;
  }

  return null;
}
