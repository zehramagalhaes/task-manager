import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './environment.js';

/**
 * Configure Passport strategies and serialization
 */
export function configurePassport() {
  passport.serializeUser((user: unknown, done: (error: Error | null, id: unknown) => void) => {
    done(null, user);
  });

  passport.deserializeUser((_user: unknown, done: (error: Error | null, id: unknown) => void) => {
    return done(null, {});
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: '/api/auth/google/callback',
        proxy: true, // Required if behind a proxy
      },
      (_accessToken, _refreshToken, profile, done) => {
        // Here you would typically find or create a user in your database
        return done(null, profile);
      }
    )
  );
}
