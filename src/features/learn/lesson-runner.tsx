'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Heart, Zap, Flame, ArrowRight, RotateCcw } from 'lucide-react';
import styles from './lesson-runner.module.css';
import { ProgressBar, Button, Drawer, Modal, Card } from '@/components/ui';
import {
  MultipleChoiceExercise,
  TranslateExercise,
  FillBlankExercise,
  MatchPairsExercise,
  ListenExercise,
} from './exercises';
import { useAuthStore } from '@/stores/auth.store';
import { useAudioStore } from '@/stores/audio.store';
import { fireVictoryConfetti, fireStreakFireworks } from '@/lib/confetti';
import { api } from '@/lib/api';
import { saveCompletedLesson } from '@/mock/mock-handler';
import type { Lesson, LessonCompletionResult } from '@/types/api.types';

interface LessonRunnerProps {
  lesson: Lesson;
  courseSlug: string;
}

type RunnerStatus =
  | 'answering'
  | 'checked_correct'
  | 'checked_wrong'
  | 'out_of_hearts'
  | 'completed';

export function LessonRunner({ lesson, courseSlug }: LessonRunnerProps) {
  const router = useRouter();
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

  const handleCheckAnswer = async () => {
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
  };

  const handleNextExercise = async () => {
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
        setIsSubmitting(false);
        setStatus('completed');
        playFanfare();
        fireVictoryConfetti();
        fireStreakFireworks();
      }
    }
  };

  const handleRestart = () => {
    playPop();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHearts(5);
    updateHearts(5);
    setStatus('answering');
  };

  // Render Exercise component based on type
  const renderExerciseContent = () => {
    const isChecked = status === 'checked_correct' || status === 'checked_wrong';

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

  // 1. Completion Celebration View
  if (status === 'completed') {
    return (
      <div className={styles.runnerWrapper}>
        <div className={styles.completionScreen}>
          <div className={`${styles.crownIcon} animate-pop`}>👑</div>

          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Lesson Complete!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.4rem' }}>
              You mastered <strong style={{ color: 'var(--text-primary)' }}>{lesson.title}</strong>
            </p>
          </div>

          <div className={styles.statsRow}>
            <Card padding="md" glow="duo">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--duo-yellow)', fontWeight: 900, fontSize: '1.5rem' }}>
                <Zap size={24} fill="var(--duo-yellow)" />
                <span>+{lesson.xpReward} XP</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Experience Earned</span>
            </Card>

            <Card padding="md" glow="blue">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--duo-orange)', fontWeight: 900, fontSize: '1.5rem' }}>
                <Flame size={24} fill="var(--duo-orange)" />
                <span>Streak Maintained</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Practice Goal</span>
            </Card>
          </div>

          <Link href="/learn" style={{ width: '100%' }}>
            <Button variant="duo" size="lg" fullWidth leftIcon={<ArrowRight size={20} />}>
              Continue to Quest Path
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Out of Hearts View
  if (status === 'out_of_hearts') {
    return (
      <div className={styles.runnerWrapper}>
        <div className={styles.completionScreen}>
          <div style={{ fontSize: '4rem' }} className="animate-shake">💔</div>

          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--duo-red)' }}>
              Out of Hearts!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
              You ran out of quest hearts. Refill them in the shop or restart practice to keep learning.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%' }}>
            <Link href="/shop" style={{ width: '100%' }}>
              <Button variant="duo" size="lg" fullWidth leftIcon={<Heart size={20} fill="#ffffff" />}>
                Refill Hearts in Shop
              </Button>
            </Link>

            <Button variant="secondary" size="lg" fullWidth onClick={handleRestart} leftIcon={<RotateCcw size={18} />}>
              Try Lesson Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.runnerWrapper}>
      {/* Top Navigation Bar */}
      <header className={styles.topBar}>
        <button
          type="button"
          onClick={() => setIsQuitModalOpen(true)}
          className={styles.closeBtn}
          aria-label="Quit lesson"
          title="Quit lesson"
        >
          <X size={26} />
        </button>

        <div className={styles.progressSlot}>
          <ProgressBar value={progressPercent} max={100} color="duo" size="md" />
        </div>

        <div className={styles.heartsCounter} title="Hearts remaining">
          <Heart size={22} color="var(--duo-red)" fill="var(--duo-red)" className={hearts <= 1 ? 'animate-heart-beat' : undefined} />
          <span>{hearts}</span>
        </div>
      </header>

      {/* Main Exercise Stage */}
      <main className={styles.stageArea}>{renderExerciseContent()}</main>

      {/* Default Bottom Bar (Before checking) */}
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

      {/* Feedback Drawer: Correct State */}
      <Drawer
        isOpen={status === 'checked_correct'}
        status="success"
        headline="Nicely done!"
        subtext="Great job! Your answer matches perfectly."
        action={
          <Button
            variant="duo"
            size="lg"
            isLoading={isSubmitting}
            onClick={handleNextExercise}
            rightIcon={<ArrowRight size={20} />}
          >
            Continue
          </Button>
        }
      />

      {/* Feedback Drawer: Wrong State */}
      <Drawer
        isOpen={status === 'checked_wrong'}
        status="error"
        headline="Correct solution:"
        subtext={currentExercise.answer}
        action={
          <Button
            variant="danger"
            size="lg"
            onClick={handleNextExercise}
            rightIcon={<ArrowRight size={20} />}
          >
            Continue
          </Button>
        }
      />

      {/* Quit Confirmation Modal */}
      <Modal
        isOpen={isQuitModalOpen}
        onClose={() => setIsQuitModalOpen(false)}
        title="Quit Lesson?"
        footer={
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="ghost" size="md" onClick={() => setIsQuitModalOpen(false)}>
              Keep Learning
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={() => {
                setIsQuitModalOpen(false);
                router.push('/learn');
              }}
            >
              Quit Now
            </Button>
          </div>
        }
      >
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Are you sure you want to exit? Your progress in this lesson session will be lost and no XP will be awarded.
        </p>
      </Modal>
    </div>
  );
}
