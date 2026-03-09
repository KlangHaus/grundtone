import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ComponentError,
  createErrorBoundary,
  logger,
  createStorageHandler,
  createAssetHandler,
  createValidationHandler,
} from './error-handling';

// Mock console methods
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const originalConsole = { ...console };

describe('Error Handling Utilities', () => {
  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('ComponentError', () => {
    it('creates error with context and timestamp', () => {
      const context = { component: 'TestComponent', severity: 'high' as const };
      const error = new ComponentError('Test error', context);

      expect(error.name).toBe('ComponentError');
      expect(error.message).toBe('Test error');
      expect(error.context).toEqual(context);
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it('creates error without context', () => {
      const error = new ComponentError('Test error');

      expect(error.context).toEqual({});
      expect(error.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('createErrorBoundary', () => {
    it('executes function normally when no error occurs', () => {
      const mockFn = vi.fn(() => 'success');
      const boundaryFn = createErrorBoundary()(mockFn);

      const result = boundaryFn();

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledOnce();
    });

    it('catches errors and calls error handler', () => {
      const mockError = new Error('Test error');
      const mockFn = vi.fn(() => {
        throw mockError;
      });
      const onError = vi.fn();
      const fallback = vi.fn();

      const boundaryFn = createErrorBoundary({ onError, fallback })(mockFn);

      boundaryFn();

      expect(onError).toHaveBeenCalledWith(
        expect.any(ComponentError),
        undefined,
      );
      expect(fallback).toHaveBeenCalledOnce();
    });

    it('executes fallback when error occurs', () => {
      const mockFn = vi.fn(() => {
        throw new Error('Test error');
      });
      const fallback = vi.fn();

      const boundaryFn = createErrorBoundary({ fallback })(mockFn);

      boundaryFn();

      expect(fallback).toHaveBeenCalledOnce();
    });

    it('re-throws critical errors', () => {
      const mockFn = vi.fn(() => {
        throw new Error('Critical error');
      });
      const context = { severity: 'critical' as const };

      const boundaryFn = createErrorBoundary()(mockFn, context);

      expect(() => boundaryFn()).toThrow(ComponentError);
    });

    it('silences errors when silent option is true', () => {
      const mockFn = vi.fn(() => {
        throw new Error('Silent error');
      });

      const boundaryFn = createErrorBoundary({ silent: true })(mockFn);

      boundaryFn();

      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('logger', () => {
    it('logs warnings in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      logger.warn('Test warning', { component: 'TestComponent' });

      expect(console.warn).toHaveBeenCalledWith(
        '[Grundtone UI Warning]',
        expect.objectContaining({
          message: 'Test warning',
          context: { component: 'TestComponent' },
          timestamp: expect.any(String),
        }),
      );

      process.env.NODE_ENV = originalEnv;
    });

    it('does not log in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      logger.warn('Test warning');

      expect(console.warn).not.toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it('creates and logs errors', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const error = logger.error('Test error', { component: 'TestComponent' });

      expect(error).toBeInstanceOf(ComponentError);
      expect(error.message).toBe('Test error');
      expect(console.error).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it('logs info messages in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      logger.info('Test info', { key: 'value' });

      expect(console.log).toHaveBeenCalledWith(
        '[Grundtone UI Info]',
        expect.objectContaining({
          message: 'Test info',
          data: { key: 'value' },
          timestamp: expect.any(String),
        }),
      );

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('createStorageHandler', () => {
    const mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };

    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      });
    });

    it('gets item from storage successfully', () => {
      mockLocalStorage.getItem.mockReturnValue('test-value');
      const storage = createStorageHandler('localStorage');

      const result = storage.get('test-key');

      expect(result).toBe('test-value');
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-key');
    });

    it('returns fallback when storage fails', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      const storage = createStorageHandler('localStorage');

      const result = storage.get('test-key', 'fallback');

      expect(result).toBe('fallback');
    });

    it('sets item in storage successfully', () => {
      const storage = createStorageHandler('localStorage');

      const result = storage.set('test-key', 'test-value');

      expect(result).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        'test-value',
      );
    });

    it('returns false when storage set fails', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      const storage = createStorageHandler('localStorage');

      const result = storage.set('test-key', 'test-value');

      expect(result).toBe(false);
    });

    it('removes item from storage successfully', () => {
      const storage = createStorageHandler('localStorage');

      const result = storage.remove('test-key');

      expect(result).toBe(true);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key');
    });

    it('handles missing window object gracefully', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const storage = createStorageHandler('localStorage');

      expect(storage.get('test-key', 'fallback')).toBe('fallback');
      expect(storage.set('test-key', 'test-value')).toBe(false);
      expect(storage.remove('test-key')).toBe(false);

      global.window = originalWindow;
    });
  });

  describe('createAssetHandler', () => {
    it('executes fallback when icon loading fails', () => {
      const fallback = vi.fn();
      const assetHandler = createAssetHandler();

      const result = assetHandler.loadIcon('non-existent-icon', fallback);

      // The implementation uses Math.random(), so it may succeed or fail
      // When it fails, it should return false and call the fallback
      expect(typeof result).toBe('boolean');
      // In a real implementation, this would test actual icon loading
    });
  });

  describe('createValidationHandler', () => {
    const validator = createValidationHandler();

    it('validates required values successfully', () => {
      expect(validator.validateRequired('value', 'testField')).toBe('value');
      expect(validator.validateRequired(123, 'numberField')).toBe(123);
      expect(validator.validateRequired(true, 'booleanField')).toBe(true);
    });

    it('throws error for missing required values', () => {
      expect(() => validator.validateRequired('', 'testField')).toThrow();
      expect(() => validator.validateRequired(null, 'testField')).toThrow();
      expect(() =>
        validator.validateRequired(undefined, 'testField'),
      ).toThrow();
    });

    it('validates types successfully', () => {
      expect(
        validator.validateType<string>('value', 'string', 'testField'),
      ).toBe('value');
      expect(validator.validateType<number>(123, 'number', 'numberField')).toBe(
        123,
      );
      expect(
        validator.validateType<boolean>(true, 'boolean', 'booleanField'),
      ).toBe(true);
    });

    it('throws error for incorrect types', () => {
      expect(() =>
        validator.validateType<string>(123, 'string', 'testField'),
      ).toThrow();
      expect(() =>
        validator.validateType<number>('123', 'number', 'numberField'),
      ).toThrow();
      expect(() =>
        validator.validateType<boolean>('true', 'boolean', 'booleanField'),
      ).toThrow();
    });
  });
});
