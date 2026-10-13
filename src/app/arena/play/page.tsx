'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Zap, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import styles from '@/features/arena/arena.module.css';
import { Card, Button, Badge } from '@/components/ui';
import { CountdownTimer } from '@/features/arena/components/countdown-timer';
import { KahootTile, type KahootColor } from '@/features/arena/components/kahoot-tile';
import { useGameStore } from '@/stores/game.store';
import { useArenaSocket } from '@/features/arena/hooks/use-arena-socket';
import { useAudioStore } from '@/stores/audio.store';

export default function ArenaPlayerPlayPage() {
  const gameStore = useGameStore();
  const { submitAnswer } = useArenaSocket();
  const { playSuccess, playError, playPop } = useAudioStore();

  const [submittedQuestionIndex, setSubmittedQuestionIndex] = useState<number | null>(null);
  const [resultByQuestion, setResultByQuestion] = useState<
    Record<number, { isCorrect: boolean; pointsEarned: number }>
  >({});

  const {
    pin,
    nickname,
    status,
    currentQuestion,
    selectedChoiceId,
    score,
    streak,
    correctChoiceId,
    podium,
  } = gameStore;

  const currentQIndex = currentQuestion?.questionIndex;
  const hasSubmitted =
    currentQIndex !== undefined && submittedQuestionIndex === currentQIndex;
  const lastResult =
    currentQIndex !== undefined ? resultByQuestion[currentQIndex] ?? null : null;

  // Answer Submission Handler
  const handleSelectAnswer = async (choiceId: string) => {
    if (hasSubmitted || !pin || currentQIndex === undefined) return;
    setSubmittedQuestionIndex(currentQIndex);
    playPop();

    // Haptic feedback for tactile handheld feel
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(40);
      } catch {
        // Ignore vibration errors if unsupported or denied
      }
    }

    const res = await submitAnswer(pin, choiceId);
    if (res.success && res.isCorrect !== undefined) {
      setResultByQuestion((prev) => ({
        ...prev,
        [currentQIndex]: {
          isCorrect: res.isCorrect!,
          pointsEarned: res.pointsEarned ?? 0,
        },
      }));

      if (res.isCorrect) {
        playSuccess();
      } else {
        playError();
      }
    }
  };

  // 1. Lobby Waiting State
  if (status === 'idle' || status === 'lobby') {
    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <div className={styles.flexRow}>
            <Badge variant="red" size="sm">
              PIN: {pin || '000000'}
            </Badge>
            <span className={styles.fontWeight800}>{nickname || 'Player'}</span>
          </div>
          <Link href="/arena/join" onClick={playPop}>
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />}>
              Exit Room
            </Button>
          </Link>
        </header>

        <main className={styles.lobbyStage}>
          <div className={`${styles.playerBigEmoji} animate-pop`}>
            🎮
          </div>
          <h1 className={styles.playerTitle}>
            You&apos;re in the Game!
          </h1>
          <p className={styles.playerSubtitle}>
            See your nickname on the host&apos;s big screen? The host will start the quiz shortly.
          </p>

          <div className={`${styles.waitingPill} animate-pulse-ring`}>
            <span className={styles.pulsingDot} />
            <span>Ready & Waiting for Host to Start...</span>
          </div>
        </main>
      </div>
    );
  }

  // 2. Active Question Stage
  if (status === 'question' && currentQuestion) {
    return (
      <div className={styles.arenaRoot}>
        {/* Top Mini Bar */}
        <header className={styles.arenaHeader}>
          <div className={styles.flexRow}>
            <span className={`${styles.fontWeight900} ${styles.textSecondary}`}>
              Q{currentQuestion.questionIndex + 1}/{currentQuestion.totalQuestions}
            </span>
            <span className={styles.fontWeight800}>{nickname}</span>
          </div>

          <div className={styles.flexRowLg}>
            <div className={styles.statItemOrange}>
              <Flame size={18} fill="var(--duo-orange)" />
              <span>{streak}</span>
            </div>
            <div className={styles.statItemYellow}>
              <Zap size={18} fill="var(--duo-yellow)" />
              <span>{score} pts</span>
            </div>
          </div>
        </header>

        <main className={styles.playerControllerStage}>
          {/* Top Timer Indicator */}
          <div className={styles.timerCenter}>
            <CountdownTimer timeLimit={currentQuestion.timeLimit} size={64} />
          </div>

          {/* If already submitted, show locked-in indicator */}
          {hasSubmitted ? (
            <div className={`${styles.lockedInBanner} animate-pop`}>
              <div className={styles.lockEmoji}>🔒</div>
              <h2 className={styles.lockedInTitle}>
                Answer Locked In!
              </h2>
              <p className={styles.lockedInSubtitle}>
                Look up at the screen to see how other competitors answered.
              </p>
            </div>
          ) : (
            /* 4-Tile Handheld Gamepad */
            <div className={styles.playerPadGrid}>
              {currentQuestion.choices.map((choice) => (
                <KahootTile
                  key={choice.id}
                  color={choice.color as KahootColor}
                  label={choice.text}
                  onClick={() => handleSelectAnswer(choice.id)}
                  disabled={hasSubmitted}
                  isSelected={selectedChoiceId === choice.id}
                  mode="player"
                />
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  // 3. Question Reveal Stage
  if (status === 'reveal') {
    const isPlayerCorrect =
      lastResult?.isCorrect ?? (selectedChoiceId === correctChoiceId);
    const pointsEarned = lastResult?.pointsEarned ?? (isPlayerCorrect ? 940 : 0);

    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <span className={styles.fontWeight800}>{nickname}</span>
          <span className={styles.totalScoreText}>
            Total: {score} pts
          </span>
        </header>

        <main className={styles.playerControllerStage}>
          {isPlayerCorrect ? (
            <div className={`${styles.feedbackScreenCorrect} animate-pop`}>
              <CheckCircle2 size={64} color="#ffffff" />
              <h1 className={styles.feedbackTitle}>
                CORRECT!
              </h1>
              <div className={styles.pointsEarnedRow}>
                <Zap size={28} fill="#ffffff" />
                <span>+{pointsEarned} Points</span>
              </div>
              <div className={styles.streakRow}>
                <Flame size={22} fill="var(--duo-orange)" color="var(--duo-orange)" />
                <span>Answer Streak Active!</span>
              </div>
            </div>
          ) : (
            <div className={`${styles.feedbackScreenWrong} animate-shake`}>
              <XCircle size={64} color="#ffffff" />
              <h1 className={styles.wrongTitle}>
                INCORRECT
              </h1>
              <p className={styles.wrongSubtitle}>
                Don&apos;t give up! More questions coming up next.
              </p>
            </div>
          )}
        </main>
      </div>
    );
  }

  // 4. Game Ended Stage (Podium Placement)
  if (status === 'ended') {
    const myRank = podium.findIndex((p) => p.nickname === nickname) + 1;

    return (
      <div className={styles.arenaRoot}>
        <main className={styles.lobbyStage}>
          <div className={styles.podiumBigMedal}>
            {myRank === 1 ? '🥇' : myRank === 2 ? '🥈' : myRank === 3 ? '🥉' : '🎖️'}
          </div>

          <h1 className={styles.playerTitle}>
            {myRank > 0 ? `You Finished #${myRank} Place!` : 'Match Complete!'}
          </h1>

          <div className={styles.scoreCardWrapper}>
            <Card padding="md" glow="kahoot">
              <span className={styles.scoreCardLabel}>Final Score</span>
              <div className={styles.finalScoreValue}>
                {score.toLocaleString()} Points
              </div>
            </Card>
          </div>

          <Link href="/learn" onClick={playPop}>
            <Button variant="kahoot" size="lg">
              Return to Learning Hub
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return null;
}
