import { type Request, type Response, type NextFunction } from 'express';

/**
 * Request logging middleware
 * Logs incoming requests with method, URL, and response time
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const startTime = Date.now();

  // Store original send function
  const originalSend = res.send;

  // Override send to log response
  res.send = function (data) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    console.log({
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });

    // Call original send
    return originalSend.call(this, data);
  };

  next();
}
