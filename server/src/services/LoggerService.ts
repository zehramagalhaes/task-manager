/**
 * Logger Service
 * Abstracts logging functionality
 * Follows: Single Responsibility Principle, Dependency Inversion Principle
 */

export interface ILogger {
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
  debug(message: string, data?: unknown): void;
}

/**
 * Console-based logger implementation
 */
export class ConsoleLogger implements ILogger {
  info(message: string, data?: unknown): void {
    console.log(`[INFO] ${message}`, data ?? '');
  }

  warn(message: string, data?: unknown): void {
    console.warn(`[WARN] ${message}`, data ?? '');
  }

  error(message: string, data?: unknown): void {
    console.error(`[ERROR] ${message}`, data ?? '');
  }

  debug(message: string, data?: unknown): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data ?? '');
    }
  }
}

// Singleton instance
export const logger = new ConsoleLogger();
