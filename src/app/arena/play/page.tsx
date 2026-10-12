'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Zap, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import styles from '../../../features/arena/arena.module.css';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { CountdownTimer } from '../../../features/arena/components/countdown-timer';
import { KahootTile, type KahootColor } from '../../../features/arena/components/kahoot-tile';
import { useGameStore } from '../../../stores/game.store';
import { useArenaSocket } from '../../../features/arena/hooks/use-arena-socket';
import { useAudioStore } from '../../../stores/audio.store';

export default function ArenaPlayerPlayPage() {
  const gameStore = useGameStore();
  const { submitAnswer } = useArenaSocket();
  const { playSuccess, playError, playPop } = useAudioStore();

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [lastResult, setLastResult] = useState<{
    isCorrect: boolean;
    pointsEarned: number;
  } | null>(null);

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

  // Answer Submission Handler
  const handleSelectAnswer = async (choiceId: string) => {
    if (hasSubmitted || !pin) return;
    setHasSubmitted(true);

    const res = await submitAnswer(pin, choiceId);
    if (res.success && res.isCorrect !== undefined) {
      setLastResult({
        isCorrect: res.isCorrect,
        pointsEarned: res.pointsEarned ?? 0,
      });

      if (res.isCorrect) {
        playSuccess();
      } else {
        playError();
      }
    }
  };

  // Reset local submission state when a new question arrives
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(
    currentQuestion?.questionIndex
  );

  if (currentQuestion?.questionIndex !== activeQuestionIndex) {
    setActiveQuestionIndex(currentQuestion?.questionIndex);
    setHasSubmitted(false);
    setLastResult(null);
  }

  // 1. Lobby Waiting State
  if (status === 'idle' || status === 'lobby') {
    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Badge variant="red" size="sm">
              PIN: {pin || '000000'}
            </Badge>
            <span style={{ fontWeight: 800 }}>{nickname || 'Player'}</span>
          </div>
          <Link href="/arena/join" onClick={playPop}>
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />}>
              Exit Room
            </Button>
          </Link>
        </header>

        <main className={styles.lobbyStage}>
          <div style={{ fontSize: '4.5rem' }} className="animate-pop">
            🎮
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '1rem' }}>
            You&apos;re in the Game!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '0.5rem', maxWidth: '480px' }}>
            See your nickname on the host&apos;s big screen? The host will start the quiz shortly.
          </p>

          <div
            style={{
              marginTop: '2.5rem',
              padding: '1.25rem 2rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 800,
            }}
            className="animate-pulse-ring"
          >
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--duo-green)' }} />
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 900, color: 'var(--text-secondary)' }}>
              Q{currentQuestion.questionIndex + 1}/{currentQuestion.totalQuestions}
            </span>
            <span style={{ fontWeight: 800 }}>{nickname}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--duo-orange)', fontWeight: 800 }}>
              <Flame size={18} fill="var(--duo-orange)" />
              <span>{streak}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--duo-yellow)', fontWeight: 900 }}>
              <Zap size={18} fill="var(--duo-yellow)" />
              <span>{score} pts</span>
            </div>
          </div>
        </header>

        <main className={styles.playerControllerStage}>
          {/* Top Timer Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
            <CountdownTimer timeLimit={currentQuestion.timeLimit} size={64} />
          </div>

          {/* If already submitted, show locked-in indicator */}
          {hasSubmitted ? (
            <div className={`${styles.lockedInBanner} animate-pop`}>
              <div style={{ fontSize: '3.5rem' }}>🔒</div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900 }}>
                Answer Locked In!
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
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
          <span style={{ fontWeight: 800 }}>{nickname}</span>
          <span style={{ fontWeight: 900, color: 'var(--duo-yellow)' }}>
            Total: {score} pts
          </span>
        </header>

        <main className={styles.playerControllerStage}>
          {isPlayerCorrect ? (
            <div className={`${styles.feedbackScreenCorrect} animate-pop`}>
              <CheckCircle2 size={64} color="#ffffff" />
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
                CORRECT!
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>
                <Zap size={28} fill="#ffffff" />
                <span>+{pointsEarned} Points</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem' }}>
                <Flame size={22} fill="var(--duo-orange)" color="var(--duo-orange)" />
                <span>Answer Streak Active!</span>
              </div>
            </div>
          ) : (
            <div className={`${styles.feedbackScreenWrong} animate-shake`}>
              <XCircle size={64} color="#ffffff" />
              <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#ffffff' }}>
                INCORRECT
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 700 }}>
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
          <div style={{ fontSize: '4.5rem' }}>
            {myRank === 1 ? '🥇' : myRank === 2 ? '🥈' : myRank === 3 ? '🥉' : '🎖️'}
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '1rem' }}>
            {myRank > 0 ? `You Finished #${myRank} Place!` : 'Match Complete!'}
          </h1>

          <div style={{ margin: '1.5rem 0' }}>
            <Card padding="md" glow="kahoot">
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Final Score</span>
              <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--duo-yellow)', marginTop: '0.25rem' }}>
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
