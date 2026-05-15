/**
 * Environment Configuration
 * Centralizes all configuration based on environment variables
 */

import 'dotenv/config';

interface Config {
  port: number;
  frontendUrl: string;
  env: 'development' | 'production' | 'test';
  nodeEnv: 'development' | 'production' | 'test';
  sessionSecret: string;
  cors: {
    origin: string[];
    credentials: boolean;
  };
  logging: {
    level: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
}

/**
 * Parse environment variables and return configuration object
 */
function getConfig(): Config {
  const env = (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test';
  const port = parseInt(process.env.PORT || '3000', 10);
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
  const sessionSecret = process.env.SESSION_SECRET || 'dev-session-secret-change-in-production';

  const corsOrigin = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:4200', 'http://localhost:3000'];

  const loggingLevel = process.env.LOG_LEVEL || 'info';

  return {
    port,
    frontendUrl,
    env,
    nodeEnv: env,
    sessionSecret,
    cors: {
      origin: corsOrigin,
      credentials: true,
    },
    logging: {
      level: loggingLevel,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  };
}

export const config = getConfig();
