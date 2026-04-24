# Shared Types and Models

Shared TypeScript types and models used across the entire application (both client and server).

## Directory Structure

```
shared/
├── types/      # TypeScript interfaces and types
├── models/     # Data models and entities
├── package.json
└── README.md
```

## Purpose

This directory contains:

- **API Response Types**: Standard response formats used by the server and consumed by the client
- **Data Models**: Shared entities and interfaces
- **Enums**: Common enumerations
- **Constants**: Shared constants

## Usage

### In Server

```typescript
import { ApiResponse, PaginatedResponse } from '../shared/types/api-responses';

res.json<ApiResponse<Task>>({
  status: 'success',
  data: task,
});
```

### In Client

```typescript
import { ApiResponse } from '../../../../shared/types/api-responses';

this.http.get<ApiResponse<Task[]>>('/api/tasks');
```

## Best Practices

1. **Keep Minimal**: Only include types truly shared between client and server
2. **Document Well**: Add JSDoc comments for complex types
3. **Use Interfaces**: Prefer interfaces over types for extensibility
4. **Version Types**: Increment shared types version in package.json when making breaking changes
5. **Backward Compatibility**: Maintain backward compatibility when possible

## TypeScript 6.0 Readiness

All types follow TypeScript 6.0 compatibility guidelines:
- No deprecated syntax
- Strict type checking
- Modern TypeScript features
- Clear type hierarchies

## Examples

### API Response

```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const response: ApiResponse<Task> = {
  status: 'success',
  data: { id: '1', title: 'My Task', completed: false, createdAt: new Date() },
};
```

### Paginated Response

```typescript
const paginatedResponse: PaginatedResponse<Task> = {
  status: 'success',
  data: [/* tasks */],
  pagination: {
    total: 100,
    page: 1,
    limit: 10,
    pages: 10,
  },
};
```
