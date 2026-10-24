import type { NextConfig } from "next";

if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
  throw new Error('NEXT_PUBLIC_DEMO_MODE cannot be enabled in production builds.');
}

if (
  process.env.NODE_ENV === 'production' &&
  !process.env.NEXT_PUBLIC_SOCKET_URL &&
  process.env.NEXT_PUBLIC_DEMO_MODE !== 'true'
) {
  console.warn(
    'WARNING: NEXT_PUBLIC_SOCKET_URL is not set for production. Real-time features require a valid WebSocket server endpoint.',
  );
}

const backendUrl = process.env.BACKEND_INTERNAL_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
