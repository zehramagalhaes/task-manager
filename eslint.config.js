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

// ESLint v9 resolves globs relative to process.cwd(), not the config file.
// When invoked via `npm run lint --workspace=client` from the monorepo root,
// cwd is <root>/, so `src/**/*.ts` would resolve to <root>/src/ — wrong.
// Absolute globs bypass this entirely.
const abs = (/** @type {string} */ glob) =>
  path.join(clientDir, glob).replace(/\\/g, '/');

export default tseslint.config(
  // ── Global ignores — applied before any rule block ────────────────────────
  // Using explicit absolute globs ensures these are effective regardless of
  // the process.cwd() when ESLint is invoked (e.g. from monorepo root).
  {
    ignores: [
      abs('dist/**'),
      abs('.angular/**'),
      abs('out-tsc/**'),
      abs('coverage/**'),
      abs('node_modules/**'),
      path.join(rootDir, 'node_modules/**').replace(/\\/g, '/'),
    ],
  },

  // ── JS recommended rules — scoped to client source only ──────────────────
  // Not applied globally so ESLint never touches generated/cached JS artefacts
  // in .angular/, node_modules/, etc.
  {
    files: [abs('src/**/*.ts'), abs('src/**/*.js')],
    ...eslint.configs.recommended,
  },

  // ── TypeScript recommended (non-type-aware) — scoped to client src ────────
  {
    files: [abs('src/**/*.ts')],
    extends: [...tseslint.configs.recommended],
  },

  // ── Type-aware rules + parser project — scoped to client src ─────────────
  // All rules that call getParserServices() (await-thenable, no-floating-
  // promises, etc.) must live in a block that also sets parserOptions.project.
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
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
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
