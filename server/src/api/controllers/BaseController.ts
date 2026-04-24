import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../middlewares/errorHandler.js';

/**
 * Base Controller Class
 * Provides common functionality for all controllers
 * Follows: DRY, Single Responsibility Principle
 */
export abstract class BaseController {
  /**
   * Sends a successful response
   */
  protected sendSuccess(
    res: Response,
    data: unknown,
    statusCode = 200,
  ): Response {
    return res.status(statusCode).json({
      status: 'success',
      data,
    });
  }

  /**
   * Sends a paginated response
   */
  protected sendPaginated(
    res: Response,
    data: unknown[],
    total: number,
    page: number,
    limit: number,
    statusCode = 200,
  ): Response {
    return res.status(statusCode).json({
      status: 'success',
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  /**
   * Wraps async controller methods to handle errors
   */
  protected catchAsync(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  ) {
    return (req: Request, res: Response, next: NextFunction): void => {
      fn(req, res, next).catch(next);
    };
  }

  /**
   * Throws an application error
   */
  protected throwError(statusCode: number, message: string): never {
    throw new AppError(statusCode, message, true);
  }

  /**
   * Validates required fields in request body
   */
  protected validateRequiredFields(body: Record<string, unknown>, fields: string[]): void {
    const missingFields = fields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      this.throwError(400, `Missing required fields: ${missingFields.join(', ')}`);
    }
  }
}
