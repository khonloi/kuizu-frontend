'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti, fireStreakFireworks } from '@/lib/confetti';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { saveCompletedLesson } from '@/mock/mock-handler';
import type { Lesson, LessonCompletionResult } from '@/types/api.types';

export type RunnerStatus =
  | 'answering'
  | 'checked_correct'
  | 'checked_wrong'
  | 'out_of_hearts'
  | 'completed';

export interface UseLessonProgressOptions {
  lesson: Lesson;
  courseSlug: string;
}

export function useLessonProgress({ lesson, courseSlug }: UseLessonProgressOptions) {
  const queryClient = useQueryClient();
  const { user, updateHearts, updateXp } = useAuthStore();
  const { playSuccess, playError, playPop, playFanfare } = useAudioStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [status, setStatus] = useState<RunnerStatus>('answering');
  const [hearts, setHearts] = useState(user?.hearts ?? 5);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalExercises = lesson.exercises.length;
  const currentExercise = lesson.exercises[currentIndex];
  const progressPercent = Math.round((currentIndex / totalExercises) * 100);

  const handleCheckAnswer = useCallback(async () => {
    if (!selectedAnswer || status !== 'answering') return;

    const isMatch =
      selectedAnswer.trim().toLowerCase() ===
      currentExercise.answer.trim().toLowerCase();

    if (isMatch) {
      playSuccess();
      setStatus('checked_correct');
    } else {
      playError();
      const nextHearts = Math.max(0, hearts - 1);
      setHearts(nextHearts);
      updateHearts(nextHearts);

      // Async backend notification
      void api.post('/api/v1/users/me/hearts/consume').catch(() => {});

      if (nextHearts <= 0) {
        setStatus('out_of_hearts');
      } else {
        setStatus('checked_wrong');
      }
    }
  }, [selectedAnswer, status, currentExercise, playSuccess, playError, hearts, updateHearts]);

  const handleNextExercise = useCallback(async () => {
    playPop();
    setSelectedAnswer(null);

    if (currentIndex + 1 < totalExercises) {
      setCurrentIndex((prev) => prev + 1);
      setStatus('answering');
    } else {
      // Completed all exercises
      setIsSubmitting(true);
      try {
        await api.post<LessonCompletionResult>(
          `/api/v1/courses/${courseSlug}/lessons/${lesson.id}/complete`,
        );
      } catch {
        // Fallback for offline / demo mode
      } finally {
        saveCompletedLesson(lesson.id);
        updateXp(lesson.xpReward);
        void queryClient.invalidateQueries({ queryKey: ['user', 'completed-lessons'] });
        void queryClient.invalidateQueries({ queryKey: ['courses'] });
        setIsSubmitting(false);
        setStatus('completed');
        playFanfare();
        fireVictoryConfetti();
        fireStreakFireworks();
      }
    }
  }, [
    playPop,
    currentIndex,
    totalExercises,
    courseSlug,
    lesson.id,
    lesson.xpReward,
    updateXp,
    queryClient,
    playFanfare,
  ]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Keys 1-4 for option selection when answering
      if (status === 'answering' && currentExercise?.options) {
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= currentExercise.options.length) {
          e.preventDefault();
          playPop();
          setSelectedAnswer(currentExercise.options[num - 1]);
          return;
        }
      }

      // Enter key: check or continue
      if (e.key === 'Enter') {
        e.preventDefault();
        if (status === 'answering' && selectedAnswer) {
          void handleCheckAnswer();
        } else if (status === 'checked_correct' || status === 'checked_wrong') {
          void handleNextExercise();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    status,
    selectedAnswer,
    currentExercise,
    handleCheckAnswer,
    handleNextExercise,
    playPop,
  ]);

  const handleRestart = () => {
    playPop();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHearts(5);
    updateHearts(5);
    setStatus('answering');
  };

  return {
    currentIndex,
    currentExercise,
    totalExercises,
    progressPercent,
    selectedAnswer,
    setSelectedAnswer,
    status,
    hearts,
    isQuitModalOpen,
    setIsQuitModalOpen,
    isSubmitting,
    handleCheckAnswer,
    handleNextExercise,
    handleRestart,
  };
}
