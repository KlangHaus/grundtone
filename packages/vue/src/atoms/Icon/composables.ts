/**
 * Composables for working with the icon system
 */

import { inject, computed } from 'vue';
import { ICON_PROVIDER_KEY, defaultIconConfig } from './provider';
import type { IconConfig, IconLibrary } from './provider';

/**
 * Use icon configuration from the nearest IconProvider
 */
export function useIconConfig(): IconConfig {
  return inject(ICON_PROVIDER_KEY, defaultIconConfig);
}

/**
 * Check if an icon exists in the current configuration
 */
export function useIconExists(name: string, library?: IconLibrary) {
  const config = useIconConfig();
  const targetLibrary = library || config.library;

  return computed(() => {
    if (targetLibrary === 'custom') {
      return name in config.icons;
    }

    // For external libraries, we assume the icon exists
    // The actual check happens at runtime during dynamic import
    return true;
  });
}

/**
 * Get available icons from the current configuration
 */
export function useAvailableIcons() {
  const config = useIconConfig();

  return computed(() => {
    if (config.library === 'custom') {
      return Object.keys(config.icons);
    }

    // For external libraries, we can't easily enumerate icons
    // This would need to be provided as part of the config
    return [];
  });
}

/**
 * Create an icon registry helper
 */
export function createIconRegistry() {
  const icons: Record<string, any> = {};

  const register = (name: string, component: any) => {
    icons[name] = component;
  };

  const unregister = (name: string) => {
    delete icons[name];
  };

  const get = (name: string) => {
    return icons[name];
  };

  const has = (name: string) => {
    return name in icons;
  };

  const list = () => {
    return Object.keys(icons);
  };

  const getAll = () => {
    return { ...icons };
  };

  return {
    register,
    unregister,
    get,
    has,
    list,
    getAll,
    icons: computed(() => icons),
  };
}
