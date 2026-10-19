'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Drawer, Button } from '@/components/ui';
import type { RunnerStatus } from '../../hooks/use-lesson-progress';

interface LessonFeedbackDrawerProps {
  status: RunnerStatus;
  correctAnswer: string;
  isSubmitting: boolean;
  onContinue: () => void;
}

export function LessonFeedbackDrawer({
  status,
  correctAnswer,
  isSubmitting,
  onContinue,
}: LessonFeedbackDrawerProps) {
  if (status === 'checked_correct') {
    return (
      <Drawer
        isOpen={true}
        status="success"
        headline="Nicely done!"
        subtext="Great job! Your answer matches perfectly."
        action={
          <Button
            variant="duo"
            size="lg"
            isLoading={isSubmitting}
            onClick={onContinue}
            rightIcon={<ArrowRight size={20} />}
          >
            Continue
          </Button>
        }
      />
    );
  }

  if (status === 'checked_wrong') {
    return (
      <Drawer
        isOpen={true}
        status="error"
        headline="Correct solution:"
        subtext={correctAnswer}
        action={
          <Button
            variant="danger"
            size="lg"
            onClick={onContinue}
            rightIcon={<ArrowRight size={20} />}
          >
            Continue
          </Button>
        }
      />
    );
  }

  return null;
}
