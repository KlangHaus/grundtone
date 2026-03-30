import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import {
  resolveThemeMode,
  getSystemIsDark,
  getSystemThemeMode,
  persistThemeMode,
  loadPersistedThemeMode,
  camelToKebab,
  THEME_STORAGE_KEY,
} from './theme-mode';

describe('resolveThemeMode', () => {
  it('returns light when mode is light', () => {
    expect(resolveThemeMode('light', false)).toBe('light');
    expect(resolveThemeMode('light', true)).toBe('light');
  });

  it('returns dark when mode is dark', () => {
    expect(resolveThemeMode('dark', false)).toBe('dark');
    expect(resolveThemeMode('dark', true)).toBe('dark');
  });

  it('returns light when mode is auto and system is light', () => {
    expect(resolveThemeMode('auto', false)).toBe('light');
  });

  it('returns dark when mode is auto and system is dark', () => {
    expect(resolveThemeMode('auto', true)).toBe('dark');
  });
});

describe('camelToKebab', () => {
  it('converts camelCase to kebab-case', () => {
    expect(camelToKebab('primaryLight')).toBe('primary-light');
    expect(camelToKebab('onPrimary')).toBe('on-primary');
    expect(camelToKebab('textSecondary')).toBe('text-secondary');
    expect(camelToKebab('backgroundAlt')).toBe('background-alt');
    expect(camelToKebab('modalBackdrop')).toBe('modal-backdrop');
  });

  it('leaves lowercase strings unchanged', () => {
    expect(camelToKebab('primary')).toBe('primary');
    expect(camelToKebab('text')).toBe('text');
  });

  it('handles consecutive uppercase letters', () => {
    expect(camelToKebab('easeInOut')).toBe('ease-in-out');
  });
});

describe('localStorage utilities', () => {
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    const storage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
    };
    vi.stubGlobal('window', { localStorage: storage });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('persistThemeMode stores mode', () => {
    persistThemeMode('dark');
    expect(store[THEME_STORAGE_KEY]).toBe('dark');
  });

  it('persistThemeMode uses custom key', () => {
    persistThemeMode('light', 'custom-key');
    expect(store['custom-key']).toBe('light');
  });

  it('loadPersistedThemeMode returns stored mode', () => {
    store[THEME_STORAGE_KEY] = 'dark';
    expect(loadPersistedThemeMode()).toBe('dark');
  });

  it('loadPersistedThemeMode returns null for invalid value', () => {
    store[THEME_STORAGE_KEY] = 'invalid';
    expect(loadPersistedThemeMode()).toBeNull();
  });

  it('loadPersistedThemeMode returns null when not set', () => {
    expect(loadPersistedThemeMode()).toBeNull();
  });

  it('roundtrips all modes', () => {
    for (const mode of ['light', 'dark', 'auto'] as const) {
      persistThemeMode(mode);
      expect(loadPersistedThemeMode()).toBe(mode);
    }
  });
});

describe('getSystemIsDark', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns false when window is undefined', () => {
    // window is already undefined in Node by default
    vi.stubGlobal('window', undefined);
    expect(getSystemIsDark()).toBe(false);
  });

  it('returns true when system prefers dark', () => {
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: true }),
    });
    expect(getSystemIsDark()).toBe(true);
  });

  it('returns false when system prefers light', () => {
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: false }),
    });
    expect(getSystemIsDark()).toBe(false);
  });
});

describe('getSystemThemeMode', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns dark when system prefers dark', () => {
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: true }),
    });
    expect(getSystemThemeMode()).toBe('dark');
  });

  it('returns light when system prefers light', () => {
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: false }),
    });
    expect(getSystemThemeMode()).toBe('light');
  });
});
