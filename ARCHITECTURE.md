# Architecture

Task Manager is a classic 3-tier application implemented inside a TypeScript monorepo.

## 1. Client (Angular)
Located in `client/`. Responsible for the Presentation Tier.
- **Architecture**: Module-less (standalone components default where applicable) or Core/Shared/Features folder structure.
- **State Management**: Reactive data updates via RxJS Subjects and Services.
- **Communication**: Intercepts HTTP requests and manages JWTs/cookies via `HttpInterceptor`.

## 2. API Server (Express)
Located in `server/`. Responsible for the Application/Logic Tier. Uses standard MVC-like layers:
- **Routes Layer**: Defines all endpoint URLs and ties them to Controllers.
- **Controller Layer**: Parses HTTP Request bodies/params, validates DTOs, and invokes the appropriate service. Returns HTTP Responses.
- **Service Layer**: Pure business logic isolation. It handles data manipulation, error handling (`AppError`), and invokes data-fetch methodologies.
- **Data Layer / Repositories**: Interfaces directly with the Database (using an ORM or standard connection).

## 3. Shared Resources (Types)
Located in `shared/`.
Houses interfaces, enums, and types strictly shared between both frontend and backend. Utilizing this extensively prevents repeating API payload typings across standard bounds.

## Design Patterns In Use
- **Dependency Injection**: Used heavily by Angular and optionally by Express services to inverse dependencies and ensure unit testability.
- **Repository Pattern**: Used on the server to abstract queries away from raw business logic, enabling dropping-in alternate data sources.
- **DTOs (Data Transfer Objects)**: We explicitly validate inputs to avoid leaking raw body data into domain actions.

## Error Handling
- **Server**: Custom `AppError` instances get caught asynchronously by Express middleware to respond safely. All logic flows use `catchAsync` wrappers.
- **Client**: Angular `HttpInterceptor` natively catches response issues (e.g. 401s intercept and redirect to `/login`).
