import type { Theme } from '@ipeeon/core';
import { createStorageHandler } from '../../utils/error-handling';

/**
 * Apply theme to DOM with optimized batch updates
 * PERFORMANCE: Uses requestAnimationFrame and batch updates to prevent DOM thrashing
 */
export function applyThemeToDOM(theme: Theme): void {
  // Use requestAnimationFrame to batch DOM updates in the next frame
  requestAnimationFrame(() => {
    const root = document.documentElement;

    // Build all properties as key-value pairs
    const properties: Record<string, string> = {};

    // Colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      properties[`--haspen-color-${key}`] = value;
    });

    // Spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      properties[`--haspen-spacing-${key}`] = value;
    });

    // Typography
    Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
      properties[`--haspen-font-family-${key}`] = value;
    });

    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      properties[`--haspen-font-size-${key}`] = value;
    });

    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      properties[`--haspen-font-weight-${key}`] = String(value);
    });

    Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
      properties[`--haspen-line-height-${key}`] = String(value);
    });

    // Shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      properties[`--haspen-shadow-${key}`] = value;
    });

    // Radius
    Object.entries(theme.radius).forEach(([key, value]) => {
      properties[`--haspen-radius-${key}`] = value;
    });

    // Transitions
    Object.entries(theme.transitions.duration).forEach(([key, value]) => {
      properties[`--haspen-transition-duration-${key}`] = value;
    });

    Object.entries(theme.transitions.timing).forEach(([key, value]) => {
      properties[`--haspen-transition-timing-${key}`] = value;
    });

    // Apply all properties in a single batch
    // This is the most efficient way to update multiple CSS properties
    const cssText = Object.entries(properties)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    // Preserve existing inline styles while adding theme properties
    const existingStyles = root.getAttribute('style') || '';
    const cleanedExisting = existingStyles
      .split(';')
      .filter(rule => rule.trim() && !rule.includes('--haspen-'))
      .join(';');

    root.setAttribute(
      'style',
      cleanedExisting ? `${cleanedExisting}; ${cssText}` : cssText,
    );

    // Set theme mode attribute after style update
    root.setAttribute('data-theme', theme.mode);
  });
}

export function getSystemThemeMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function getStoredThemeMode(
  storageKey: string,
): 'light' | 'dark' | 'auto' | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storage = createStorageHandler('localStorage');
  const stored = storage.get(storageKey);

  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }

  return null;
}

export function storeThemeMode(
  storageKey: string,
  mode: 'light' | 'dark' | 'auto',
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const storage = createStorageHandler('localStorage');
  storage.set(storageKey, mode);
}

export function mergeThemes(base: Theme, override?: Partial<Theme>): Theme {
  if (!override) {
    return base;
  }

  return {
    ...base,
    ...override,
    colors: { ...base.colors, ...override.colors },
    spacing: { ...base.spacing, ...override.spacing },
    typography: {
      ...base.typography,
      ...override.typography,
      fontFamily: {
        ...base.typography.fontFamily,
        ...override.typography?.fontFamily,
      },
      fontSize: {
        ...base.typography.fontSize,
        ...override.typography?.fontSize,
      },
      fontWeight: {
        ...base.typography.fontWeight,
        ...override.typography?.fontWeight,
      },
      lineHeight: {
        ...base.typography.lineHeight,
        ...override.typography?.lineHeight,
      },
    },
    shadows: { ...base.shadows, ...override.shadows },
    radius: { ...base.radius, ...override.radius },
    transitions: {
      ...base.transitions,
      ...override.transitions,
      duration: {
        ...base.transitions.duration,
        ...override.transitions?.duration,
      },
      timing: { ...base.transitions.timing, ...override.transitions?.timing },
    },
  };
}
