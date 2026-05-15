import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile } from 'passport-google-oauth20';
import { config } from './environment.js';
import { type SessionUser } from '../types/auth.js';

/**
 * Configure Passport strategies and serialization
 */
export function configurePassport() {
  // We use `Express.User` to satisfy passport's types,
  // and safely cast to `Profile` to extract the Google fields.
  passport.serializeUser((user: Express.User, done) => {
    const profile = user as Profile;

    // Shrink the payload to fit within the 4KB cookie limit
    const lightweightUser: SessionUser = {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails?.[0]?.value,
      photo: profile.photos?.[0]?.value,
      provider: profile.provider,
    };
    done(null, lightweightUser);
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
        // Here you would typically find or create a user in your database
        // We pass the raw Google Profile object forward. serializeUser will shrink it.
        return done(null, profile);
      }
    )
  );
}
