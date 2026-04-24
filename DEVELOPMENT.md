# Development Guide

This is a TypeScript-based monorepo (Angular + Express), following SOLID and Clean Code principles.

## Structure Overview
```
task-manager/
├── client/              # Angular application (Vitest/SCSS)
├── server/              # Express API (Jest)
├── shared/              # Shared TS types/models
└── ...
```

## Tools & Configuration
- **TypeScript (v5.9)**: Strict mode enabled (`target: ES2022`, `module: ESNext`).
- **ESLint & Prettier**: Configured at the root `eslint.config.js`. Checks run automatically as a pre-commit hook via Husky.
- **VS Code**: Use recommended `.vscode` settings. Auto-format on save is encouraged.

## Common Workflows

### Running Code Quality Checks
Before submitting a PR, ensure your code passes styling and tests:
```bash
npm run format         # Fixs formatting issues
npm run lint           # Checks for severe stylistic issues
npm test               # Runs the test pipeline
```

### Adding a New Feature
1. **Shared**: Add interfaces/models in `shared/`.
2. **Backend**: Add routes, controllers, and services in `server/src/`. Validate inputs. Write unit tests (Jest).
3. **Frontend**: Generate components/services in `client/src/app/`. Bind to the API. Write unit tests (Vitest).

## Deployment

### Client (Static)
```bash
npm run client:build:prod
# Output to: client/dist/task-manager-client
```

### Server (Node)
```bash
npm run server:build
export NODE_ENV=production
npm start
# Output to: server/dist
```
