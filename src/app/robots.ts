import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/learn', '/leaderboard', '/shop', '/arena/join'],
        disallow: ['/api/', '/arena/play', '/profile'],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
