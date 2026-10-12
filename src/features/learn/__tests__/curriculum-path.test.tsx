import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurriculumPath } from '../components/curriculum-path';
import type { Course } from '@/types/api.types';

const mockCourse: Course = {
  id: 'c-test',
  title: 'Japanese Foundations',
  slug: 'japanese-foundations',
  isPublished: true,
  units: [
    {
      id: 'u-1',
      title: 'Unit 1: Essential Greetings',
      description: 'Daily greetings and polite expressions',
      color: '#58cc02',
      order: 1,
      lessons: [
        {
          id: 'l-1',
          title: 'Daily Greetings',
          order: 1,
          xpReward: 20,
          exercises: [],
        },
        {
          id: 'l-2',
          title: 'Polite Expressions',
          order: 2,
          xpReward: 25,
          exercises: [],
        },
        {
          id: 'l-3',
          title: 'Honorifics',
          order: 3,
          xpReward: 30,
          exercises: [],
        },
      ],
    },
  ],
};

describe('CurriculumPath Component (Duolingo Sine-Wave Path)', () => {
  it('renders unit header and progress details', () => {
    render(<CurriculumPath course={mockCourse} completedLessonIds={[]} />);

    expect(screen.getByText('Unit 1: Essential Greetings')).toBeInTheDocument();
    expect(screen.getByText('Daily greetings and polite expressions')).toBeInTheDocument();
    expect(screen.getByText('0 / 3 Done')).toBeInTheDocument();
  });

  it('marks first lesson as active with START badge when no lessons are completed', () => {
    render(<CurriculumPath course={mockCourse} completedLessonIds={[]} />);

    // Lesson 1 is active
    expect(screen.getByRole('status')).toHaveTextContent('START');
    expect(screen.getByRole('link', { name: /Start Daily Greetings/i })).toBeInTheDocument();

    // Lessons 2 and 3 are locked
    expect(screen.getByLabelText('Polite Expressions is locked')).toBeInTheDocument();
    expect(screen.getByLabelText('Honorifics is locked')).toBeInTheDocument();
  });

  it('marks completed lesson with crown and enables next lesson as active', () => {
    render(<CurriculumPath course={mockCourse} completedLessonIds={['l-1']} />);

    // Lesson 1 is completed
    expect(screen.getByLabelText(/Practice Daily Greetings again, completed/i)).toBeInTheDocument();
    expect(screen.getByText('👑')).toBeInTheDocument();

    // Lesson 2 is now active
    expect(screen.getByRole('status')).toHaveTextContent('START');
    expect(screen.getByRole('link', { name: /Start Polite Expressions/i })).toBeInTheDocument();

    // Lesson 3 remains locked
    expect(screen.getByLabelText('Honorifics is locked')).toBeInTheDocument();
  });

  it('displays Unit Mastered status when all lessons are completed', () => {
    render(<CurriculumPath course={mockCourse} completedLessonIds={['l-1', 'l-2', 'l-3']} />);

    expect(screen.getByText('3 / 3 Done')).toBeInTheDocument();
    expect(screen.getByText('Unit Mastered!')).toBeInTheDocument();
    expect(screen.getByText('+50 Bonus Gems Claimed')).toBeInTheDocument();
  });
});
