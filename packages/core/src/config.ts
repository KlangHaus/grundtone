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
}

const defaultConfig: GrundtoneConfig = {
  prefix: 'GT',
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
