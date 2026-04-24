/**
 * Validation Utility
 * Provides helper functions for data validation
 * Follows: DRY (Don't Repeat Yourself), Single Responsibility Principle
 */

/**
 * Validates if a value is a non-empty string
 */
export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates if a value is a valid email
 */
export function isValidEmail(email: unknown): boolean {
  if (!isValidString(email)) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a value is a positive number
 */
export function isValidPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && value > 0 && Number.isFinite(value);
}

/**
 * Validates if a value is within a range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Type guard for non-null values
 */
export function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
