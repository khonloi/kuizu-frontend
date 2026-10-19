'use client';

import React from 'react';
import styles from './lesson-runner.module.css';
import { Button } from '@/components/ui';
import {
  MultipleChoiceExercise,
  TranslateExercise,
  FillBlankExercise,
  MatchPairsExercise,
  ListenExercise,
} from './exercises';
import { useLessonProgress } from './hooks/use-lesson-progress';
import {
  LessonTopBar,
  LessonFeedbackDrawer,
  LessonCompletionScreen,
  LessonOutOfHeartsScreen,
  LessonQuitModal,
} from './components/runner';
import type { Lesson } from '@/types/api.types';

export interface LessonRunnerProps {
  lesson: Lesson;
  courseSlug: string;
}

export function LessonRunner({ lesson, courseSlug }: LessonRunnerProps) {
  const {
    currentExercise,
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
  } = useLessonProgress({ lesson, courseSlug });

  // 1. Completion Celebration View
  if (status === 'completed') {
    return <LessonCompletionScreen lesson={lesson} />;
  }

  // 2. Out of Hearts View
  if (status === 'out_of_hearts') {
    return <LessonOutOfHeartsScreen onRestart={handleRestart} />;
  }

  // Render Exercise component based on type
  const isChecked = status === 'checked_correct' || status === 'checked_wrong';

  const renderExerciseContent = () => {
    switch (currentExercise.type) {
      case 'translate':
        return (
          <TranslateExercise
            exercise={currentExercise}
            onSelect={setSelectedAnswer}
            disabled={isChecked}
          />
        );
      case 'fill-blank':
        return (
          <FillBlankExercise
            exercise={currentExercise}
            selectedAnswer={selectedAnswer}
            onSelect={setSelectedAnswer}
            disabled={isChecked}
          />
        );
      case 'match-pairs':
        return (
          <MatchPairsExercise
            exercise={currentExercise}
            onSelect={setSelectedAnswer}
            disabled={isChecked}
          />
        );
      case 'listen':
        return (
          <ListenExercise
            exercise={currentExercise}
            onSelect={setSelectedAnswer}
            disabled={isChecked}
          />
        );
      case 'multiple-choice':
      default:
        return (
          <MultipleChoiceExercise
            exercise={currentExercise}
            selectedAnswer={selectedAnswer}
            onSelect={setSelectedAnswer}
            disabled={isChecked}
          />
        );
    }
  };

  return (
    <div className={styles.runnerWrapper}>
      <LessonTopBar
        progressPercent={progressPercent}
        hearts={hearts}
        onQuitClick={() => setIsQuitModalOpen(true)}
      />

      <main className={styles.stageArea}>{renderExerciseContent()}</main>

      {status === 'answering' && (
        <footer className={styles.bottomBar}>
          <div className={styles.bottomContainer}>
            <Button
              variant="duo"
              size="lg"
              disabled={!selectedAnswer}
              onClick={handleCheckAnswer}
            >
              Check Answer
            </Button>
          </div>
        </footer>
      )}

      <LessonFeedbackDrawer
        status={status}
        correctAnswer={currentExercise.answer}
        isSubmitting={isSubmitting}
        onContinue={handleNextExercise}
      />

      <LessonQuitModal
        isOpen={isQuitModalOpen}
        onClose={() => setIsQuitModalOpen(false)}
      />
    </div>
  );
}
