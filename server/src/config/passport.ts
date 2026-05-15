import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile } from 'passport-google-oauth20';
import { config } from './environment.js';
import { type SessionUser } from '../types/auth.js';

/**
 * Configure Passport strategies and serialization
 */
export function configurePassport() {
  // serializeUser simply takes the clean SessionUser object provided by the strategy and saves it
  passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: SessionUser, done) => {
    // Restore the user object from the cookie payload
    return done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: '/api/auth/google/callback',
        proxy: true, // Required if behind a proxy
      },
      (_accessToken, _refreshToken, profile: Profile, done) => {
        // Here we extract only what we need from the raw Google profile
        // This guarantees the payload fits in our 4KB cookie limit
        const sessionUser: SessionUser = {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
          emailVerified: (profile._json as Record<string, unknown>).email_verified === true,
          photo: profile.photos?.[0]?.value,
          provider: profile.provider,
        };

        // We pass the clean SessionUser object forward to serializeUser
        return done(null, sessionUser);
      }
    )
  );
}
