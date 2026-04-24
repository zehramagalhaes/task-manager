# Contributing

We welcome contributions to Task Manager! Please read this short guide before getting started.

## Branching & Pull Requests
1. Fork the repo.
2. Branch off `main` -> `feature/your-feature-name` or `fix/your-fix`.
3. Add tests for your changes.
4. Ensure the test suite passes locally (`npm test`).
5. Run the formatting and linting scripts (`npm run format` and `npm run lint:fix`).
6. Open a Pull Request.

## Commit Conventions
We use conventional commits:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Tooling updates or other miscellaneous tasks

Example:
`feat(client): implement lazy loading for dashboard routes`

## Testing Guidelines
- **Client**: Vitest (`npm run client:test`). We expect isolated component and service tests.
- **Server**: Jest (`npm run server:test`). Mock interactions with databases.

## Standards
- Clean formatting enforced by Prettier (100 char print width, 2 spaces indentation).
- Clean Code guidelines (Single responsibility functions, descriptive variable names).
- TypeScript strict mode enforced. Avoid `any` - define clear interfaces inside the `shared/` workspace or locally.
