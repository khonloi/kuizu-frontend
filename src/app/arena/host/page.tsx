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
  Zap,
  Trophy,
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
import { SAMPLE_QUIZZES } from '@/mock/sample-quizzes';
import { useQuizzesQuery } from '@/hooks/queries';

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
  const { data: availableQuizzes = [] } = useQuizzesQuery();

  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
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
  const handleCreateRoom = async (quizId: string) => {
    setSelectedQuizId(quizId);
    setIsCreating(true);
    playPop();

    await createGame(quizId);
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

  // Combine available quizzes with sample deck fallback
  const displayQuizzes = availableQuizzes.length > 0 ? availableQuizzes : SAMPLE_QUIZZES;

  // ==================== SCREEN 0: SELECT QUIZ TO HOST ====================
  if (status === 'idle') {
    return (
      <div className={styles.arenaRoot}>
        <header className={styles.arenaHeader}>
          <div className={styles.flexRow}>
            <Badge variant="red" size="md" icon={<Tv size={18} />}>
              PROJECTOR BIG-SCREEN MODE
            </Badge>
          </div>
          <div className={styles.flexRow}>
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

        <main className={styles.quizSelectMain}>
          <div className={styles.quizSelectHeader}>
            <Badge variant="yellow" size="sm">
              HOST A LIVE BATTLE
            </Badge>
            <h1 className={styles.quizSelectTitle}>
              Select Quiz for Multiplayer Arena
            </h1>
            <p className={styles.quizSelectSubtitle}>
              Choose a competitive deck to host on your classroom projector or shared screen.
            </p>
          </div>

          <div className={styles.quizSelectGrid}>
            {displayQuizzes.map((quiz) => {
              const qCount =
                ('questionCount' in quiz && typeof quiz.questionCount === 'number'
                  ? quiz.questionCount
                  : quiz.questions?.length) || 0;
              const isSelected = selectedQuizId === quiz.id;
              return (
                <Card
                  key={quiz.id}
                  padding="lg"
                  className={styles.quizCard}
                >
                  <div>
                    <div className={styles.quizCardIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={24} color="var(--duo-yellow)" fill="var(--duo-yellow)" />
                    </div>
                    <Badge variant="blue" size="sm">
                      {qCount} Questions
                    </Badge>
                    <h2 className={styles.quizCardTitle}>
                      {quiz.title}
                    </h2>
                    {quiz.description && (
                      <p className={styles.quizCardDescription}>
                        {quiz.description}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="kahoot"
                    size="lg"
                    fullWidth
                    isLoading={isCreating && isSelected}
                    onClick={() => handleCreateRoom(quiz.id)}
                    leftIcon={<Play size={20} />}
                  >
                    Create Live Room
                  </Button>
                </Card>
              );
            })}
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
          <div className={styles.flexRowLg}>
            <Badge variant="red" size="md">
              {quizTitle || 'Arena Quiz'}
            </Badge>
            <span className={styles.joinInstructions}>
              Join at <strong>/arena/join</strong>
            </span>
          </div>

          <div className={styles.flexRow}>
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
          <div className={styles.lobbyPinRow}>
            <div>
              <span className={styles.lobbyPinLabel}>
                Game Room PIN
              </span>
              <div className={styles.lobbyGiantPin}>
                {pin}
              </div>
              <div className={styles.flexRowSm}>
                <Badge variant="duo" size="md" icon={<Users size={16} />}>
                  {players.length} Players Connected
                </Badge>
              </div>
            </div>

            {pin && (
              <div className={styles.lobbyQrCard}>
                <QRCodeSvg value={joinUrl} size={140} />
                <span className={styles.lobbyQrText}>
                  Scan with Camera to Join
                </span>
              </div>
            )}
          </div>

          {/* Connected Players Grid */}
          <div className={styles.playerGrid}>
            {players.length === 0 ? (
              <span className={styles.lobbyWaitingText}>
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
            className={styles.lobbyStartBtn}
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
          <div className={styles.flexRowLg}>
            <Badge variant="blue" size="md">
              Question {currentQuestion.questionIndex + 1} of {currentQuestion.totalQuestions}
            </Badge>
            <span className={styles.fontWeight800}>{quizTitle}</span>
          </div>

          <div className={styles.flexRowLg}>
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
            <div className={styles.flex1}>
              <div className={styles.questionCard}>
                <h1 className={styles.questionTitle}>{currentQuestion.questionText}</h1>
              </div>
            </div>

            <div className={styles.timerWrapper}>
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
            <div className={styles.allAnsweredBanner}>
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

          <div className={styles.flexRow}>
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
              rightIcon={isLastQuestion ? <Trophy size={20} /> : <ArrowRight size={20} />}
            >
              {isLastQuestion ? 'Go to Grand Finale Podium' : 'Next Question'}
            </Button>
          </div>
        </header>

        <main className={styles.hostQuestionStage}>
          {/* Question Text */}
          <div className={styles.revealTitleWrapper}>
            <h2 className={styles.revealQuestionTitle}>
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

          <div className={styles.flexRow}>
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
