import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth';

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your Kuizu account to continue your learning quests, streak protection, and arena battles.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
