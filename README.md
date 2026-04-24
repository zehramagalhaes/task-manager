# Task Manager

Full-stack task management app — Angular client + Express/Node.js API, TypeScript throughout.

## Stack

| Layer | Technology |
|---|---|
| Client | Angular 21, SCSS |
| Server | Express 4, Node.js 22 |
| Language | TypeScript 5.9 (strict) |
| Testing | Vitest (client), Jest (server) |
| Tooling | ESLint 9, Prettier, Husky |

## Quick start

```bash
git clone <repo-url> && cd task-manager
npm install        # installs all workspaces
npm run dev        # client → :4200, server → :3000
```

## Commands

```bash
# Dev
npm run dev                  # run client + server concurrently
npm run client:dev           # Angular dev server only
npm run server:dev           # Express server only

# Build
npm run build                # production build (client + server)
npm run client:build:prod    # client only
npm run server:build         # server only

# Quality
npm run lint                 # ESLint (client + server)
npm run lint:fix             # auto-fix lint errors
npm run format               # Prettier --write
npm run format:check         # Prettier --check

# Tests
npm test                     # run all tests
npm run client:test          # Vitest (client)
npm run client:test:coverage # with coverage report
npm run server:test          # Jest (server)
```

## Docs

| File | Contents |
|---|---|
| [QUICKSTART.md](./QUICKSTART.md) | Setup, env vars, troubleshooting |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Workflow, tooling config, CI |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Layers, patterns, data flow |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Commit format, PR process, standards |

## License

MIT
