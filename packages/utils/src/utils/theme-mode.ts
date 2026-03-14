/**
 * Shared theme mode utilities — platform-agnostic.
 *
 * Used by both Vue and React Native to resolve, persist, and detect theme mode.
 */

/**
 * Theme mode — matches @grundtone/core's ThemeMode.
 * Defined locally to avoid circular dependency between utils and core.
 */
export type ThemeMode = 'light' | 'dark' | 'auto';
export type ResolvedMode = 'light' | 'dark';

/** Default localStorage key for persisted theme mode. */
export const THEME_STORAGE_KEY = 'grundtone-theme-mode';

/**
 * Resolve a ThemeMode to a concrete 'light' or 'dark' value.
 * When mode is 'auto', uses the systemIsDark flag to decide.
 */
export function resolveThemeMode(
  mode: ThemeMode,
  systemIsDark: boolean,
): ResolvedMode {
  if (mode === 'auto') return systemIsDark ? 'dark' : 'light';
  return mode;
}

/**
 * Check if the system prefers dark mode.
 * Web only — uses matchMedia. SSR-safe (returns false on server).
 */
export function getSystemIsDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Persist theme mode to localStorage.
 * Web only, SSR-safe — no-op on server or when localStorage is unavailable.
 */
export function persistThemeMode(
  mode: ThemeMode,
  key = THEME_STORAGE_KEY,
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, mode);
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
}

/**
 * Load persisted theme mode from localStorage.
 * Returns null if no valid mode is stored. SSR-safe.
 */
export function loadPersistedThemeMode(
  key = THEME_STORAGE_KEY,
): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === 'light' || stored === 'dark' || stored === 'auto')
      return stored;
  } catch {
    // localStorage unavailable
  }
  return null;
}

/**
 * Get the system theme mode as a resolved string.
 * Web only, SSR-safe (returns 'light' on server).
 */
export function getSystemThemeMode(): ResolvedMode {
  return getSystemIsDark() ? 'dark' : 'light';
}

/**
 * Convert camelCase to kebab-case.
 * Used for mapping theme object keys to CSS custom property names.
 *
 * @example camelToKebab('primaryLight') → 'primary-light'
 * @example camelToKebab('onPrimary') → 'on-primary'
 */
export function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
}
