# Task Manager - Full-Stack Application

A modern full-stack application built with Angular (client-side) and Express/Node.js (server-side), following SOLID and Clean Code principles.

## Project Structure

```
task-manager/
├── client/                 # Angular client application
├── server/                 # Express/Node.js API server
├── shared/                 # Shared types and utilities
├── package.json            # Root package.json (monorepo setup)
├── tsconfig.json           # Base TypeScript configuration (TS 6.0 ready)
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.json        # Prettier configuration
├── .claude.json            # Claude code configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Architecture Principles

### SOLID Principles
- **S**ingle Responsibility Principle: Each module has one reason to change
- **O**pen/Closed Principle: Open for extension, closed for modification
- **L**iskov Substitution Principle: Subtypes must be substitutable for their base types
- **I**nterface Segregation Principle: Many client-specific interfaces over one general interface
- **D**ependency Inversion Principle: Depend on abstractions, not concretions

### Clean Code
- Meaningful names for variables, functions, and classes
- Small, focused functions
- DRY (Don't Repeat Yourself)
- Proper error handling
- Clear separation of concerns
- Type safety with TypeScript

## Getting Started

### Prerequisites
- Node.js 18+ (with npm/yarn)
- Angular CLI 18+
- TypeScript 5.x (with TypeScript 6.0 compatibility configs)

### Installation

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### Development

```bash
# Run client (Angular dev server on http://localhost:4200)
npm run client:dev

# Run server (Express on http://localhost:3000)
npm run server:dev

# Run both concurrently
npm run dev
```

### Build

```bash
# Build client
npm run client:build

# Build server
npm run server:build

# Build all
npm run build
```

## TypeScript Configuration

The project is configured to be compatible with TypeScript 6.0. All tsconfig.json files avoid deprecated flags and use recommended settings for forward compatibility.

## Code Quality

### ESLint
Ensures code quality and consistency with strict rules.

```bash
npm run lint
npm run lint:fix
```

### Prettier
Automatic code formatting with consistent styling.

```bash
npm run format
npm run format:check
```

## IDE Configuration

The project includes `.claude.json` for optimal Claude code configuration in VS Code.

## License

MIT
