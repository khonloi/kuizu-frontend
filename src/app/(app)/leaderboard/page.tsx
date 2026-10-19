import type { Metadata } from 'next';
import { LeaderboardView } from '@/features/leaderboard';

export const metadata: Metadata = {
  title: 'Leagues & Global Rankings',
  description:
    'Climb the divisions from Bronze to Diamond League. Practice daily, earn XP, and secure top 3 placement in weekly tournaments.',
};

export default function LeaderboardPage() {
  return <LeaderboardView />;
}
