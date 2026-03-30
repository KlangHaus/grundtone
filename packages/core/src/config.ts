export interface GrundtoneConfig {
  /**
   * Prefix for component names in auto-import contexts (Nuxt).
   * Also used as CSS class prefix for all components.
   *
   * @default 'GT'
   *
   * @example
   * // Default: <GTButton>, .gt-btn
   * // Custom:  <KHButton>, .kh-btn
   * defineGrundtoneConfig({ prefix: 'KH' })
   */
  prefix: string;

  /**
   * Default color for icons. Uses any valid CSS color value.
   * Icons inherit parent text color via `currentColor` by default.
   *
   * @default 'currentColor'
   *
   * @example
   * defineGrundtoneConfig({ iconColor: 'var(--color-text-secondary)' })
   */
  iconColor: string;
}

const defaultConfig: GrundtoneConfig = {
  prefix: 'GT',
  iconColor: 'currentColor',
};

let currentConfig: GrundtoneConfig = { ...defaultConfig };

/**
 * Configure Grundtone for your project. Call this once at app startup,
 * before any components are rendered.
 *
 * @example
 * // In main.ts or nuxt.config.ts
 * import { defineGrundtoneConfig } from '@grundtone/core';
 *
 * defineGrundtoneConfig({
 *   prefix: 'KH', // Components become <KHButton>, CSS becomes .kh-btn
 * });
 */
export function defineGrundtoneConfig(
  config: Partial<GrundtoneConfig>,
): GrundtoneConfig {
  currentConfig = { ...defaultConfig, ...config };
  return currentConfig;
}

/**
 * Get the current Grundtone configuration.
 */
export function getGrundtoneConfig(): GrundtoneConfig {
  return currentConfig;
}

/**
 * Get the CSS class prefix (lowercase version of prefix).
 *
 * @example
 * getClassPrefix() // 'gt' (default)
 * // After defineGrundtoneConfig({ prefix: 'KH' })
 * getClassPrefix() // 'kh'
 */
export function getClassPrefix(): string {
  return currentConfig.prefix.toLowerCase();
}

/**
 * Get the default icon color.
 *
 * @example
 * getIconColor() // 'currentColor' (default)
 * // After defineGrundtoneConfig({ iconColor: 'var(--color-primary)' })
 * getIconColor() // 'var(--color-primary)'
 */
export function getIconColor(): string {
  return currentConfig.iconColor;
}
