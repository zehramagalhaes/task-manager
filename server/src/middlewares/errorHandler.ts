import { type Request, type Response, type NextFunction } from 'express';

/**
 * Custom Error class for application errors
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Global error handling middleware
 * Catches and formats all errors in a consistent manner
 */
export function errorHandler(
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Set default error properties
  let statusCode = 500;
  let message = 'Internal Server Error';
  let isOperational = false;

  // Handle AppError instances
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    isOperational = error.isOperational;
  }

  // Log error
  console.error({
    statusCode,
    message,
    isOperational,
    stack: error.stack,
  });

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
}
