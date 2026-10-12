'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Users,
  Play,
  ArrowRight,
  Eye,
  Tv,
  RotateCcw,
  ArrowLeft,
  Maximize,
  Minimize,
} from 'lucide-react';
import styles from '@/features/arena/arena.module.css';
import { Card, Button, Badge } from '@/components/ui';
import { CountdownTimer } from '@/features/arena/components/countdown-timer';
import { KahootTile, type KahootColor } from '@/features/arena/components/kahoot-tile';
import { AnswerBarChart } from '@/features/arena/components/answer-bar-chart';
import { PodiumCeremony } from '@/features/arena/components/podium-ceremony';
import { QRCodeSvg } from '@/features/arena/components/qr-code';
import { useGameStore } from '@/stores/game.store';
import { useArenaSocket } from '@/features/arena/hooks/use-arena-socket';
import { useAudioStore } from '@/stores/audio.store';
import { SAMPLE_QUIZZES, type MockQuiz } from '@/mock/sample-quizzes';

export default function ArenaHostPage() {
  const gameStore = useGameStore();
  const {
    createGame,
    startGame,
    revealAnswer,
    nextQuestion,
    disconnect,
  } = useArenaSocket();
  const { playPop, playSuccess } = useAudioStore();

  const [selectedQuiz, setSelectedQuiz] = useState<MockQuiz>(SAMPLE_QUIZZES[0]);
  const [isCreating, setIsCreating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const {
    pin,
    quizTitle,
    status,
    players,
    currentQuestion,
    answeredCount,
    totalPlayers,
    correctChoiceId,
    answersDistribution,
    podium,
    fullLeaderboard,
  } = gameStore;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Soft audio pop on player join
  const prevPlayerCountRef = useRef(players.length);
  useEffect(() => {
    if (players.length > prevPlayerCountRef.current) {
      playPop();
    }
    prevPlayerCountRef.current = players.length;
  }, [players.length, playPop]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore fullscreen rejection if denied by user browser
    }
  };

  // 1. Host Create Room Handler
  const handleCreateRoom = async (quiz: MockQuiz) => {
    setSelectedQuiz(quiz);
    setIsCreating(true);
    playPop();

    await createGame(quiz.id);
    setIsCreating(false);
  };

  // 2. Host Start Game
  const handleStart = async () => {
    playSuccess();
    await startGame();
  };

  // 3. Host Reveal Answer
  const handleReveal = async () => {
    playPop();
    await revealAnswer();
  };

  // 4. Host Next Question / Finish
  const handleNext = async () => {
    playPop();
    await nextQuestion();
  };

  const joinUrl = origin ? `${origin}/arena/join?pin=${pin}` : `/arena/join?pin=${pin}`;

  // ==================== SCREEN 0: SELECT QUIZ TO HOST ====================
  if (status === 'idle') {
    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Badge variant="red" size="md" icon={<Tv size={18} />}>
              PROJECTOR BIG-SCREEN MODE
            </Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFullscreen}
              leftIcon={isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              title="Toggle Projector Fullscreen"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Projector Mode'}
            </Button>
            <Link href="/learn" onClick={playPop}>
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />}>
                Exit to Learn
              </Button>
            </Link>
          </div>
        </header>

        <main style={{ maxWidth: '960px', margin: '3rem auto', padding: '0 1.5rem', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Badge variant="yellow" size="sm">
              HOST A LIVE BATTLE
            </Badge>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, marginTop: '0.5rem', letterSpacing: '-0.03em' }}>
              Select Quiz for Multiplayer Arena
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              Choose a competitive deck to host on your classroom projector or shared screen.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {SAMPLE_QUIZZES.map((quiz) => (
              <Card
                key={quiz.id}
                padding="lg"
                glow="kahoot"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{quiz.icon}</div>
                  <Badge variant="blue" size="sm">
                    {quiz.category} • {quiz.questions.length} Questions
                  </Badge>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.75rem' }}>
                    {quiz.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.4rem', lineHeight: 1.5 }}>
                    {quiz.description}
                  </p>
                </div>

                <Button
                  variant="kahoot"
                  size="lg"
                  fullWidth
                  isLoading={isCreating && selectedQuiz.id === quiz.id}
                  onClick={() => handleCreateRoom(quiz)}
                  leftIcon={<Play size={20} />}
                >
                  Create Live Room
                </Button>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ==================== SCREEN 1: LOBBY MODE ====================
  if (status === 'lobby') {
    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Badge variant="red" size="md">
              {quizTitle || 'Arena Quiz'}
            </Badge>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>
              Join at <strong>/arena/join</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFullscreen}
              leftIcon={isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              title="Toggle Projector Fullscreen"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
            <Button variant="ghost" size="sm" onClick={disconnect} leftIcon={<ArrowLeft size={16} />}>
              End Session
            </Button>
          </div>
        </header>

        <main className={styles.lobbyStage}>
          {/* Giant PIN & QR Code Display */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                Game Room PIN
              </span>
              <div style={{ fontSize: '5.5rem', fontWeight: 900, letterSpacing: '0.15em', color: '#ffffff', margin: '0.25rem 0', textShadow: '0 4px 20px rgba(255,255,255,0.2)' }}>
                {pin}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                <Badge variant="duo" size="md" icon={<Users size={16} />}>
                  {players.length} Players Connected
                </Badge>
              </div>
            </div>

            {pin && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', padding: '1.25rem', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <QRCodeSvg value={joinUrl} size={140} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                  Scan with Camera to Join
                </span>
              </div>
            )}
          </div>

          {/* Connected Players Grid */}
          <div className={styles.playerGrid}>
            {players.length === 0 ? (
              <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 700 }}>
                Waiting for players to join with PIN: {pin}...
              </span>
            ) : (
              players.map((p) => (
                <div key={p.socketId || p.nickname} className={styles.playerTag}>
                  <span>{p.nickname}</span>
                </div>
              ))
            )}
          </div>

          {/* Start Button */}
          <Button
            variant="kahoot"
            size="lg"
            onClick={handleStart}
            leftIcon={<Play size={22} />}
            style={{ minWidth: '240px', fontSize: '1.2rem', padding: '1.1rem 2.5rem' }}
          >
            Start Game ({players.length} ready)
          </Button>
        </main>
      </div>
    );
  }

  // ==================== SCREEN 2: QUESTION MODE ====================
  if (status === 'question' && currentQuestion) {
    const isAllAnswered = totalPlayers > 0 && answeredCount >= totalPlayers;

    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Badge variant="blue" size="md">
              Question {currentQuestion.questionIndex + 1} of {currentQuestion.totalQuestions}
            </Badge>
            <span style={{ fontWeight: 800 }}>{quizTitle}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Badge variant="yellow" size="md" icon={<Users size={16} />}>
              {answeredCount} / {totalPlayers || players.length} Answered
            </Badge>

            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFullscreen}
              leftIcon={isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>

            <Button variant="secondary" size="sm" onClick={handleReveal} leftIcon={<Eye size={16} />}>
              Skip to Reveal
            </Button>
          </div>
        </header>

        <main className={styles.hostQuestionStage}>
          {/* Question Banner & Countdown Clock */}
          <div className={styles.questionHeaderBar}>
            <div style={{ flex: 1 }}>
              <div className={styles.questionCard}>
                <h1 className={styles.questionTitle}>{currentQuestion.questionText}</h1>
              </div>
            </div>

            <div style={{ marginLeft: '2rem' }}>
              <CountdownTimer
                timeLimit={currentQuestion.timeLimit}
                size={110}
                onExpire={handleReveal}
              />
            </div>
          </div>

          {/* 4 Host Option Tiles */}
          <div className={styles.hostChoicesGrid}>
            {currentQuestion.choices.map((choice) => (
              <KahootTile
                key={choice.id}
                color={choice.color as KahootColor}
                label={choice.text}
                mode="host"
              />
            ))}
          </div>

          {isAllAnswered && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Button variant="kahoot" size="lg" onClick={handleReveal} leftIcon={<Eye size={20} />}>
                All Players Answered — Reveal Results Now
              </Button>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==================== SCREEN 3: ANSWER REVEAL MODE ====================
  if (status === 'reveal' && currentQuestion) {
    const isLastQuestion =
      currentQuestion.questionIndex + 1 >= currentQuestion.totalQuestions;

    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <Badge variant="duo" size="md">
            Question {currentQuestion.questionIndex + 1} Results
          </Badge>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFullscreen}
              leftIcon={isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
            <Button
              variant="kahoot"
              size="lg"
              onClick={handleNext}
              rightIcon={<ArrowRight size={20} />}
            >
              {isLastQuestion ? 'Go to Grand Finale Podium 🏆' : 'Next Question ➔'}
            </Button>
          </div>
        </header>

        <main className={styles.hostQuestionStage}>
          {/* Question Text */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* Animated Answer Distribution Bar Chart */}
          <AnswerBarChart
            distribution={answersDistribution}
            choices={currentQuestion.choices}
            correctChoiceId={correctChoiceId}
          />

          {/* 4 Host Tiles with Correct Checkmark Highlight */}
          <div className={styles.hostChoicesGrid}>
            {currentQuestion.choices.map((choice) => (
              <KahootTile
                key={choice.id}
                color={choice.color as KahootColor}
                label={choice.text}
                isCorrect={choice.id === correctChoiceId}
                mode="host"
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ==================== SCREEN 4: OLYMPIC PODIUM CEREMONY ====================
  if (status === 'ended') {
    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <Badge variant="yellow" size="md">
            GRAND FINALE
          </Badge>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFullscreen}
              leftIcon={isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
            <Button variant="secondary" size="md" onClick={disconnect} leftIcon={<RotateCcw size={18} />}>
              Host Another Game
            </Button>
          </div>
        </header>

        <main className={styles.lobbyStage}>
          <PodiumCeremony podium={podium} fullLeaderboard={fullLeaderboard} />
        </main>
      </div>
    );
  }

  return null;
}
