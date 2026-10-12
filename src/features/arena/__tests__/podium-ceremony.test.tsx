import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PodiumCeremony } from '../components/podium-ceremony';
import type { PlayerScore } from '@/types/socket.types';

const mockPodium: PlayerScore[] = [
  { nickname: 'Speedy', score: 3200 },
  { nickname: 'QuizMaster', score: 2800 },
  { nickname: 'Brainy', score: 2400 },
];

const mockFullLeaderboard: PlayerScore[] = [
  { nickname: 'Speedy', score: 3200 },
  { nickname: 'QuizMaster', score: 2800 },
  { nickname: 'Brainy', score: 2400 },
  { nickname: 'Learner4', score: 1900 },
];

describe('PodiumCeremony Component', () => {
  it('renders winners on 1st, 2nd, and 3rd podium tiers', () => {
    render(<PodiumCeremony podium={mockPodium} />);

    expect(screen.getByRole('region', { name: /grand finale podium/i })).toBeInTheDocument();
    expect(screen.getByText('Speedy')).toBeInTheDocument();
    expect(screen.getByText('3,200 pts')).toBeInTheDocument();
    expect(screen.getByText('QuizMaster')).toBeInTheDocument();
    expect(screen.getByText('2,800 pts')).toBeInTheDocument();
    expect(screen.getByText('Brainy')).toBeInTheDocument();
    expect(screen.getByText('2,400 pts')).toBeInTheDocument();
  });

  it('renders final leaderboard table when fullLeaderboard prop is provided', () => {
    render(<PodiumCeremony podium={mockPodium} fullLeaderboard={mockFullLeaderboard} />);

    expect(screen.getByText('Final Leaderboard Standings')).toBeInTheDocument();
    expect(screen.getByText('Learner4')).toBeInTheDocument();
    expect(screen.getByText('1,900 pts')).toBeInTheDocument();
  });

  it('renders empty dashes when some podium positions are unfilled', () => {
    const singleWinner: PlayerScore[] = [{ nickname: 'SoloChamp', score: 1000 }];
    render(<PodiumCeremony podium={singleWinner} />);

    expect(screen.getByText('SoloChamp')).toBeInTheDocument();
    // 2nd and 3rd place show '-'
    const dashes = screen.getAllByText('-');
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });
});
