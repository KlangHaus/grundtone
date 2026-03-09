/**
 * Utilities for working with different icon libraries
 */

import type { IconConfig } from './provider';
import { SunIcon, MoonIcon } from './provider';

/**
 * Built-in Grundtone icons
 * These are always available without external dependencies
 */
export const grundtoneIcons = {
  sun: SunIcon,
  moon: MoonIcon,
};

/**
 * Create configuration for Heroicons
 * Requires @heroicons/vue to be installed
 */
export function createHeroiconsConfig(
  options: {
    variant?: 'outline' | 'solid' | 'mini';
    prefix?: string;
  } = {},
): Partial<IconConfig> {
  return {
    library: 'heroicons',
    prefix: options.prefix || 'heroicon',
    libraryConfig: {
      heroicons: {
        variant: options.variant || 'outline',
      },
    },
  };
}

/**
 * Create configuration for Lucide icons
 * Requires lucide-vue-next to be installed
 */
export function createLucideConfig(
  options: {
    strokeWidth?: number;
    prefix?: string;
  } = {},
): Partial<IconConfig> {
  return {
    library: 'lucide',
    prefix: options.prefix || 'lucide',
    libraryConfig: {
      lucide: {
        strokeWidth: options.strokeWidth || 2,
      },
    },
  };
}

/**
 * Create configuration for custom icons
 */
export function createCustomIconsConfig(
  icons: Record<string, any>,
  options: {
    prefix?: string;
    includeBuiltIn?: boolean;
  } = {},
): Partial<IconConfig> {
  const allIcons = options.includeBuiltIn
    ? { ...grundtoneIcons, ...icons }
    : icons;

  return {
    library: 'custom',
    icons: allIcons,
    prefix: options.prefix || '',
  };
}

/**
 * Hybrid configuration that supports multiple libraries
 * Falls back to custom icons if external library fails
 */
export function createHybridIconsConfig(
  options: {
    primary: 'heroicons' | 'lucide';
    fallbackIcons?: Record<string, any>;
    prefix?: string;
  } = { primary: 'heroicons' },
): Partial<IconConfig> {
  const fallbacks = {
    ...grundtoneIcons,
    ...options.fallbackIcons,
  };

  if (options.primary === 'heroicons') {
    return {
      ...createHeroiconsConfig({ prefix: options.prefix }),
      icons: fallbacks,
    };
  }

  if (options.primary === 'lucide') {
    return {
      ...createLucideConfig({ prefix: options.prefix }),
      icons: fallbacks,
    };
  }

  return createCustomIconsConfig(fallbacks, { prefix: options.prefix });
}

/**
 * Common icon name mappings between libraries
 * Helps with migration between different icon libraries
 */
export const iconMappings = {
  // Common icon names across libraries
  common: {
    'chevron-up': ['ChevronUp', 'chevron-up', 'arrow-up'],
    'chevron-down': ['ChevronDown', 'chevron-down', 'arrow-down'],
    'chevron-left': ['ChevronLeft', 'chevron-left', 'arrow-left'],
    'chevron-right': ['ChevronRight', 'chevron-right', 'arrow-right'],
    x: ['X', 'x', 'close'],
    menu: ['Menu', 'menu', 'bars'],
    search: ['Search', 'search', 'magnifying-glass'],
    sun: ['Sun', 'sun', 'light-mode'],
    moon: ['Moon', 'moon', 'dark-mode'],
    user: ['User', 'user', 'person'],
    home: ['Home', 'home', 'house'],
    settings: ['Settings', 'settings', 'cog'],
  },

  // Heroicons to Lucide mapping
  heroiconsToLucide: {
    'chevron-up': 'ChevronUp',
    'chevron-down': 'ChevronDown',
    'chevron-left': 'ChevronLeft',
    'chevron-right': 'ChevronRight',
    'x-mark': 'X',
    'bars-3': 'Menu',
    'magnifying-glass': 'Search',
    sun: 'Sun',
    moon: 'Moon',
    user: 'User',
    home: 'Home',
    cog: 'Settings',
  },

  // Lucide to Heroicons mapping
  lucideToHeroicons: {
    ChevronUp: 'chevron-up',
    ChevronDown: 'chevron-down',
    ChevronLeft: 'chevron-left',
    ChevronRight: 'chevron-right',
    X: 'x-mark',
    Menu: 'bars-3',
    Search: 'magnifying-glass',
    Sun: 'sun',
    Moon: 'moon',
    User: 'user',
    Home: 'home',
    Settings: 'cog',
  },
};

/**
 * Convert icon name between libraries
 */
export function mapIconName(
  iconName: string,
  from: 'heroicons' | 'lucide',
  to: 'heroicons' | 'lucide',
): string {
  if (from === to) return iconName;

  if (from === 'heroicons' && to === 'lucide') {
    return iconMappings.heroiconsToLucide[iconName] || iconName;
  }

  if (from === 'lucide' && to === 'heroicons') {
    return iconMappings.lucideToHeroicons[iconName] || iconName;
  }

  return iconName;
}
