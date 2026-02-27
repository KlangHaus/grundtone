/**
 * Centralized error handling utilities for Grundtone UI
 * Provides structured error reporting and user-friendly fallbacks
 */

export interface ErrorContext {
  component?: string;
  action?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, unknown>;
}

export interface ErrorBoundaryOptions {
  fallback?: () => void;
  onError?: (error: Error, context?: ErrorContext) => void;
  silent?: boolean;
}

/**
 * Structured error reporter for component errors
 */
export class ComponentError extends Error {
  public readonly context: ErrorContext;
  public readonly timestamp: Date;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'ComponentError';
    this.context = context;
    this.timestamp = new Date();
  }
}

/**
 * Creates a safe error handler that catches errors and provides fallbacks
 */
export function createErrorBoundary(options: ErrorBoundaryOptions = {}) {
  const { fallback, onError, silent = false } = options;

  return function errorBoundary<T extends (...args: any[]) => any>(
    fn: T,
    context?: ErrorContext,
  ): T {
    return ((...args: Parameters<T>): ReturnType<T> | void => {
      try {
        return fn(...args);
      } catch (error) {
        const componentError =
          error instanceof ComponentError
            ? error
            : new ComponentError(
                error instanceof Error ? error.message : String(error),
                context,
              );

        // Call custom error handler if provided
        if (onError) {
          onError(componentError, context);
        }

        // Log to console in development only
        if (process.env.NODE_ENV === 'development' && !silent) {
          // eslint-disable-next-line no-console
          console.error('[Grundtone UI Error]', {
            message: componentError.message,
            context: componentError.context,
            timestamp: componentError.timestamp,
            stack: componentError.stack,
          });
        }

        // Execute fallback if provided
        if (fallback) {
          fallback();
        }

        // Re-throw critical errors
        if (context?.severity === 'critical') {
          throw componentError;
        }
      }
    }) as T;
  };
}

/**
 * Safe logger that respects environment and provides structured output
 */
export const logger = {
  warn(message: string, context?: ErrorContext) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('[Grundtone UI Warning]', {
        message,
        context,
        timestamp: new Date().toISOString(),
      });
    }
  },

  error(message: string, context?: ErrorContext) {
    const error = new ComponentError(message, context);

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('[Grundtone UI Error]', {
        message: error.message,
        context: error.context,
        timestamp: error.timestamp.toISOString(),
      });
    }

    return error;
  },

  info(message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[Grundtone UI Info]', {
        message,
        data,
        timestamp: new Date().toISOString(),
      });
    }
  },
};

/**
 * Storage error handler with graceful fallbacks
 */
export function createStorageHandler(
  storageType: 'localStorage' | 'sessionStorage' = 'localStorage',
) {
  const storage = typeof window !== 'undefined' ? window[storageType] : null;

  return {
    get(key: string, fallback: string | null = null): string | null {
      if (!storage) {
        logger.warn('Storage not available', {
          component: 'StorageHandler',
          action: 'get',
          severity: 'low',
          metadata: { key, storageType },
        });
        return fallback;
      }

      try {
        return storage.getItem(key);
      } catch (error) {
        logger.error('Storage read failed', {
          component: 'StorageHandler',
          action: 'get',
          severity: 'medium',
          metadata: { key, storageType, error: String(error) },
        });
        return fallback;
      }
    },

    set(key: string, value: string): boolean {
      if (!storage) {
        logger.warn('Storage not available', {
          component: 'StorageHandler',
          action: 'set',
          severity: 'low',
          metadata: { key, storageType },
        });
        return false;
      }

      try {
        storage.setItem(key, value);
        return true;
      } catch (error) {
        logger.error('Storage write failed', {
          component: 'StorageHandler',
          action: 'set',
          severity: 'medium',
          metadata: { key, storageType, error: String(error) },
        });
        return false;
      }
    },

    remove(key: string): boolean {
      if (!storage) {
        logger.warn('Storage not available', {
          component: 'StorageHandler',
          action: 'remove',
          severity: 'low',
          metadata: { key, storageType },
        });
        return false;
      }

      try {
        storage.removeItem(key);
        return true;
      } catch (error) {
        logger.error('Storage remove failed', {
          component: 'StorageHandler',
          action: 'remove',
          severity: 'medium',
          metadata: { key, storageType, error: String(error) },
        });
        return false;
      }
    },
  };
}

/**
 * Asset loading error handler
 */
export function createAssetHandler() {
  return {
    loadIcon(name: string, fallback?: () => void): boolean {
      try {
        // Icon loading logic would go here
        // For now, simulate that icon loading might fail
        if (Math.random() > 0.5) {
          throw new Error('Icon not found');
        }
        return true;
      } catch (error) {
        logger.warn('Icon not found', {
          component: 'IconProvider',
          action: 'loadIcon',
          severity: 'low',
          metadata: { iconName: name, error: String(error) },
        });

        if (fallback) {
          fallback();
        }

        return false;
      }
    },
  };
}

/**
 * Validation error handler
 */
export function createValidationHandler() {
  return {
    validateRequired<T>(value: T, fieldName: string): T {
      if (value === null || value === undefined || value === '') {
        throw logger.error(`${fieldName} is required`, {
          component: 'ValidationHandler',
          action: 'validateRequired',
          severity: 'high',
          metadata: { fieldName, value },
        });
      }
      return value;
    },

    validateType<T>(
      value: unknown,
      expectedType: string,
      fieldName: string,
    ): T {
      if (typeof value !== expectedType) {
        throw logger.error(`${fieldName} must be of type ${expectedType}`, {
          component: 'ValidationHandler',
          action: 'validateType',
          severity: 'high',
          metadata: {
            fieldName,
            expectedType,
            actualType: typeof value,
            value,
          },
        });
      }
      return value as T;
    },
  };
}
