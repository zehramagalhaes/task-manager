# Development Guide

Comprehensive guide for developing with this full-stack architecture.

## Project Overview

This is a monorepo containing:

- **Client**: Angular application (TypeScript)
- **Server**: Express/Node.js API (TypeScript)
- **Shared**: Shared types and models (TypeScript)

## Architecture Philosophy

### SOLID Principles

**Single Responsibility Principle**
- Each class/component has one reason to change
- Services handle specific domains
- Components focus on presentation logic

**Open/Closed Principle**
- Code is open for extension, closed for modification
- Interfaces allow flexible implementations
- Base classes provide extensible functionality

**Liskov Substitution Principle**
- Implementations are interchangeable
- Type hierarchies are maintained
- Contracts are honored by all implementations

**Interface Segregation Principle**
- Clients depend only on methods they use
- Small, focused interfaces
- No unnecessary dependencies

**Dependency Inversion Principle**
- Depend on abstractions, not concretions
- Inject dependencies
- Loose coupling between components

### Clean Code Principles

1. **Meaningful Names**: Variables, functions, and classes have clear, descriptive names
2. **Small Functions**: Functions do one thing well
3. **Comments**: Explain the "why", not the "what"
4. **Error Handling**: Graceful error handling throughout
5. **Don't Repeat Yourself (DRY)**: Extract common patterns
6. **Formatting**: Consistent code style via Prettier
7. **Testability**: Code is designed to be testable

## Technology Stack

### Client

- **Framework**: Angular 18+
- **Language**: TypeScript 5.4+ (6.0 ready)
- **Styling**: SCSS
- **Build Tool**: Angular CLI
- **Testing**: Jasmine/Karma
- **Linting**: ESLint
- **Formatting**: Prettier

### Server

- **Runtime**: Node.js 18+
- **Framework**: Express 4+
- **Language**: TypeScript 5.4+ (6.0 ready)
- **Package Manager**: npm
- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier

### Shared

- **Language**: TypeScript 5.4+ (6.0 ready)
- **Format**: Type definitions

## Project Structure

```
task-manager/
├── client/              # Angular application
│   ├── src/
│   │   ├── app/         # Application components and services
│   │   ├── assets/      # Static assets
│   │   └── styles.scss  # Global styles
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
├── server/              # Express API server
│   ├── src/
│   │   ├── api/         # Routes and controllers
│   │   ├── services/    # Business logic
│   │   ├── models/      # Data models
│   │   ├── config/      # Configuration
│   │   └── index.ts     # Entry point
│   ├── tsconfig.json
│   └── package.json
├── shared/              # Shared types
│   ├── types/           # TypeScript interfaces
│   └── models/          # Shared data models
├── tsconfig.json        # Base TypeScript config
├── .eslintrc.json       # ESLint configuration
├── .prettierrc.json     # Prettier configuration
├── .claude.json         # Claude code configuration
├── package.json         # Root package.json
└── README.md            # Project README
```

## Development Workflow

### Setup

1. Clone the repository
2. Install root dependencies: `npm install`
3. Install client dependencies: `cd client && npm install && cd ..`
4. Install server dependencies: `cd server && npm install && cd ..`

### Development

Start both client and server:

```bash
npm run dev
```

Or run separately:

```bash
# Terminal 1 - Client
npm run client:dev

# Terminal 2 - Server
npm run server:dev
```

### Code Quality

Before committing, ensure code quality:

```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Testing

```bash
# Run all tests
npm test

# Test specific package
cd client && npm test
cd server && npm test

# With coverage
npm run test:coverage
```

### Building

```bash
# Build all
npm run build

# Build specific
npm run client:build
npm run server:build
```

## TypeScript 6.0 Readiness

The project is configured to be compatible with TypeScript 6.0:

### Compiler Options

- ✅ `target: "ES2022"` - Modern JavaScript target
- ✅ `module: "ESNext"` - Modern module system
- ✅ `moduleResolution: "bundler"` - Modern module resolution
- ✅ `strict: true` - All strict checks enabled
- ✅ `noUncheckedIndexedAccess: true` - Index access safety
- ✅ `noImplicitOverride: true` - Override declarations required
- ✅ `useDefineForClassFields: true` - Standard class fields

### Avoiding Deprecation

- ❌ Not using `esModuleInterop` alone (using with `forceConsistentCasingInFileNames`)
- ❌ Not using `lib` without `types`
- ❌ Not using relative module paths without extensions
- ❌ Not using `namespace` for module organization

## ESLint Configuration

Strict ESLint configuration ensures code quality:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked"
  ]
}
```

### Key Rules

- Explicit return types on functions
- No implicit `any`
- Strict null checks
- No unused variables
- Consistent import ordering
- Prettier integration

## Prettier Configuration

Consistent code formatting:

- **Print Width**: 100 characters
- **Tab Width**: 2 spaces
- **Quotes**: Single quotes
- **Trailing Comma**: ES5 compatible
- **Arrow Parens**: Always

## Claude Code Configuration

The `.claude.json` file configures Claude code for this project:

```json
{
  "projectName": "task-manager",
  "codeStyle": {
    "language": "typescript",
    "indentation": 2,
    "quotes": "single",
    "trailingComma": "es5"
  },
  "principles": ["SOLID", "Clean Code"]
}
```

## Common Tasks

### Adding a New Feature

1. **Create Backend Endpoint**
   ```bash
   # 1. Add model to shared/types
   # 2. Create service in server/src/services
   # 3. Create controller in server/src/api/controllers
   # 4. Add route in server/src/api/routes
   ```

2. **Create Frontend Components**
   ```bash
   # 1. Create component in client/src/app/features
   # 2. Add service in client/src/app/core/services
   # 3. Update routing if needed
   # 4. Add styling
   ```

3. **Test**
   ```bash
   # Write tests for backend
   # Write tests for frontend
   # Run full test suite
   ```

### Debugging

**Client (Angular)**
- Open Chrome DevTools (F12)
- Use Angular DevTools extension
- Set breakpoints in TypeScript source

**Server (Node.js)**
```bash
# Debug mode
node --inspect-brk dist/index.js

# In VS Code: Use debugger configuration
```

### Performance

**Client**
- Use Angular's performance profiling tools
- Monitor bundle size: `npm run build -- --stats-json`
- Use lazy loading for routes

**Server**
- Use Node's built-in profiling
- Monitor response times
- Check database query performance

## Git Workflow

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push to remote: `git push origin feature/my-feature`
4. Create pull request with tests and documentation
5. Review and merge: `git merge feature/my-feature`

## Continuous Integration

Recommended GitHub Actions workflow:

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

## Deployment

### Client (Angular)

```bash
# Build production
npm run client:build

# Serve with static server
# Host dist/task-manager-client/ on your web server
```

### Server (Express)

```bash
# Build
npm run server:build

# Set environment
export NODE_ENV=production
export PORT=3000

# Run
npm start
```

### Docker Example

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### TypeScript Errors

```bash
# Regenerate type definitions
npm run build

# Check TypeScript version
npx tsc --version
```

### ESLint Issues

```bash
# Fix all issues
npm run lint:fix

# Check specific file
npx eslint src/file.ts
```

### Module Resolution

- Ensure proper path mappings in `tsconfig.json`
- Check import statement casing
- Verify file extensions in imports

## Resources

- [Angular Docs](https://angular.io)
- [Express Docs](https://expressjs.com)
- [TypeScript Docs](https://www.typescriptlang.org)
- [ESLint Docs](https://eslint.org)
- [Prettier Docs](https://prettier.io)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

## Support

For issues, questions, or suggestions:
1. Check the README files in each package
2. Review the source code documentation
3. Check GitHub issues
4. Create a new issue with detailed information
