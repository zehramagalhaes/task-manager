# Architecture Guide

This document explains the architectural patterns and design principles used in the Task Manager application.

## High-Level Architecture

```
┌─────────────────────────────────────┐
│         Web Browser                 │
└──────────────┬──────────────────────┘
               │ HTTP/HTTPS
┌──────────────▼──────────────────────┐
│   Angular Client Application        │
│  ├─ Core (Services, Guards)        │
│  ├─ Shared (Components, Pipes)     │
│  └─ Features (Feature Modules)     │
└──────────────┬──────────────────────┘
               │ REST API
┌──────────────▼──────────────────────┐
│   Express Server                    │
│  ├─ Routes (Endpoint definitions)  │
│  ├─ Controllers (Request handlers) │
│  ├─ Services (Business logic)      │
│  └─ Models (Data structures)       │
└──────────────┬──────────────────────┘
               │ Queries
┌──────────────▼──────────────────────┐
│   Database / External Services      │
└─────────────────────────────────────┘
```

## Client Architecture

### Layer 1: Core Module

Contains singleton services and application-wide functionality:

```
core/
├── services/
│   ├── ApiService          (HTTP communication)
│   ├── AuthService         (Authentication)
│   └── DataService         (Shared data management)
├── interceptors/
│   ├── ErrorInterceptor    (Error handling)
│   ├── AuthInterceptor     (Token injection)
│   └── LoggingInterceptor  (Request logging)
└── guards/
    ├── AuthGuard           (Route protection)
    └── CanDeactivateGuard  (Unsaved changes)
```

**Key Principles:**
- Singleton services (provided in root)
- HTTP interceptors for cross-cutting concerns
- Route guards for access control

### Layer 2: Shared Module

Reusable components, pipes, and directives:

```
shared/
├── components/
│   ├── HeaderComponent
│   ├── FooterComponent
│   ├── LoadingSpinner
│   └── ErrorAlert
├── pipes/
│   ├── SafePipe           (Sanitization)
│   ├── FormatPipe         (Formatting)
│   └── FilterPipe         (Filtering)
└── directives/
    ├── HighlightDirective (Styling)
    └── ValidatorDirective (Validation)
```

**Key Principles:**
- Pure components (no side effects)
- Reusable across features
- Configurable via inputs
- Clear output events

### Layer 3: Features

Self-contained feature modules with their own components:

```
features/
├── dashboard/
│   ├── dashboard.component.ts
│   ├── dashboard.component.html
│   ├── dashboard.service.ts
│   └── dashboard.routes.ts
├── tasks/
│   ├── task-list/
│   ├── task-create/
│   ├── task-detail/
│   └── task.service.ts
└── settings/
    ├── settings.component.ts
    ├── settings.service.ts
    └── settings.routes.ts
```

**Key Principles:**
- Feature isolation
- Lazy loading of routes
- Feature-specific services
- Clear feature boundaries

## Server Architecture

### Layer 1: Routes

Defines API endpoints and delegates to controllers:

```typescript
// Routing responsibility
router.post('/tasks', taskController.createTask);
router.get('/tasks/:id', taskController.getTask);
router.patch('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
```

**Key Principles:**
- Thin routing layer
- RESTful conventions
- Middleware integration

### Layer 2: Controllers

Handles HTTP requests/responses and validation:

```typescript
export class TaskController extends BaseController {
  constructor(private taskService: ITaskService) {
    super();
  }

  createTask = this.catchAsync(async (req, res) => {
    this.validateRequiredFields(req.body, ['title', 'description']);
    const task = await this.taskService.createTask(req.body);
    this.sendSuccess(res, task, 201);
  });
}
```

**Key Principles:**
- Request validation
- Error handling via `catchAsync`
- Response formatting
- Uses dependency injection

### Layer 3: Services

Contains business logic and data operations:

```typescript
export interface ITaskService {
  createTask(taskData: CreateTaskInput): Promise<Task>;
  getTask(id: string): Promise<Task>;
  updateTask(id: string, taskData: UpdateTaskInput): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}

export class TaskService implements ITaskService {
  constructor(private repository: ITaskRepository) {}

  async createTask(taskData: CreateTaskInput): Promise<Task> {
    // Business logic
    return this.repository.save(task);
  }
}
```

**Key Principles:**
- Interface-based design
- Business logic isolation
- Repository pattern for data access
- No HTTP concerns

### Layer 4: Models

Data structures and interfaces:

```typescript
// Domain model
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Input DTO
export interface CreateTaskInput {
  title: string;
  description: string;
}
```

**Key Principles:**
- Clear data structures
- Input validation DTOs
- Domain models
- Type safety

## Design Patterns

### 1. Dependency Injection

Components and services depend on abstractions:

```typescript
// Angular example
@Injectable({ providedIn: 'root' })
export class TaskComponent {
  constructor(private taskService: ITaskService) {}
}

// Express example
export class TaskController {
  constructor(private taskService: ITaskService) {}
}
```

**Benefits:**
- Loose coupling
- Testability
- Flexibility

### 2. Repository Pattern

Abstract data access:

```typescript
export interface ITaskRepository {
  findById(id: string): Promise<Task>;
  findAll(): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}

// Implementation can be swapped
export class TaskRepository implements ITaskRepository {
  // Database-specific implementation
}
```

**Benefits:**
- Data access abstraction
- Easier testing
- Data source flexibility

### 3. Observer Pattern

Angular services emit state changes:

```typescript
@Injectable()
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  data$ = this.dataSubject.asObservable();

  updateData(data: Data[]): void {
    this.dataSubject.next(data);
  }
}

// Usage in component
export class MyComponent {
  data$ = this.dataService.data$;
}
```

**Benefits:**
- Reactive updates
- Loose coupling
- Easy subscriptions

### 4. Factory Pattern

Create objects based on type:

```typescript
export class HttpClientFactory {
  static createClient(type: 'authenticated' | 'public'): HttpClient {
    if (type === 'authenticated') {
      return new AuthenticatedHttpClient(/* deps */);
    }
    return new PublicHttpClient(/* deps */);
  }
}
```

**Benefits:**
- Object creation abstraction
- Flexibility
- Centralized creation logic

### 5. Decorator Pattern

Add behavior to classes/methods:

```typescript
// TypeScript decorators
@Injectable()
@LogExecution()
export class TaskService {
  @Memoize()
  async getTasks(): Promise<Task[]> {
    // Implementation
  }
}
```

**Benefits:**
- Cross-cutting concerns
- Separation of concerns
- Reusable logic

### 6. Module Pattern

Organize related functionality:

```typescript
// Angular module
@NgModule({
  declarations: [TaskComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [TaskService],
})
export class TaskModule {}

// Node.js module
// Implicit in ES modules
export { TaskController };
export { TaskService };
```

**Benefits:**
- Code organization
- Encapsulation
- Reusability

## SOLID Principles in Practice

### S - Single Responsibility

Each class has one reason to change:

```typescript
// ✅ Good: Separate concerns
export class TaskService {
  async getTasks(): Promise<Task[]> { /* business logic */ }
}

export class TaskRepository {
  async find(): Promise<Task[]> { /* data access */ }
}

// ❌ Bad: Mixed concerns
export class TaskManager {
  async getTasks(): Promise<Task[]> { 
    // both business logic and data access
  }
}
```

### O - Open/Closed

Open for extension, closed for modification:

```typescript
// ✅ Good: Extend behavior without modifying
export class BaseController {
  protected sendSuccess(res, data) { /* */ }
}

export class TaskController extends BaseController {
  // Extends without modifying base
  async createTask(req, res) {
    const task = await this.taskService.create(req.body);
    this.sendSuccess(res, task, 201);
  }
}
```

### L - Liskov Substitution

Implementations are interchangeable:

```typescript
interface ITaskService {
  getTasks(): Promise<Task[]>;
}

// Both implementations follow the contract
export class DatabaseTaskService implements ITaskService {
  async getTasks(): Promise<Task[]> { /* database */ }
}

export class MockTaskService implements ITaskService {
  async getTasks(): Promise<Task[]> { /* mock data */ }
}
```

### I - Interface Segregation

Clients depend only on needed methods:

```typescript
// ✅ Good: Focused interfaces
export interface IReadable {
  read(): Promise<any>;
}

export interface IWritable {
  write(data: any): Promise<void>;
}

// ❌ Bad: Fat interface
export interface IRepository {
  read(): Promise<any>;
  write(data: any): Promise<void>;
  delete(id: string): Promise<void>;
  // ... many more methods
}
```

### D - Dependency Inversion

Depend on abstractions:

```typescript
// ✅ Good: Depends on interface
export class TaskController {
  constructor(private taskService: ITaskService) {}
}

// ❌ Bad: Depends on concrete class
export class TaskController {
  private taskService = new TaskService();
}
```

## Error Handling Strategy

### Server-Side

```typescript
// Centralized error handling
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
  }
}

// In controller
try {
  const task = await this.taskService.getTask(id);
  this.sendSuccess(res, task);
} catch (error) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
```

### Client-Side

```typescript
// Error interceptor
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        // Handle different error types
        if (error.status === 401) {
          // Redirect to login
        }
        return throwError(error);
      })
    );
  }
}
```

## Testing Strategy

### Unit Testing

```typescript
// Client - Component test
describe('TaskComponent', () => {
  let component: TaskComponent;
  let taskService: jasmine.SpyObj<ITaskService>;

  beforeEach(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getTasks']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ITaskService, useValue: taskService }
      ]
    });
    component = TestBed.createComponent(TaskComponent).componentInstance;
  });

  it('should load tasks', fakeAsync(() => {
    taskService.getTasks.and.returnValue(of([]));
    component.ngOnInit();
    tick();
    expect(component.tasks).toEqual([]);
  }));
});

// Server - Service test
describe('TaskService', () => {
  let service: TaskService;
  let repository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    repository = jest.createMockFromModule<ITaskRepository>('ITaskRepository');
    service = new TaskService(repository);
  });

  it('should return tasks', async () => {
    repository.findAll.mockResolvedValue([]);
    const tasks = await service.getTasks();
    expect(tasks).toEqual([]);
  });
});
```

## Configuration Management

```typescript
// Environment-specific configuration
export const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    logLevel: 'debug'
  },
  production: {
    apiUrl: 'https://api.example.com',
    logLevel: 'error'
  }
};

// Usage
const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];
```

## Data Flow

### Request Flow (Server)

```
HTTP Request
    ↓
Middleware (logging, CORS, parsing)
    ↓
Route matching
    ↓
Controller (validation, business logic delegation)
    ↓
Service (business logic, data operations)
    ↓
Repository (database queries)
    ↓
Database
    ↓
Response (formatted by controller)
    ↓
HTTP Response
```

### Component Lifecycle (Client)

```
Component Creation
    ↓
Init Services
    ↓
Load Data (via Service)
    ↓
Render Template
    ↓
User Interaction
    ↓
Update via Service
    ↓
Re-render
    ↓
Component Destruction
```

## Performance Optimization

### Client

- Lazy load feature modules
- Use OnPush change detection
- Implement trackBy in *ngFor
- Optimize bundle size

### Server

- Connection pooling
- Caching strategies
- Query optimization
- Rate limiting

## Security Considerations

- **Authentication**: JWT tokens
- **Authorization**: Role-based access
- **Input Validation**: Server-side validation
- **CORS**: Configured for specific origins
- **HTTPS**: Use in production
- **XSS Protection**: Angular sanitization
- **CSRF**: Token validation

## Summary

This architecture provides:

✅ Clear separation of concerns  
✅ High testability  
✅ Easy maintenance  
✅ Scalability  
✅ Flexibility  
✅ SOLID principles compliance  
✅ Clean code standards  
✅ TypeScript 6.0 readiness  

The modular design allows features to be developed independently and integrated seamlessly.
