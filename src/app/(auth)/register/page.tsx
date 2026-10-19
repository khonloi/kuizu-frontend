import type { Metadata } from 'next';
import { RegisterForm } from '@/features/auth';

export const metadata: Metadata = {
  title: 'Create Your Profile',
  description: 'Create a free Kuizu account to save your learning progress, earn league trophies, and climb the global leaderboards.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
