import { Routes } from '@angular/router';

/**
 * Main application routes.
 * Define all top-level routes here.
 */
export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  // Feature routes would be lazy-loaded here
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
