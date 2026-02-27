/**
 * Icon Provider for custom icon system
 * Simplified to only support custom icon components
 */

import type { InjectionKey, Component } from 'vue';

export interface IconConfig {
  /**
   * Custom icon components registry
   */
  icons: Record<string, Component>;

  /**
   * CSS class prefix for icons
   * @default ''
   */
  prefix?: string;

  /**
   * Default icon size
   * @default 16
   */
  defaultSize?: number;
}

export const ICON_PROVIDER_KEY: InjectionKey<IconConfig> = Symbol(
  'grundtone-icon-provider',
);

/**
 * Default icon configuration
 */
export const defaultIconConfig: IconConfig = {
  icons: {},
  prefix: '',
  defaultSize: 16,
};

/**
 * Utility function to create icon configuration
 */
export function createIconConfig(config: Partial<IconConfig> = {}): IconConfig {
  return {
    ...defaultIconConfig,
    ...config,
  };
}

/**
 * Built-in icon registry for common icons
 * These can be imported individually to keep bundle size small
 */
export { default as SunIcon } from './SunIcon.vue';
export { default as MoonIcon } from './MoonIcon.vue';
