# Task Manager Client

Angular-based client application for the Task Manager full-stack project.

## Architecture

### Directory Structure

```
client/
├── src/
│   ├── app/
│   │   ├── core/              # Singleton services, guards, interceptors
│   │   │   ├── services/      # Core application services
│   │   │   ├── interceptors/  # HTTP interceptors
│   │   │   └── guards/        # Route guards
│   │   ├── shared/            # Reusable components, pipes, directives
│   │   │   ├── components/    # Common UI components
│   │   │   ├── pipes/         # Custom pipes
│   │   │   └── directives/    # Custom directives
│   │   ├── features/          # Feature modules
│   │   │   └── dashboard/     # Dashboard feature
│   │   ├── app.component.ts   # Root component
│   │   ├── app.config.ts      # App configuration
│   │   └── app.routes.ts      # App routing
│   ├── assets/                # Static assets
│   ├── environments/          # Environment configurations
│   ├── main.ts                # Entry point
│   ├── index.html             # Root HTML file
│   └── styles.scss            # Global styles
├── angular.json               # Angular CLI configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json          # App-specific TypeScript configuration
└── package.json               # npm dependencies
```

## Key Principles

### SOLID Principles

1. **Single Responsibility**: Each service and component has one reason to change
2. **Open/Closed**: Components are open for extension via inputs and events
3. **Liskov Substitution**: Service interfaces can be substituted without breaking code
4. **Interface Segregation**: Components expose only necessary inputs/outputs
5. **Dependency Inversion**: Components depend on abstractions (services) not implementations

### Architecture Layers

- **Core Module**: Singleton services that provide application-wide functionality
- **Shared Module**: Common components, pipes, and directives reused across features
- **Features**: Self-contained feature modules with their own components and services

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## Code Quality

### Linting

```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Automatically fix linting errors
```

### Code Formatting

```bash
npm run format          # Format all files
npm run format:check    # Check if files are formatted
```

## TypeScript Configuration

The project is configured for maximum type safety with strict mode enabled:

- `strict: true` - Enables all strict type checking options
- `noImplicitAny: true` - Error on expressions with implicit 'any' type
- `strictNullChecks: true` - Enable strict null checking
- `strictFunctionTypes: true` - Enable strict checking of function types
- `noUnusedLocals: true` - Error on unused local variables
- `noImplicitReturns: true` - Error on not all code paths returning a value

## ESLint Configuration

The project uses ESLint with TypeScript support to enforce code quality and consistency. Configuration includes:

- Recommended ESLint rules
- TypeScript-specific rules for type safety
- Import order enforcement
- Prettier integration for code formatting

## Development Workflow

1. Create feature components in `src/app/features/`
2. Create reusable components in `src/app/shared/components/`
3. Create application services in `src/app/core/services/`
4. Use dependency injection for service integration
5. Follow Angular style guide conventions
6. Maintain high test coverage

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
