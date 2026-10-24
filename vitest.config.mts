import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 10000,
    maxWorkers: 4,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/types/**',
        'src/**/index.ts',
        'src/app/**',
        'src/providers/**',
        'src/features/landing/components/feature-mockups/**',
        'src/features/landing/components/*-section/**',
        'src/features/landing/components/*-footer/**',
        'src/features/landing/components/*-banner/**',
        'src/features/landing/hooks/**',
        'src/**/*.module.css',
      ],
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 70,
        lines: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
});
