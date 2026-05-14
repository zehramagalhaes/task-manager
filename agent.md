# Task Manager - Project Insights

## Design System & Visual Identity

- **Theme**: Premium Dark Glassmorphism (transitioning to solid overlays as per recent requirements).
- **Core Colors**:
  - Primary: `#6366f1` (Indigo)
  - Success: `#10b981` (Emerald)
  - Danger: `#ef4444` (Red)
  - Background: Deep Dark (`#0f172a` / `#1a1c23`)
- **Overlay Principles**:
  - All modals, contextual menus, and tooltips must use **solid backgrounds** (e.g., `#1a1c23` or `#1e293b`) with high contrast borders (`#2d313d`).
  - Avoid transparency/blur on interactive overlays to ensure legibility and a "professional" feel.
- **Layout Spacing**:
  - Global Padding: `1.5rem` (24px)
  - Kanban Column Width: Equalized grid columns (`1fr`).
  - Stat Cards: Balanced, even sizing using CSS Grid.

## Technical Architecture

- **Monorepo**: npm workspaces with `client/` (Angular) and `server/` (Express).
- **Frontend State Management**: `@ngrx/signals` for lightweight, reactive state.
- **Authentication**:
  - Backend: `express-session` + `passport` (Google OAuth).
  - Frontend: `AuthGuard` waits for explicit `initialized` state from `AuthService`.
- **Reusable Components**:
  - Standalone Angular components located in `src/app/shared/components`.
  - Reusable logic should be extracted into services (e.g., `ModalService`).

## Component Patterns

- **Task Cards**: Use a contextual menu for actions (Edit/Delete). Elements hierarchy: Project Tag (top-left) -> Priority (top-right) -> Title (middle) -> Metadata/Assignee (bottom).
- **Modals**: Centered, solid backgrounds, clear "Cancel" vs "Primary" actions.
- **Scrollbars**: Custom styled inset scrollbars with consistent spacing from content.

## Deployment & Production

- **Standard**: Serve client static files from the server's `dist` folder in production.
- **Environment**: Use `environment.ts` (or environment variables) for API URLs and OAuth secrets.
