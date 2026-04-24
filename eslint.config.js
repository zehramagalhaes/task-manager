// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Absolute path to the client/ directory — the directory this file lives in.
// All globs and tsconfig paths are anchored here so they resolve correctly
// regardless of where ESLint is invoked (monorepo root or client/ directly).
const clientDir = path.dirname(fileURLToPath(import.meta.url));

// ESLint v9 resolves globs relative to process.cwd(), not the config file.
// When invoked via `npm run lint --workspace=client` from the monorepo root,
// cwd is <root>/, so `src/**/*.ts` would resolve to <root>/src/ — wrong.
// Absolute globs bypass this entirely.
const abs = (/** @type {string} */ glob) =>
  path.join(clientDir, glob).replace(/\\/g, '/');

export default tseslint.config(
  // ── Global ignores ────────────────────────────────────────────────────────
  {
    ignores: [
      abs('dist/**'),
      abs('.angular/**'),
      abs('out-tsc/**'),
      abs('coverage/**'),
    ],
  },

  // ── Base JS recommended rules ─────────────────────────────────────────────
  eslint.configs.recommended,

  // ── TypeScript recommended + type-checked rules ───────────────────────────
  // Spread directly into tseslint.config() — the v8 API. Each entry in
  // recommendedTypeChecked is a plain config object; we then add a separate
  // object below to scope files, parserOptions, plugins, and custom rules.
  ...tseslint.configs.recommendedTypeChecked,

  // ── Scope type-checking to this project's tsconfigs ───────────────────────
  {
    files: [abs('src/**/*.ts')],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: clientDir,
        project: [
          './tsconfig.app.json',
          './tsconfig.spec.json',
        ],
      },
    },

    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      // ── Prettier ──────────────────────────────────────────────────────────
      'prettier/prettier': 'error',

      // ── TypeScript strictness ──────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      }],

      // ── Import order ──────────────────────────────────────────────────────
      'import/order': ['error', {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
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
      }],
      'import/no-duplicates': 'error',

      // ── General quality ───────────────────────────────────────────────────
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  // ── Spec files — relax rules that are noisy in tests ──────────────────────
  {
    files: [abs('src/**/*.spec.ts')],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // ── Prettier last — disables all conflicting formatting rules ─────────────
  prettierConfig,
);
