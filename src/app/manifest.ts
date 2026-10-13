import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kuizu - Gamified Learning & Live Arena',
    short_name: 'Kuizu',
    description:
      'Kuizu gamified learning with bite-sized quests and real-time multiplayer quiz battles.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f19',
    theme_color: '#00cd9c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
