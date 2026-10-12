import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { LessonRunner } from '../lesson-runner';
import { useAuthStore } from '@/stores/auth.store';
import { renderWithProviders } from '@/test/test-utils';
import type { Lesson } from '@/types/api.types';

const mockLesson: Lesson = {
  id: 'lesson-test-1',
  title: 'Test Greetings Lesson',
  order: 1,
  xpReward: 25,
  exercises: [
    {
      id: 'ex-1',
      type: 'multiple-choice',
      prompt: 'How do you say Hello in Japanese?',
      options: ['Konnichiwa', 'Sayounara'],
      answer: 'Konnichiwa',
    },
    {
      id: 'ex-2',
      type: 'multiple-choice',
      prompt: 'How do you say Thank you in Japanese?',
      options: ['Arigatou', 'Gomen'],
      answer: 'Arigatou',
    },
  ],
};

describe('LessonRunner Component (Quest Engine)', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        id: 'u-1',
        email: 'test@kuizu.test',
        username: 'TestLearner',
        role: 'user',
        xp: 100,
        streak: { count: 5, lastActiveDate: '2026-10-12' },
        streakFreezes: 0,
        hearts: 5,
        gems: 200,
        league: 'Bronze',
      },
    });
  });

  it('renders initial exercise prompt and disabled check answer button', () => {
    renderWithProviders(<LessonRunner lesson={mockLesson} courseSlug="test-course" />);

    expect(screen.getByText('How do you say Hello in Japanese?')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Konnichiwa/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Sayounara/i })).toBeInTheDocument();

    const checkBtn = screen.getByRole('button', { name: /check answer/i });
    expect(checkBtn).toBeDisabled();
  });

  it('selects option, enables check answer, and displays correct drawer feedback', () => {
    renderWithProviders(<LessonRunner lesson={mockLesson} courseSlug="test-course" />);

    // Select correct option
    fireEvent.click(screen.getByRole('radio', { name: /Konnichiwa/i }));

    const checkBtn = screen.getByRole('button', { name: /check answer/i });
    expect(checkBtn).toBeEnabled();

    // Check answer
    fireEvent.click(checkBtn);

    // Correct drawer appears
    expect(screen.getByText('Nicely done!')).toBeInTheDocument();
    expect(screen.getByText('Great job! Your answer matches perfectly.')).toBeInTheDocument();
  });

  it('advances to next exercise when Continue is clicked on correct drawer', () => {
    renderWithProviders(<LessonRunner lesson={mockLesson} courseSlug="test-course" />);

    // Exercise 1
    fireEvent.click(screen.getByRole('radio', { name: /Konnichiwa/i }));
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));

    const continueBtn = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(continueBtn);

    // Exercise 2 prompt is now visible
    expect(screen.getByText('How do you say Thank you in Japanese?')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Arigatou/i })).toBeInTheDocument();
  });

  it('handles wrong answer feedback and decrements hearts count', () => {
    renderWithProviders(<LessonRunner lesson={mockLesson} courseSlug="test-course" />);

    // Select wrong answer
    fireEvent.click(screen.getByRole('radio', { name: /Sayounara/i }));
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));

    // Wrong drawer appears
    expect(screen.getByText('Correct solution:')).toBeInTheDocument();
    expect(screen.getAllByText('Konnichiwa').length).toBeGreaterThanOrEqual(1);

    // Heart count in store decremented from 5 to 4
    expect(useAuthStore.getState().user?.hearts).toBe(4);
  });

  it('shows out of hearts screen when user runs out of hearts', () => {
    // Start with 1 heart
    useAuthStore.setState((state) => ({
      user: state.user ? { ...state.user, hearts: 1 } : null,
    }));

    renderWithProviders(<LessonRunner lesson={mockLesson} courseSlug="test-course" />);

    // Choose wrong answer
    fireEvent.click(screen.getByRole('radio', { name: /Sayounara/i }));
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));

    // Out of Hearts screen appears
    expect(screen.getByText('Out of Hearts!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try lesson again/i })).toBeInTheDocument();
  });

  it('completes lesson on finishing all exercises and awards XP', async () => {
    renderWithProviders(<LessonRunner lesson={mockLesson} courseSlug="test-course" />);

    // Exercise 1: Correct
    fireEvent.click(screen.getByRole('radio', { name: /Konnichiwa/i }));
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Exercise 2: Correct
    fireEvent.click(screen.getByRole('radio', { name: /Arigatou/i }));
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Lesson Complete View
    await waitFor(() => {
      expect(screen.getByText('Lesson Complete!')).toBeInTheDocument();
      expect(screen.getByText(/\+25 XP/)).toBeInTheDocument();
    });

    // XP in store increased from 100 + 25 = 125
    expect(useAuthStore.getState().user?.xp).toBe(125);
  });

  it('opens and closes quit confirmation modal', () => {
    renderWithProviders(<LessonRunner lesson={mockLesson} courseSlug="test-course" />);

    const closeBtn = screen.getByRole('button', { name: /quit lesson/i });
    fireEvent.click(closeBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Quit Lesson?')).toBeInTheDocument();

    const keepLearningBtn = screen.getByRole('button', { name: /keep learning/i });
    fireEvent.click(keepLearningBtn);

    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
