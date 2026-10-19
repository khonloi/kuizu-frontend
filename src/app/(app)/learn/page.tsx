import type { Metadata } from 'next';
import { LearnView } from '@/features/learn';

export const metadata: Metadata = {
  title: 'Curriculum & Quest Path',
  description:
    'Interactive bite-sized courses in language, math, and logic with tactile practice nodes and mastery milestones.',
};

export default function LearnPage() {
  return <LearnView />;
}
