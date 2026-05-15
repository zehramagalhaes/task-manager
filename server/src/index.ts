import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { config } from './config/environment.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { apiRoutes } from './api/routes/index.js';
import { configurePassport } from './config/passport.js';
import { logger } from './services/LoggerService.js';

// Initialize Passport Config
configurePassport();

const app: Express = express();

// Security Middleware
app.use(helmet());
app.use(cors(config.cors));

// Trust Vercel's Edge proxy (required for secure cookies)
app.set('trust proxy', 1);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware (stateless cookie-session for Serverless)
app.use(
  cookieSession({
    name: 'session',
    keys: [config.sessionSecret || 'your-secret-key'],
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    secure: config.nodeEnv === 'production',
    httpOnly: true,
    sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
  })
);

// Passport 0.6.0+ requires req.session.regenerate and save, which cookie-session doesn't provide.
app.use((req, _res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb: (err: Error | null) => void) => {
      cb(null);
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb: (err: Error | null) => void) => {
      cb(null);
    };
  }
  next();
});

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Logging Middleware
app.use(requestLogger);

// Health Check Endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', apiRoutes);

// Error Handling Middleware (must be last)
app.use(errorHandler);

const PORT = config.port;

let server;
if (!process.env.VERCEL) {
  server = app.listen(PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

export { app, server };
