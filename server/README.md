# Task Manager Server

Express/Node.js API server for the Task Manager full-stack application.

## Architecture

### Directory Structure

```
server/
├── src/
│   ├── api/
│   │   ├── routes/        # Route definitions (controllers delegation)
│   │   └── controllers/   # Request handlers (BaseController provided)
│   ├── services/          # Business logic and data operations
│   ├── models/            # Data models and interfaces
│   ├── middlewares/       # Express middlewares
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration management
│   └── index.ts           # Application entry point
├── dist/                  # Compiled JavaScript output
├── tsconfig.json          # TypeScript configuration
├── .env.example           # Environment variables template
├── package.json           # npm dependencies
└── README.md              # This file
```

## Architecture Principles

### SOLID Principles

1. **Single Responsibility**: Each service handles one specific concern
2. **Open/Closed**: Services are open for extension via interfaces
3. **Liskov Substitution**: Service implementations are interchangeable
4. **Interface Segregation**: Services expose only necessary methods
5. **Dependency Inversion**: Controllers depend on abstractions (services)

### Layered Architecture

- **Routes Layer**: Defines API endpoints and delegates to controllers
- **Controllers Layer**: Handles HTTP requests/responses and validation
- **Services Layer**: Contains business logic and data operations
- **Models Layer**: Defines TypeScript interfaces and types
- **Middlewares Layer**: Cross-cutting concerns (logging, error handling, auth)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Environment Configuration

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

Server will start on `http://localhost:3000` by default.

### Build

```bash
npm run build
```

Compiled files will be in the `dist/` directory.

### Production

```bash
npm run build
npm start
```

### Test

```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
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

## API Documentation

### Health Endpoints

#### GET /health

Check server health status.

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-04-24T12:00:00.000Z"
}
```

#### GET /api/health

API health check.

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-04-24T12:00:00.000Z",
  "uptime": 123.45
}
```

#### GET /api/health/ready

Readiness probe for orchestration systems.

```bash
curl http://localhost:3000/api/health/ready
```

Response:
```json
{
  "ready": true,
  "timestamp": "2024-04-24T12:00:00.000Z"
}
```

## TypeScript Configuration

The project is configured for maximum type safety:

- `strict: true` - Enables all strict type checking
- `noImplicitAny: true` - Error on implicit 'any' types
- `strictNullChecks: true` - Enable strict null checking
- `noUnusedLocals: true` - Error on unused variables
- `noImplicitReturns: true` - Error on missing return statements

### ES Modules

The project uses ES modules (`"type": "module"` in package.json) for modern JavaScript standards compatibility.

## Development Workflow

### Creating a New Feature

1. **Define Models** - Create TypeScript interfaces in `src/models/`
2. **Create Service** - Implement business logic in `src/services/`
3. **Build Controller** - Extend `BaseController` in `src/api/controllers/`
4. **Add Routes** - Create route file in `src/api/routes/`
5. **Test** - Write tests for the feature
6. **Document** - Update API documentation

### Service Pattern Example

```typescript
// Service Interface
export interface ITaskService {
  getTasks(): Promise<Task[]>;
  createTask(task: CreateTaskInput): Promise<Task>;
}

// Service Implementation
export class TaskService implements ITaskService {
  async getTasks(): Promise<Task[]> {
    // Implementation
  }

  async createTask(task: CreateTaskInput): Promise<Task> {
    // Implementation
  }
}
```

### Controller Pattern Example

```typescript
// Controller with Base Class
export class TaskController extends BaseController {
  constructor(private taskService: ITaskService) {
    super();
  }

  getTasks = this.catchAsync(async (req, res) => {
    const tasks = await this.taskService.getTasks();
    this.sendSuccess(res, tasks);
  });
}
```

## Error Handling

Global error handler middleware catches and formats all errors consistently:

```typescript
// AppError for application errors
throw new AppError(404, 'Task not found');
```

Async errors are automatically caught and passed to the error handler via `catchAsync()`.

## CORS Configuration

CORS is enabled with configurable origins. Set `CORS_ORIGIN` in `.env`:

```env
CORS_ORIGIN=http://localhost:4200,http://localhost:3000
```

## Security Headers

Security headers are automatically applied via Helmet middleware:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- And more...

## Environment-Specific Configuration

The server automatically loads configuration based on `NODE_ENV`:
- `development` - Detailed logging, source maps enabled
- `production` - Optimized, minimal logging
- `test` - Isolated, mocked dependencies

## Additional Resources

- [Express Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
