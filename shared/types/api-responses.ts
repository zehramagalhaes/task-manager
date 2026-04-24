/**
 * Shared API Response Types
 * Used across both client and server
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  statusCode?: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  status: 'success' | 'error';
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

/**
 * Error response
 */
export interface ErrorResponse {
  status: 'error';
  statusCode: number;
  message: string;
  stack?: string;
}

/**
 * Health check response
 */
export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime?: number;
}
