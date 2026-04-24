# Contributing Guide

Thank you for contributing to Task Manager! This guide will help you get started.

## Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Help others learn and grow
- Follow these guidelines in all interactions

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/task-manager.git`
3. Create feature branch: `git checkout -b feature/your-feature-name`
4. Follow the development setup in [QUICKSTART.md](./QUICKSTART.md)

## Development Standards

### Code Style

- **Language**: TypeScript (strict mode)
- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Line Length**: 100 characters
- **Trailing Commas**: ES5 compatible

Run before committing:

```bash
npm run lint:fix
npm run format
```

### Naming Conventions

**Files**:
- Components: `component-name.component.ts`
- Services: `service-name.service.ts`
- Models: `model-name.model.ts`
- Pipes: `pipe-name.pipe.ts`
- Directives: `directive-name.directive.ts`

**Classes**:
- PascalCase: `TaskService`, `TaskComponent`

**Variables**:
- camelCase: `taskList`, `isLoading`

**Constants**:
- UPPER_SNAKE_CASE: `MAX_RETRIES`, `API_TIMEOUT`

**Interfaces**:
- PascalCase with 'I' prefix: `ITaskService`, `IRepository`

### TypeScript Best Practices

```typescript
// ✅ DO: Explicit types
function getValue(id: string): Promise<Task> {
  // Implementation
}

// ❌ DON'T: Implicit any
function getValue(id): any {
  // Implementation
}

// ✅ DO: Use strict null checks
const task: Task | null = getTask(id);

// ❌ DON'T: Weak typing
const task = getTask(id);

// ✅ DO: Use interfaces
interface ITaskService {
  getTask(id: string): Promise<Task>;
}

// ❌ DON'T: Use classes for contracts
class TaskServiceInterface {
  // Implementation
}
```

### SOLID Principles Checklist

- [ ] Single Responsibility: Class has one reason to change
- [ ] Open/Closed: Open for extension, closed for modification
- [ ] Liskov Substitution: Implementations are interchangeable
- [ ] Interface Segregation: Focused interfaces
- [ ] Dependency Inversion: Depend on abstractions

### Clean Code Checklist

- [ ] Meaningful names for all identifiers
- [ ] Functions are small and focused
- [ ] Error handling is comprehensive
- [ ] No duplicate code (DRY)
- [ ] Well-commented (explain "why", not "what")
- [ ] Proper formatting (run Prettier)

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type** (required):
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no logic change)
- `refactor`: Code restructuring (no behavior change)
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Build, dependencies, tooling

**Scope** (optional): Component/service affected
- client, server, shared, build, ci/cd

**Subject** (required):
- Imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at end
- Max 50 characters

**Body** (optional):
- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

**Footer** (optional):
- Reference issues: `Fixes #123`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

```
feat(client): add task filter functionality

Implement filtering by status and priority in the task list.
This allows users to quickly find tasks matching their criteria.

Fixes #456
```

```
fix(server): correct validation error message

The validation error for email field was showing generic message.
Now shows specific error describing the constraint violation.

Fixes #789
```

```
docs(client): update README with setup instructions
```

## Pull Request Process

### Before Submitting

1. **Update your branch** with latest main
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Test locally**
   ```bash
   npm run build
   npm test
   npm run lint
   npm run format:check
   ```

3. **Push changes**
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Description Template

```markdown
## Description
Brief description of changes

## Related Issues
Fixes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Added tests
- [ ] Updated tests
- [ ] All tests passing

## Checklist
- [ ] Code follows style guidelines
- [ ] ESLint passes
- [ ] Prettier passes
- [ ] Self-reviewed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. Maintainers review your PR
2. Provide feedback or request changes
3. Make requested updates
4. Re-request review
5. Once approved, merge to main

## Testing Guidelines

### Writing Tests

**Client (Jasmine/Karma)**:

```typescript
describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', (done) => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBeGreaterThan(0);
      done();
    });
  });
});
```

**Server (Jest)**:

```typescript
describe('TaskService', () => {
  let service: TaskService;
  let repository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    repository = jest.createMockFromModule<ITaskRepository>(
      'ITaskRepository'
    );
    service = new TaskService(repository);
  });

  it('should return tasks', async () => {
    repository.findAll.mockResolvedValue([]);
    const tasks = await service.getTasks();
    expect(tasks).toEqual([]);
  });
});
```

### Test Coverage

- Aim for 70%+ coverage
- Test happy paths and error cases
- Mock external dependencies
- Test edge cases

## Documentation

### Code Comments

Use JSDoc for public APIs:

```typescript
/**
 * Retrieves a task by ID
 * @param id - The task identifier
 * @returns Promise resolving to the task or null if not found
 * @throws AppError if database query fails
 */
export async function getTask(id: string): Promise<Task | null> {
  // Implementation
}
```

### README Updates

Update relevant READMEs if:
- Adding new features
- Changing setup process
- Modifying API endpoints
- Updating dependencies

### CHANGELOG

For significant changes, add to CHANGELOG.md (if exists):

```markdown
## [1.1.0] - 2024-04-25

### Added
- New task filtering functionality

### Fixed
- Email validation error message

### Changed
- Updated TypeScript to 5.4
```

## Performance Considerations

### Client

- Use `OnPush` change detection
- Implement `trackBy` in loops
- Lazy load features
- Optimize bundle size

### Server

- Cache frequently accessed data
- Use connection pooling
- Index database queries
- Monitor request times

## Security Guidelines

- ✅ Validate all user inputs
- ✅ Sanitize HTML content
- ✅ Use HTTPS in production
- ✅ Don't commit secrets
- ✅ Implement rate limiting
- ✅ Use secure password practices
- ✅ Keep dependencies updated

## Accessibility

- Use semantic HTML
- Provide alt text for images
- Test keyboard navigation
- Ensure proper color contrast
- Use ARIA labels where needed

## Reporting Issues

### Bug Report Template

```markdown
## Description
Brief description of the bug

## Reproduction Steps
1. First step
2. Second step
3. Expected vs actual

## Environment
- OS: Windows/Mac/Linux
- Node version: 18.x
- Browser: Chrome/Firefox

## Screenshots
(if applicable)

## Logs
```

### Feature Request Template

```markdown
## Description
What feature would you like?

## Motivation
Why is this needed?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches?
```

## Development Tools

### Recommended VS Code Extensions

- Angular Language Service
- ESLint
- Prettier
- TypeScript Vue Plugin
- GitLens
- Better Comments

### Useful Commands

```bash
# Check for outdated dependencies
npm outdated

# Update packages
npm update

# Audit security
npm audit

# Fix security issues
npm audit fix
```

## Questions?

- Check [DEVELOPMENT.md](./DEVELOPMENT.md)
- Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- Review existing code
- Create an issue with `[question]` tag

## Recognition

Contributors will be recognized in:
- GitHub contributors section
- CONTRIBUTORS.md (if maintained)
- Release notes (for significant contributions)

## License

By contributing, you agree your code is licensed under the project's license.

---

Thank you for making Task Manager better! 🙏
