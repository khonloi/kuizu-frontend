import { describe, it, expect } from 'vitest';
import { queryKeys } from '../query-keys';

describe('Query Key Factory (queryKeys)', () => {
  it('generates consistent auth query keys', () => {
    expect(queryKeys.auth.all).toEqual(['auth']);
    expect(queryKeys.auth.me()).toEqual(['auth', 'me']);
  });

  it('generates hierarchical courses query keys', () => {
    expect(queryKeys.courses.all).toEqual(['courses']);
    expect(queryKeys.courses.list()).toEqual(['courses', 'list']);
    expect(queryKeys.courses.detail('japanese-foundations')).toEqual([
      'courses',
      'detail',
      'japanese-foundations',
    ]);
    expect(queryKeys.courses.lesson('japanese-foundations', 'lesson-1')).toEqual([
      'courses',
      'detail',
      'japanese-foundations',
      'lessons',
      'lesson-1',
    ]);
    expect(queryKeys.courses.progress()).toEqual(['courses', 'progress']);
  });

  it('generates parameterized quizzes query keys', () => {
    expect(queryKeys.quizzes.all).toEqual(['quizzes']);
    expect(queryKeys.quizzes.list()).toEqual(['quizzes', 'list', {}]);
    expect(queryKeys.quizzes.list({ page: 1, limit: 10 })).toEqual([
      'quizzes',
      'list',
      { page: 1, limit: 10 },
    ]);
    expect(queryKeys.quizzes.detail('quiz-123')).toEqual(['quizzes', 'detail', 'quiz-123']);
  });

  it('generates leaderboard and gamification query keys', () => {
    expect(queryKeys.leaderboard.all).toEqual(['leaderboard']);
    expect(queryKeys.leaderboard.current()).toEqual(['leaderboard', 'current']);
    expect(queryKeys.gamification.all).toEqual(['gamification']);
    expect(queryKeys.gamification.inventory()).toEqual(['gamification', 'inventory']);
  });
});
