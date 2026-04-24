/**
 * Environment Configuration
 * Centralizes all configuration based on environment variables
 */

interface Config {
  port: number;
  env: 'development' | 'production' | 'test';
  cors: {
    origin: string[];
    credentials: boolean;
  };
  logging: {
    level: string;
  };
}

/**
 * Parse environment variables and return configuration object
 */
function getConfig(): Config {
  const env = (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test';
  const port = parseInt(process.env.PORT || '3000', 10);

  const corsOrigin = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:4200', 'http://localhost:3000'];

  const loggingLevel = process.env.LOG_LEVEL || 'info';

  return {
    port,
    env,
    cors: {
      origin: corsOrigin,
      credentials: true,
    },
    logging: {
      level: loggingLevel,
    },
  };
}

export const config = getConfig();
