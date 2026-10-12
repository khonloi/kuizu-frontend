'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  Play,
  Users,
  ShoppingBag,
  Trophy,
  Volume2,
  Heart,
  Zap,
  Flame,
  ArrowRight,
  Radio,
  Gamepad2,
  Sparkle,
} from 'lucide-react';
import styles from './page.module.css';
import { Button, Card, Badge } from '@/components/ui';
import { useAudioStore } from '@/stores/audio.store';
import { useAuthStore } from '@/stores/auth.store';
import { fireVictoryConfetti, fireStreakFireworks } from '@/lib/confetti';

export default function HomePage() {
  const { user } = useAuthStore();
  const { playSuccess, playError, playPop, playFanfare } = useAudioStore();

  const handleTestSuccess = () => {
    playSuccess();
    fireVictoryConfetti();
  };

  const handleTestFanfare = () => {
    playFanfare();
    fireStreakFireworks();
  };

  const handleTestPop = () => {
    playPop();
  };

  const handleTestError = () => {
    playError();
  };

  return (
    <main className={styles.container}>
      {/* Top Navigation Bar */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>⚡</div>
          <span className={styles.logoText}>KUIZU</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          {/* Stats Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--duo-orange)', fontWeight: 800 }}>
              <Flame size={20} fill="var(--duo-orange)" />
              <span>{user?.streak.count ?? 7}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--duo-red)', fontWeight: 800 }}>
              <Heart size={20} fill="var(--duo-red)" />
              <span>{user?.hearts ?? 5}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--duo-yellow)', fontWeight: 900 }}>
              <Zap size={20} fill="var(--duo-yellow)" />
              <span>{user?.xp ?? 450} XP</span>
            </div>
          </div>

          <Link href="/learn" onClick={playPop}>
            <Button variant="duo" size="sm" rightIcon={<ArrowRight size={16} />}>
              Open Learning Hub
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.badge}>
          <Sparkles size={16} />
          <span>Next-Gen Gamified Learning Engine</span>
        </div>

        <h1 className={styles.title}>
          Master Skills in <span className={styles.highlightDuo}>Duolingo</span> Quests.<br />
          Clash in <span className={styles.highlightKahoot}>Kahoot</span> Arenas.
        </h1>

        <p className={styles.subtitle}>
          The unified gamification platform uniting self-paced mastery with intense multiplayer projector battles. Powered by real-time WebSockets, 3D tactile physics, and rich sensory feedback.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/learn" onClick={playPop}>
            <Button variant="duo" size="lg" leftIcon={<BookOpen size={20} />}>
              Explore Quest Path
            </Button>
          </Link>

          <Link href="/arena/join" onClick={playPop}>
            <Button variant="kahoot" size="lg" leftIcon={<Gamepad2 size={20} />}>
              Join Live Battle
            </Button>
          </Link>

          <Link href="/arena/host" onClick={playPop}>
            <Button variant="secondary" size="lg" leftIcon={<Radio size={20} />}>
              Host Projector Game
            </Button>
          </Link>
        </div>
      </section>

      {/* 4 Feature Showcases */}
      <section className={styles.showcaseGrid}>
        {/* Feature 1: Duolingo Quest Path */}
        <Card padding="lg" glow="duo">
          <div className={styles.cardIcon} style={{ background: 'rgba(88, 204, 2, 0.15)' }}>
            🗾
          </div>
          <Badge variant="duo" size="sm">SELF-PACED MASTERY</Badge>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.5rem' }}>
            Sine-Wave Curriculum Tree
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
            Meandering skill nodes, persistent progress unlocking, XP rewards, and lesson completion crown badges.
          </p>
          <Link href="/learn" onClick={playPop}>
            <Button variant="duo" size="md" fullWidth rightIcon={<ArrowRight size={16} />}>
              Start Japanese Lesson
            </Button>
          </Link>
        </Card>

        {/* Feature 2: Multiplayer Live Arena */}
        <Card padding="lg" glow="kahoot">
          <div className={styles.cardIcon} style={{ background: 'rgba(226, 27, 60, 0.15)' }}>
            🎮
          </div>
          <Badge variant="red" size="sm">REAL-TIME MULTIPLAYER</Badge>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.5rem' }}>
            Kahoot Projector Arena
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
            Host quizzes on classroom screens with instant QR code join, speed bonus formulas, and Olympic podium ceremonies.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Link href="/arena/host" onClick={playPop}>
              <Button variant="kahoot" size="md" fullWidth leftIcon={<Play size={16} />}>
                Host Game
              </Button>
            </Link>
            <Link href="/arena/join" onClick={playPop}>
              <Button variant="secondary" size="md" fullWidth leftIcon={<Users size={16} />}>
                Join PIN
              </Button>
            </Link>
          </div>
        </Card>

        {/* Feature 3: Economy & Shop */}
        <Card padding="lg" glow="blue">
          <div className={styles.cardIcon} style={{ background: 'rgba(28, 176, 246, 0.15)' }}>
            💎
          </div>
          <Badge variant="blue" size="sm">GAMIFIED ECONOMY</Badge>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.5rem' }}>
            Power-Ups & Streak Stash
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
            Replenish hearts, equip streak freezes, or wager gems in double-or-nothing streak challenges.
          </p>
          <Link href="/shop" onClick={playPop}>
            <Button variant="secondary" size="md" fullWidth leftIcon={<ShoppingBag size={16} />}>
              Visit Kuizu Shop
            </Button>
          </Link>
        </Card>

        {/* Feature 4: Competitive Leagues */}
        <Card padding="lg" glow="none">
          <div className={styles.cardIcon} style={{ background: 'rgba(255, 200, 0, 0.15)' }}>
            🏆
          </div>
          <Badge variant="yellow" size="sm">LEAGUES & RANKS</Badge>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.5rem' }}>
            Weekly Leaderboard
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
            Climb from Bronze to Diamond league. Earn top XP to earn promotions and exclusive avatar flair.
          </p>
          <Link href="/leaderboard" onClick={playPop}>
            <Button variant="secondary" size="md" fullWidth leftIcon={<Trophy size={16} />}>
              View Standings
            </Button>
          </Link>
        </Card>
      </section>

      {/* Interactive Sensory Soundboard Section */}
      <section className={styles.soundboardSection}>
        <Badge variant="duo" size="sm" icon={<Volume2 size={16} />}>
          AUDIO & SENSORY ENGINE PREVIEW
        </Badge>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.75rem' }}>
          Feel Every Tap with Tactile Sound & Motion
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0.5rem auto 0', lineHeight: 1.6 }}>
          Test the procedural Web Audio synthesizer and confetti engine directly in your browser.
        </p>

        <div className={styles.soundGrid}>
          <Button
            variant="duo"
            size="lg"
            onClick={handleTestSuccess}
            leftIcon={<Sparkle size={18} />}
          >
            Correct Answer
          </Button>

          <Button
            variant="kahoot"
            size="lg"
            onClick={handleTestFanfare}
            leftIcon={<Trophy size={18} />}
          >
            Victory Fanfare
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleTestPop}
            leftIcon={<Volume2 size={18} />}
          >
            Tactile Pop
          </Button>

          <Button
            variant="danger"
            size="lg"
            onClick={handleTestError}
            leftIcon={<Heart size={18} />}
          >
            Mistake / Heart Lost
          </Button>
        </div>
      </section>

      {/* Clean System Architecture Status Footer */}
      <footer className={styles.statusFooter}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--duo-green)', boxShadow: '0 0 10px var(--duo-green)' }} />
          <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>Kuizu v2 Architecture Operational</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Next.js 16 App Router</span>
          <span>NestJS Realtime Socket.IO</span>
          <span>Custom CSS Modules</span>
          <a
            href="http://localhost:4000/api/docs"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--duo-blue)', fontWeight: 700 }}
          >
            API Docs ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
