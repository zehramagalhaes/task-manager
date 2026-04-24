# Quick Start Guide

Get up and running with the Task Manager application in minutes.

## Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: For version control
- **VS Code**: Recommended editor (with recommended extensions)

Check your versions:

```bash
node --version
npm --version
```

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Install Root Dependencies

```bash
npm install
```

This installs:
- ESLint & Prettier (root level)
- Development tools
- Workspace configuration

### 3. Install Workspaces

```bash
# Install client (Angular)
cd client && npm install && cd ..

# Install server (Express)
cd server && npm install && cd ..
```

Or use npm workspaces (automatic):

```bash
npm install
# npm automatically installs all workspace dependencies
```

## Development

### Option 1: Run Both (Recommended)

```bash
npm run dev
```

This starts:
- ✅ Angular dev server on `http://localhost:4200`
- ✅ Express API on `http://localhost:3000`

### Option 2: Run Separately

Terminal 1 - Start Client:

```bash
npm run client:dev
```

Terminal 2 - Start Server:

```bash
npm run server:dev
```

### Option 3: Run Specific Package

```bash
# Client only
cd client && npm start

# Server only
cd server && npm run dev
```

## First Steps

1. **Open the application**
   - Navigate to http://localhost:4200
   - You should see the welcome page

2. **Check the API**
   - Open http://localhost:3000/api/health
   - Should see: `{ "status": "healthy", ... }`

3. **View logs**
   - Terminal should show request logs
   - Check both client and server terminals

## Code Quality

Before committing, run quality checks:

```bash
# All checks
npm run lint && npm run format:check

# Fix issues automatically
npm run lint:fix && npm run format
```

## Building

### Development Build (with source maps)

```bash
npm run build
```

### Production Build (optimized)

```bash
npm run client:build
npm run server:build
```

Output:
- Client: `client/dist/`
- Server: `server/dist/`

## Testing

```bash
# All tests
npm test

# Client tests
cd client && npm test

# Server tests
cd server && npm test

# With coverage
npm run test:coverage
```

## Project Structure

```
task-manager/
├── client/              # Angular application
│   ├── src/app/         # Application code
│   └── dist/            # Build output
├── server/              # Express API
│   ├── src/             # Application code
│   └── dist/            # Build output
├── shared/              # Shared types
├── .vscode/             # VS Code settings
├── package.json         # Root configuration
├── tsconfig.json        # TypeScript config
├── .eslintrc.json       # ESLint config
├── .prettierrc.json     # Prettier config
└── README.md            # Project documentation
```

## VS Code Setup

### Recommended Extensions

VS Code will recommend extensions automatically. Accept the suggestion or manually install:

1. **Angular Language Service** - Angular development
2. **ESLint** - Code quality
3. **Prettier** - Code formatting
4. **TypeScript Vue Plugin** - TypeScript support
5. **GitLens** - Git integration

### Auto Format on Save

Already configured in `.vscode/settings.json`:

- ✅ ESLint auto-fix
- ✅ Prettier auto-format
- ✅ TypeScript language server

Just save your file (Ctrl+S) and formatting happens automatically.

## Environment Variables

### Server (.env)

Copy from template:

```bash
cd server
cp .env.example .env
```

Configure as needed:

```env
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:4200
LOG_LEVEL=info
```

### Client (Angular)

Environment files in `client/src/environments/`:

- `environment.ts` - Development
- `environment.prod.ts` - Production

## Database Setup (When Needed)

When adding database support, update server:

```bash
cd server
npm install mongoose  # or your preferred driver
```

Configure in `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=user
DB_PASSWORD=password
```

## Debugging

### Client (Angular)

1. Open Chrome DevTools: F12
2. Install "Angular DevTools" extension
3. Set breakpoints in TypeScript code
4. Use Console for debugging

### Server (Node.js)

Start in debug mode:

```bash
# Terminal
npm run server:dev

# Open VS Code debug
# Click "Attach Server" in Run menu
# Or press Ctrl+Shift+D
```

Or use `node --inspect`:

```bash
node --inspect-brk dist/index.js
```

Then attach debugger to localhost:9229.

## Git Workflow

### First Time

```bash
# Check git status
git status

# Stage changes
git add .

# Commit
git commit -m "Initial setup"

# Push
git push origin main
```

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ... code ...

# Stage and commit
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature

# Create Pull Request on GitHub
```

## Troubleshooting

### Node modules issues

```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port already in use

```bash
# Change port in .env
PORT=3001

# Or kill process using port
# On Windows: netstat -ano | findstr :3000
# On Mac/Linux: lsof -i :3000
```

### TypeScript errors

```bash
# Rebuild
npm run build

# Check TypeScript version
npx tsc --version

# Should be 5.4.0 or higher
```

### ESLint/Prettier conflicts

```bash
# Auto fix all issues
npm run lint:fix && npm run format
```

## Next Steps

1. **Read Architecture Guide**: [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Read Development Guide**: [DEVELOPMENT.md](./DEVELOPMENT.md)
3. **Check Client README**: [client/README.md](./client/README.md)
4. **Check Server README**: [server/README.md](./server/README.md)
5. **Create your first feature**

## Common Commands Quick Reference

```bash
# Development
npm run dev              # Start both
npm run client:dev       # Start client only
npm run server:dev       # Start server only

# Building
npm run build            # Build all
npm run client:build     # Build client
npm run server:build     # Build server

# Code Quality
npm run lint             # Check lint errors
npm run lint:fix         # Fix lint errors
npm run format           # Format all files
npm run format:check     # Check formatting

# Testing
npm test                 # Run all tests
npm run test:coverage    # With coverage report

# Production
npm start                # Run production build
```

## Getting Help

1. **Documentation**: Read [DEVELOPMENT.md](./DEVELOPMENT.md) and [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Code Comments**: Check inline comments in source files
3. **Type Hints**: Hover over code in VS Code for type information
4. **Error Messages**: Read console output carefully
5. **GitHub Issues**: Search existing issues or create new one

## Success Checklist

After setup, verify:

- ✅ Client runs on http://localhost:4200
- ✅ Server runs on http://localhost:3000
- ✅ API health check works (http://localhost:3000/api/health)
- ✅ ESLint passes without errors
- ✅ Code formats on save
- ✅ TypeScript compilation succeeds
- ✅ Tests run successfully

## Deployment

### Development Server

Already running via `npm run dev` - perfect for local development!

### Staging/Production

See [DEVELOPMENT.md - Deployment](./DEVELOPMENT.md#deployment) section.

---

**Happy coding! 🚀**

For detailed information, see:
- [Main README](./README.md)
- [Development Guide](./DEVELOPMENT.md)
- [Architecture Guide](./ARCHITECTURE.md)
