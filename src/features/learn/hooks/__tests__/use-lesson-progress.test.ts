import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLessonProgress } from '../use-lesson-progress';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import type { Lesson } from '@/types/api.types';

// Mock TanStack query client
const mockInvalidateQueries = vi.fn();
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: mockInvalidateQueries,
  }),
}));

// Mock confetti
vi.mock('@/lib/confetti', () => ({
  fireVictoryConfetti: vi.fn(),
  fireStreakFireworks: vi.fn(),
}));

const mockLesson: Lesson = {
  id: 'lesson-1',
  title: 'Basic Greetings',
  order: 1,
  xpReward: 20,
  exercises: [
    {
      id: 'ex-1',
      type: 'multiple-choice',
      prompt: 'How do you say "Hello"?',
      answer: 'Konnichiwa',
      options: ['Konnichiwa', 'Sayonara', 'Arigato', 'Oyasumi'],
    },
    {
      id: 'ex-2',
      type: 'multiple-choice',
      prompt: 'How do you say "Thank you"?',
      answer: 'Arigato',
      options: ['Konnichiwa', 'Sayonara', 'Arigato', 'Oyasumi'],
    },
  ],
};

describe('useLessonProgress Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: {
        id: 'u-1',
        email: 'learner@example.com',
        username: 'TestLearner',
        role: 'user',
        gems: 100,
        hearts: 5,
        xp: 100,
        streak: { count: 3, lastActiveDate: null },
        streakFreezes: 0,
        league: 'Bronze',
      },
      isAuthenticated: true,
      updateHearts: vi.fn(),
      updateXp: vi.fn(),
    });
  });

  it('initializes with default answering state and 0% progress', () => {
    const { result } = renderHook(() =>
      useLessonProgress({ lesson: mockLesson, courseSlug: 'japanese' })
    );

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentExercise.id).toBe('ex-1');
    expect(result.current.status).toBe('answering');
    expect(result.current.hearts).toBe(5);
    expect(result.current.progressPercent).toBe(0);
    expect(result.current.selectedAnswer).toBeNull();
  });

  it('evaluates correct answer and updates status to checked_correct', async () => {
    const playSuccessSpy = vi.spyOn(useAudioStore.getState(), 'playSuccess');
    const { result } = renderHook(() =>
      useLessonProgress({ lesson: mockLesson, courseSlug: 'japanese' })
    );

    act(() => {
      result.current.setSelectedAnswer('Konnichiwa');
    });

    await act(async () => {
      await result.current.handleCheckAnswer();
    });

    expect(result.current.status).toBe('checked_correct');
    expect(playSuccessSpy).toHaveBeenCalled();
  });

  it('evaluates wrong answer, decrements hearts, and updates status to checked_wrong', async () => {
    const playErrorSpy = vi.spyOn(useAudioStore.getState(), 'playError');
    const updateHeartsSpy = vi.spyOn(useAuthStore.getState(), 'updateHearts');
    const { result } = renderHook(() =>
      useLessonProgress({ lesson: mockLesson, courseSlug: 'japanese' })
    );

    act(() => {
      result.current.setSelectedAnswer('Sayonara');
    });

    await act(async () => {
      await result.current.handleCheckAnswer();
    });

    expect(result.current.status).toBe('checked_wrong');
    expect(result.current.hearts).toBe(4);
    expect(updateHeartsSpy).toHaveBeenCalledWith(4);
    expect(playErrorSpy).toHaveBeenCalled();
  });

  it('sets status to out_of_hearts when hearts reach 0', async () => {
    useAuthStore.setState({
      user: {
        id: 'u-1',
        email: 'learner@example.com',
        username: 'TestLearner',
        role: 'user',
        gems: 100,
        hearts: 1,
        xp: 100,
        streak: { count: 3, lastActiveDate: null },
        streakFreezes: 0,
        league: 'Bronze',
      },
    });

    const { result } = renderHook(() =>
      useLessonProgress({ lesson: mockLesson, courseSlug: 'japanese' })
    );

    act(() => {
      result.current.setSelectedAnswer('Sayonara');
    });

    await act(async () => {
      await result.current.handleCheckAnswer();
    });

    expect(result.current.status).toBe('out_of_hearts');
    expect(result.current.hearts).toBe(0);
  });

  it('advances to next exercise on handleNextExercise', async () => {
    const { result } = renderHook(() =>
      useLessonProgress({ lesson: mockLesson, courseSlug: 'japanese' })
    );

    act(() => {
      result.current.setSelectedAnswer('Konnichiwa');
    });

    await act(async () => {
      await result.current.handleCheckAnswer();
    });

    await act(async () => {
      await result.current.handleNextExercise();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentExercise.id).toBe('ex-2');
    expect(result.current.status).toBe('answering');
    expect(result.current.selectedAnswer).toBeNull();
  });

  it('completes lesson on final exercise and awards XP', async () => {
    const updateXpSpy = vi.spyOn(useAuthStore.getState(), 'updateXp');
    const { result } = renderHook(() =>
      useLessonProgress({ lesson: mockLesson, courseSlug: 'japanese' })
    );

    // Answer ex-1
    act(() => {
      result.current.setSelectedAnswer('Konnichiwa');
    });
    await act(async () => {
      await result.current.handleCheckAnswer();
      await result.current.handleNextExercise();
    });

    // Answer ex-2 (final)
    act(() => {
      result.current.setSelectedAnswer('Arigato');
    });
    await act(async () => {
      await result.current.handleCheckAnswer();
      await result.current.handleNextExercise();
    });

    expect(result.current.status).toBe('completed');
    expect(updateXpSpy).toHaveBeenCalledWith(20);
    expect(mockInvalidateQueries).toHaveBeenCalled();
  });

  it('resets progress on restart', async () => {
    const { result } = renderHook(() =>
      useLessonProgress({ lesson: mockLesson, courseSlug: 'japanese' })
    );

    act(() => {
      result.current.setSelectedAnswer('Sayonara');
    });

    await act(async () => {
      await result.current.handleCheckAnswer();
    });

    act(() => {
      result.current.handleRestart();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.hearts).toBe(5);
    expect(result.current.status).toBe('answering');
    expect(result.current.selectedAnswer).toBeNull();
  });
});
