import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kuizu - Gamified Learning & Live Arena',
    short_name: 'Kuizu',
    description:
      'Duolingo-style bite-sized quests meets Kahoot-style real-time multiplayer quiz battles.',
    start_url: '/learn',
    display: 'standalone',
    background_color: '#0b0f19',
    theme_color: '#58cc02',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
