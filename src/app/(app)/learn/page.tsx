'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, CheckCircle2, Play, Flame } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ProgressBar } from '../../../components/ui/progress-bar';
import { Badge } from '../../../components/ui/badge';
import { useAudioStore } from '../../../stores/audio.store';
import { fireVictoryConfetti } from '../../../lib/confetti';

export default function LearnPage() {
  const { playSuccess, playPop } = useAudioStore();

  const handlePractice = () => {
    playSuccess();
    fireVictoryConfetti();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Unit Header Card */}
      <Card
        padding="lg"
        glow="duo"
        style={{
          background: 'linear-gradient(135deg, rgba(88, 204, 2, 0.15) 0%, rgba(23, 32, 54, 0.9) 100%)',
          borderColor: 'rgba(88, 204, 2, 0.35)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <Badge variant="duo" size="sm" icon={<Sparkles size={14} />}>
              UNIT 1 • SELF-PACED MASTERY
            </Badge>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.4rem', letterSpacing: '-0.02em' }}>
              Essential Japanese Foundations
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem', maxWidth: '580px' }}>
              Interactive greetings, introductions, audio cues, and word order exercises.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Badge variant="orange" size="md" icon={<Flame size={16} />}>
              Streak Goal: 1 Lesson
            </Badge>
          </div>
        </div>

        {/* Unit Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Unit Progress</span>
            <span style={{ color: 'var(--duo-green)' }}>1 of 3 Lessons (33%)</span>
          </div>
          <ProgressBar value={33} max={100} color="duo" size="md" />
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button
            variant="duo"
            size="lg"
            onClick={handlePractice}
            leftIcon={<Play size={20} />}
          >
            Practice Next Lesson (+20 XP)
          </Button>

          <Link href="/arena/join" onClick={playPop}>
            <Button variant="kahoot" size="lg" leftIcon={<Sparkles size={20} />}>
              Live Multiplayer Arena
            </Button>
          </Link>
        </div>
      </Card>

      {/* Lesson Stepping Stones Path Preview */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', padding: '1rem 0' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Lesson Path Progression
        </h2>

        {/* Stepping node 1 (Completed) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => { playPop(); fireVictoryConfetti(); }}
            className="btn-3d btn-duo"
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
            }}
            title="Lesson 1: Hiragana Basics (Completed)"
          >
            <CheckCircle2 size={36} color="#ffffff" />
          </button>
          <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>1. Greetings</span>
        </div>

        {/* Stepping node 2 (Active Current) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transform: 'translateX(30px)' }}>
          <button
            type="button"
            onClick={handlePractice}
            className="btn-3d btn-duo animate-pulse-ring"
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              backgroundColor: '#61de02',
            }}
            title="Lesson 2: Introductions (Ready to Start)"
          >
            <BookOpen size={36} color="#ffffff" />
          </button>
          <Badge variant="duo" size="sm">START</Badge>
          <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>2. Introductions</span>
        </div>

        {/* Stepping node 3 (Locked) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transform: 'translateX(-25px)' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '2px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: 'var(--text-muted)',
              cursor: 'not-allowed',
            }}
            title="Lesson 3: Common Phrases (Complete Lesson 2 first)"
          >
            🔒
          </div>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)' }}>3. Common Phrases</span>
        </div>
      </section>
    </div>
  );
}
