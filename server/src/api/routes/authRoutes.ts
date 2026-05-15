import { Router } from 'express';
import passport from 'passport';
import { config } from '../../config/environment.js';
import { type AuthRequest } from '../../types/auth.js';

/**
 * Authentication routes
 * Provides endpoints for OAuth and user authentication
 */
const router = Router();

router.get('/google', (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_req, res) => {
    res.redirect(`${config.frontendUrl}/dashboard`);
  }
);

// Get current user route
router.get('/me', (req, res) => {
  const authReq = req as AuthRequest;
  if (authReq.isAuthenticated()) {
    return res.status(200).json(authReq.user);
  }
  return res.status(200).json(null);
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({ error: 'Logout failed' });
    } else {
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
});

export const authRoutes = router;
