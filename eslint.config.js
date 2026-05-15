// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Absolute path to the monorepo root (where this config lives).
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(rootDir, 'client');
const serverDir = path.join(rootDir, 'server');

export default tseslint.config(
  // ── Global ignores — applied before any rule block ────────────────────────
  // Using explicit absolute globs ensures these are effective regardless of
  // the process.cwd() when ESLint is invoked (e.g. from monorepo root).
  {
    ignores: [
      'client/dist/**',
      'client/.angular/**',
      'client/out-tsc/**',
      'client/coverage/**',
      'client/node_modules/**',
      'server/dist/**',
      'server/coverage/**',
      'server/node_modules/**',
      'node_modules/**',
      '.claude.json',
      'client/angular.json',
      'client/tsconfig.app.json',
      'client/tsconfig.spec.json',
      'client/vitest.config.ts',
      'server/vitest.config.ts',
    ],
  },

  // ── JS recommended rules — scoped to client and server source only ──────────────────
  {
    files: ['client/src/**/*.ts', 'client/src/**/*.js', 'server/src/**/*.ts', 'server/src/**/*.js'],
    ...eslint.configs.recommended,
  },

  // ── TypeScript recommended (non-type-aware) — scoped to client and server src ────────
  {
    files: ['client/src/**/*.ts', 'server/src/**/*.ts'],
    extends: [...tseslint.configs.recommended],
  },

  // ── Type-aware rules + parser project — scoped to client src ─────────────
  {
    files: ['client/src/**/*.ts'],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: clientDir,
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
      },
    },

    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      // ── Type-checked rules ────────────────────────────────────────────────
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      // ── Prettier ──────────────────────────────────────────────────────────
      'prettier/prettier': 'error',

      // ── TypeScript strictness ─────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // ── Import order ──────────────────────────────────────────────────────
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@angular/**',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',

      // ── General quality ───────────────────────────────────────────────────
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  // ── Type-aware rules + parser project — scoped to server src ─────────────
  {
    files: ['server/src/**/*.ts'],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: serverDir,
        project: ['./tsconfig.json'],
      },
    },

    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/no-duplicates': 'error',
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  // ── Spec files — relax rules that are noisy in tests ──────────────────────
  {
    files: ['client/src/**/*.spec.ts', 'server/src/**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // ── LoggerService — allow console for system logs ─────────────────────────
  {
    files: ['server/src/services/LoggerService.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // ── Prettier last — disables all conflicting formatting rules ─────────────
  prettierConfig
);
