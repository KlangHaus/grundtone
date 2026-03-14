/**
 * Apply a Grundtone Theme to the DOM by setting CSS custom properties on :root.
 *
 * This allows runtime theming with createTheme() — overrides the static
 * design-system defaults and enables dynamic light/dark switching.
 */

import type { Theme, ThemeColors } from '@grundtone/core';
import { shadowLayersToCSS } from '@grundtone/core';
import { camelToKebab } from '@grundtone/utils';

/**
 * Apply a Theme object to the DOM as CSS custom properties.
 *
 * Sets color-scheme to match the theme's mode, then overrides all
 * CSS custom properties (--color-*, --space-*, --font-*, etc.).
 *
 * @param theme - Full Theme object from createTheme()
 * @param el - Target element (defaults to document.documentElement)
 */
export function applyThemeToDOM(theme: Theme, el?: HTMLElement): void {
  if (typeof document === 'undefined') return;

  const root = el ?? document.documentElement;

  // Set color-scheme so light-dark() CSS fallbacks work correctly
  root.style.setProperty(
    'color-scheme',
    theme.mode === 'dark' ? 'dark' : 'light',
  );

  // Colors
  for (const [key, value] of Object.entries(theme.colors) as [
    keyof ThemeColors,
    string,
  ][]) {
    root.style.setProperty(`--color-${camelToKebab(key)}`, value);
  }

  // Spacing
  for (const [key, value] of Object.entries(theme.spacing)) {
    root.style.setProperty(`--space-${key}`, value);
  }

  // Typography
  for (const [key, value] of Object.entries(theme.typography.fontFamily)) {
    root.style.setProperty(`--font-family-${key}`, value);
  }
  for (const [key, value] of Object.entries(theme.typography.fontSize)) {
    root.style.setProperty(`--font-size-${key}`, value);
  }
  for (const [key, value] of Object.entries(theme.typography.fontWeight)) {
    root.style.setProperty(`--font-weight-${key}`, String(value));
  }
  for (const [key, value] of Object.entries(theme.typography.lineHeight)) {
    root.style.setProperty(`--line-height-${key}`, String(value));
  }

  // Border radius
  for (const [key, value] of Object.entries(theme.radius)) {
    root.style.setProperty(`--radius-${key}`, value);
  }

  // Shadows — convert structured definitions to CSS strings
  for (const [key, layers] of Object.entries(theme.shadowDefinitions)) {
    root.style.setProperty(`--shadow-${key}`, shadowLayersToCSS(layers));
  }
  root.style.setProperty('--shadow-none', 'none');

  // Z-index
  for (const [key, value] of Object.entries(theme.zIndex)) {
    root.style.setProperty(`--z-${camelToKebab(key)}`, String(value));
  }

  // Transitions
  for (const [key, value] of Object.entries(theme.transitions.duration)) {
    root.style.setProperty(`--duration-${key}`, value);
  }
  for (const [key, value] of Object.entries(theme.transitions.timing)) {
    root.style.setProperty(`--${camelToKebab(key)}`, value);
  }
}
