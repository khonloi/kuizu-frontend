import type { Metadata } from 'next';
import { ProfileView } from '@/features/profile';

export const metadata: Metadata = {
  title: 'Learner Profile & Achievements',
  description:
    'Track your learning journey, view active streak counters, total experience points, current league standing, and quest achievements.',
};

export default function ProfilePage() {
  return <ProfileView />;
}
