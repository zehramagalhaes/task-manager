import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

import { map, filter, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Guard to prevent unauthorized access to protected routes.
 * Waits for the AuthService to initialize before making a decision.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // We must wait for the auth check to finish before allowing or denying access
  return authService.initialized$.pipe(
    filter((initialized) => initialized),
    take(1),
    map(() => {
      if (authService.isAuthenticated()) {
        return true;
      }

      // If not authenticated, redirect to the login page tree
      return router.createUrlTree(['/login']);
    })
  );
};
