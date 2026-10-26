import type { Metadata } from 'next';
import { Outfit, Nunito } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { ToastContainer, A11yAnnouncer } from '@/components/ui';

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${appUrl}#website`,
      url: appUrl,
      name: 'Kuizu',
      description:
        'Kuizu gamified learning with bite-sized interactive courses and real-time multiplayer arena battles.',
      publisher: {
        '@type': 'Organization',
        name: 'Kuizu Team',
        url: appUrl,
      },
    },
    {
      '@type': 'EducationalApplication',
      '@id': `${appUrl}#app`,
      name: 'Kuizu',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Master skills in interactive quests and clash in live multiplayer arena quiz battles.',
    },
  ],
};

const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
      </head>
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
            <ToastContainer />
            <A11yAnnouncer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
