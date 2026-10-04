'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Flame,
  Heart,
  Gem,
  Zap,
  Play,
  BookOpen,
  Sparkles,
  Server,
  Activity,
  ExternalLink,
  Triangle,
  Diamond,
  Circle,
  Square,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import styles from './page.module.css';
import { getGameSocket } from '../lib/socket';

export default function HomePage() {
  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');
  const [healthData, setHealthData] = useState<any>(null);
  const [isHealthLoading, setIsHealthLoading] = useState(false);
  const [socketStatus, setSocketStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [selectedTile, setSelectedTile] = useState<string | null>(null);

  // Check backend health
  const checkHealth = async () => {
    setIsHealthLoading(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealthData(data);
      } else {
        setHealthData({ status: 'error', message: `HTTP ${res.status}` });
      }
    } catch (err) {
      setHealthData({ status: 'offline', message: (err as Error).message });
    } finally {
      setIsHealthLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();

    // Test socket connection
    const socket = getGameSocket();
    setSocketStatus('connecting');

    socket.connect();

    socket.on('connect', () => {
      setSocketStatus('connected');
    });

    socket.on('disconnect', () => {
      setSocketStatus('disconnected');
    });

    socket.on('connect_error', () => {
      setSocketStatus('disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#58cc02', '#e21b3c', '#1368ce', '#ffa602'],
    });
  };

  const handleTileClick = (color: string) => {
    setSelectedTile(color);
    triggerCelebration();
  };

  return (
    <main className={styles.container}>
      {/* Header bar */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>⚡</div>
          <span className={styles.logoText}>KUIZU</span>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.statItem} title="Active Streak">
            <Flame className="w-5 h-5 text-orange-500" color="#ff9600" fill="#ff9600" />
            <span style={{ color: '#ff9600' }}>7</span>
          </div>

          <div className={styles.statItem} title="Hearts Remaining">
            <Heart className="w-5 h-5 text-red-500" color="#ff4b4b" fill="#ff4b4b" />
            <span style={{ color: '#ff4b4b' }}>5</span>
          </div>

          <div className={styles.statItem} title="Gems Stash">
            <Gem className="w-5 h-5 text-blue-400" color="#1cb0f6" fill="#1cb0f6" />
            <span style={{ color: '#1cb0f6' }}>320</span>
          </div>

          <div className={styles.statItem} title="Total XP">
            <Zap className="w-5 h-5 text-yellow-400" color="#ffc800" fill="#ffc800" />
            <span style={{ color: '#ffc800' }}>450 XP</span>
          </div>

          <a
            href="http://localhost:4000/api/docs"
            target="_blank"
            rel="noreferrer"
            className="btn-3d btn-secondary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
          >
            <span>Swagger Docs</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.badge}>
          <Sparkles size={14} />
          <span>Next-Gen MERN Stack 2026</span>
        </div>

        <h1 className={styles.title}>
          Master Skills in <span className={styles.highlightDuo}>Duolingo</span> Quests.<br />
          Clash in <span className={styles.highlightKahoot}>Kahoot</span> Arenas.
        </h1>

        <p className={styles.subtitle}>
          A unified gamified learning platform built on NestJS 12, Next.js 16 App Router,
          Mongoose, Socket.IO realtime battles, and modern CSS design tokens.
        </p>

        <div className={styles.ctaGroup}>
          <button
            onClick={triggerCelebration}
            className="btn-3d btn-duo"
          >
            <BookOpen size={20} />
            <span>Start Learning Path</span>
          </button>

          <a
            href="#live-arena"
            className="btn-3d btn-kahoot"
          >
            <Play size={20} />
            <span>Join Live Battle</span>
          </a>
        </div>
      </section>

      {/* 2-Column Split: Duolingo Quest vs Kahoot Arena */}
      <section className={styles.grid2} id="live-arena">
        {/* Duolingo Quest Card */}
        <div className={`glass-card ${styles.featureCard}`}>
          <div className={styles.cardHeader}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--duo-green)', fontWeight: 800 }}>
                SELF-PACED MASTERY
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.2rem' }}>
                Unit 1: Essential Greetings
              </h2>
            </div>
            <div className={styles.cardIcon} style={{ background: 'rgba(88, 204, 2, 0.15)' }}>
              🗾
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Interactive Japanese Foundations with audio prompts, multiple choice, translation exercises, and streak boosters.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '1rem',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                <span>Unit Progress</span>
                <span style={{ color: 'var(--duo-green)', fontWeight: 700 }}>1 / 3 Lessons</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '33%', height: '100%', background: 'var(--duo-green)' }} />
              </div>
            </div>

            <button
              onClick={triggerCelebration}
              className="btn-3d btn-duo"
              style={{ width: '100%' }}
            >
              <span>Practice Lesson (+20 XP)</span>
            </button>
          </div>
        </div>

        {/* Kahoot Live Arena Card */}
        <div className={`glass-card ${styles.featureCard}`}>
          <div className={styles.cardHeader}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--kahoot-red)', fontWeight: 800 }}>
                MULTIPLAYER REAL-TIME
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.2rem' }}>
                Live Quiz Arena
              </h2>
            </div>
            <div className={styles.cardIcon} style={{ background: 'rgba(226, 27, 60, 0.15)' }}>
              🎮
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Enter a 6-digit game PIN to join a live host screen, or host your own trivia battle with speed scoring.
          </p>

          <div className={styles.pinInputContainer}>
            <input
              type="text"
              placeholder="PIN"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              className={styles.pinInput}
            />
            <input
              type="text"
              placeholder="Your Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles.pinInput}
              style={{ width: '180px', letterSpacing: 'normal', textAlign: 'left' }}
            />
          </div>

          <div className={styles.kahootTiles}>
            <div
              onClick={() => handleTileClick('red')}
              className={`${styles.tile} ${styles.tileRed}`}
            >
              <Triangle size={22} fill="#ffffff" />
              <span>Red Triangle</span>
            </div>

            <div
              onClick={() => handleTileClick('blue')}
              className={`${styles.tile} ${styles.tileBlue}`}
            >
              <Diamond size={22} fill="#ffffff" />
              <span>Blue Diamond</span>
            </div>

            <div
              onClick={() => handleTileClick('yellow')}
              className={`${styles.tile} ${styles.tileYellow}`}
            >
              <Circle size={22} fill="#ffffff" />
              <span>Yellow Circle</span>
            </div>

            <div
              onClick={() => handleTileClick('green')}
              className={`${styles.tile} ${styles.tileGreen}`}
            >
              <Square size={22} fill="#ffffff" />
              <span>Green Square</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live System Diagnostics Card */}
      <section className={`glass-card ${styles.diagCard}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Server size={24} color="var(--duo-blue)" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Infrastructure & Health Diagnostics</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Verifying live communication between Next.js (port 3001) and NestJS backend (port 4000)
              </p>
            </div>
          </div>

          <button
            onClick={checkHealth}
            disabled={isHealthLoading}
            className="btn-3d btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <RefreshCw size={14} className={isHealthLoading ? 'animate-spin' : ''} />
            <span>Refresh Ping</span>
          </button>
        </div>

        <div className={styles.diagGrid}>
          {/* REST API Status */}
          <div className={styles.diagItem}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Backend REST API</span>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '1.05rem' }}>
              <span
                className={`${styles.statusIndicator} ${
                  healthData?.status === 'ok' || healthData?.status === 'degraded'
                    ? styles.statusOnline
                    : styles.statusOffline
                }`}
              />
              <span>{healthData?.status ? healthData.status.toUpperCase() : 'CHECKING...'}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Route: /api/health (proxied)
            </span>
          </div>

          {/* Database Status */}
          <div className={styles.diagItem}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MongoDB Connection</span>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '1.05rem' }}>
              <span
                className={`${styles.statusIndicator} ${
                  healthData?.services?.database?.status === 'connected'
                    ? styles.statusOnline
                    : styles.statusConnecting
                }`}
              />
              <span>{healthData?.services?.database?.status?.toUpperCase() || 'DISCONNECTED'}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              URI: mongodb://127.0.0.1:27017/kuizu
            </span>
          </div>

          {/* Socket.IO Status */}
          <div className={styles.diagItem}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Socket.IO Gateway</span>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '1.05rem' }}>
              <span
                className={`${styles.statusIndicator} ${
                  socketStatus === 'connected'
                    ? styles.statusOnline
                    : socketStatus === 'connecting'
                    ? styles.statusConnecting
                    : styles.statusOffline
                }`}
              />
              <span>{socketStatus.toUpperCase()}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Namespace: /game
            </span>
          </div>

          {/* Architecture info */}
          <div className={styles.diagItem}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MERN Architecture</span>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '1.05rem', color: 'var(--duo-green)' }}>
              <CheckCircle2 size={16} style={{ marginRight: '0.4rem' }} />
              <span>Scaffold Ready</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              NestJS 12 + Next.js 16
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <p>Kuizu v2 — Duolingo + Kahoot Clone Architecture</p>
      </footer>
    </main>
  );
}
