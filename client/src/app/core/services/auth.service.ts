import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { tap, catchError, of, BehaviorSubject, filter, firstValueFrom } from 'rxjs';

import { UserStore, type UserProfile } from '../store/user.store';

/**
 * Service for managing user authentication state.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  public store = inject(UserStore);

  // Use a BehaviorSubject to track initialization more explicitly for guards
  private isInitialized$ = new BehaviorSubject<boolean>(false);

  // Expose observables
  public user$ = toObservable(this.store.user);
  public initialized$ = this.isInitialized$.asObservable();

  constructor() {
    this.checkAuthStatus();
  }

  /**
   * Check if the user is currently authenticated with the backend.
   * This is called on app initialization and refresh.
   */
  checkAuthStatus(): void {
    this.store.setLoading(true);

    // The credentials (cookies) are automatically sent by the browser
    this.http
      .get<UserProfile | null>('/api/auth/me')
      .pipe(
        tap((user) => {
          this.store.setUser(user);
          this.isInitialized$.next(true);
        }),
        catchError((error) => {
          console.error('Auth check error:', error);
          this.store.setUser(null);
          this.isInitialized$.next(true);
          return of(null);
        })
      )
      .subscribe();
  }

  /**
   * Logout the current user.
   */
  logout(): void {
    this.http.get('/api/auth/logout').subscribe({
      next: () => {
        this.store.clearUser();
        window.location.href = '/login';
      },
      error: () => {
        // Even if the server call fails, clear local state and redirect
        this.store.clearUser();
        window.location.href = '/login';
      },
    });
  }

  /**
   * Get the current authentication status.
   */
  isAuthenticated(): boolean {
    return !!this.store.user();
  }

  /**
   * Helper to wait for initialization to complete
   */
  waitForInit(): Promise<boolean> {
    return firstValueFrom(this.initialized$.pipe(filter((init) => init)));
  }
}
