import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    root: './src',
    include: ['**/*.{spec,test}.ts'],
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      include: ['**/*.ts'],
      exclude: ['**/*.d.ts', 'index.ts'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
});
