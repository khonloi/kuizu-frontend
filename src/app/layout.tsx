import type { Metadata } from 'next';
import { Outfit, Nunito } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { ToastContainer } from '@/components/ui';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'Kuizu | Gamified Learning & Live Arena',
    template: '%s | Kuizu',
  },
  description:
    'Kuizu gamified learning with bite-sized interactive courses and real-time multiplayer arena battles.',
  keywords: [
    'gamified learning',
    'quiz battle',
    'interactive courses',
    'kahoot multiplayer',
    'kuizu quests',
  ],
  authors: [{ name: 'Kuizu Team' }],
  creator: 'Kuizu',
  openGraph: {
    title: 'Kuizu | Gamified Learning & Live Arena',
    description:
      'Master skills in quests and clash in multiplayer arena battles with 3D tactile physics and real-time WebSockets.',
    url: appUrl,
    siteName: 'Kuizu',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kuizu | Gamified Learning & Live Arena',
    description:
      'Master skills in quests and clash in multiplayer arena battles with 3D tactile physics and real-time WebSockets.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${nunito.variable}`}>
      <body className="bg-gradient-glow min-h-screen flex flex-col">
        <QueryProvider>
          <AuthProvider>
            {children}
            <ToastContainer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
