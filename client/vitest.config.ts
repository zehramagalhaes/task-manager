import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

/**
 * Vitest Configuration
 * Modern testing framework for Angular 18+
 * Provides fast, ESM-native testing with excellent TypeScript support
 */
export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test.ts',
        '**/*.spec.ts',
        '**/node_modules/**',
      ],
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist', '.angular'],
    typecheck: {
      enabled: true,
      tsconfig: 'tsconfig.spec.json',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
