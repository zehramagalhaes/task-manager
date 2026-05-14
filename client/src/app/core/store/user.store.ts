import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

/**
 * Passport User Profile Interface
 */
export interface UserProfile {
  id: string;
  displayName: string;
  name?: {
    familyName?: string;
    givenName?: string;
  };
  emails?: Array<{ value: string; verified?: boolean }>;
  photos?: Array<{ value: string }>;
  provider: string;
  _json?: unknown;
}

/**
 * User Store State
 */
export interface UserState {
  user: UserProfile | null;
  loading: boolean;
  initialized: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  initialized: false,
};

/**
 * Global User Store using @ngrx/signals.
 * Provides a lightweight, reactive way to manage user state.
 */
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setUser(user: UserProfile | null): void {
      patchState(store, { user, initialized: true, loading: false });
    },
    setLoading(loading: boolean): void {
      patchState(store, { loading });
    },
    clearUser(): void {
      patchState(store, initialState);
    },
  }))
);
