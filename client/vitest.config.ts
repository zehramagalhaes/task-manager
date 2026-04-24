import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for Angular 21.
 * Angular 21 ships with native Vitest support via @angular-devkit/build-angular:vitest.
 * Run tests with: ng test
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test.ts',
        '**/*.spec.ts',
        '**/node_modules/**',
      ],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist', '.angular'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});