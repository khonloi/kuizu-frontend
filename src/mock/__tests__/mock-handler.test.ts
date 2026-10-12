import { describe, it, expect } from 'vitest';
import { handleMockApiRequest } from '../mock-handler';
import type { User, Course } from '@/types/api.types';
import type { LeaderboardEntry } from '@/types/gamification.types';

describe('Offline Mock API Handler', () => {
  it('returns default active learner profile for /api/v1/users/me', async () => {
    const user = await handleMockApiRequest<User>('/api/v1/users/me', 'GET');

    expect(user).toBeDefined();
    expect(user?.username).toBe('Alex Kenji');
    expect(user?.league).toBe('Diamond');
    expect(user?.hearts).toBe(5);
    expect(user?.gems).toBe(850);
    expect(user?.streak.count).toBe(7);
  });

  it('handles heart consumption on error', async () => {
    const res = await handleMockApiRequest<{ hearts: number }>(
      '/api/v1/users/me/hearts/consume',
      'POST'
    );

    expect(res).toBeDefined();
    expect(res?.hearts).toBe(4);
  });

  it('handles heart refill with gem deduction', async () => {
    const res = await handleMockApiRequest<{ hearts: number; gems: number }>(
      '/api/v1/users/me/hearts/refill',
      'POST'
    );

    expect(res).toBeDefined();
    expect(res?.hearts).toBe(5);
    expect(res?.gems).toBeLessThanOrEqual(500); // 850 - 350 = 500
  });

  it('returns sample courses on /api/v1/courses', async () => {
    const courses = await handleMockApiRequest<Course[]>('/api/v1/courses', 'GET');

    expect(courses).toBeDefined();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses?.length).toBeGreaterThan(0);
    expect(courses?.[0].slug).toBe('japanese-foundations');
  });

  it('returns weekly league leaderboard on /api/v1/leaderboard', async () => {
    const leaderboard = await handleMockApiRequest<LeaderboardEntry[]>(
      '/api/v1/leaderboard',
      'GET'
    );

    expect(leaderboard).toBeDefined();
    expect(leaderboard?.length).toBe(8);
    expect(leaderboard?.[0].rank).toBe(1);
  });
});
