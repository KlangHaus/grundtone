// Configurable Icon System
export { default as Icon } from './Icon.vue';
export { default as IconProvider } from './IconProvider.vue';

// Individual Icons (for backward compatibility)
export { default as SunIcon } from './SunIcon.vue';
export { default as MoonIcon } from './MoonIcon.vue';

// Provider utilities
export {
  createIconConfig,
  defaultIconConfig,
  ICON_PROVIDER_KEY,
  type IconConfig,
  type IconLibrary as ProviderIconLibrary,
} from './provider';

// Library utilities
export {
  grundtoneIcons,
  createHeroiconsConfig,
  createLucideConfig,
  createCustomIconsConfig,
  createHybridIconsConfig,
  iconMappings,
  mapIconName,
} from './libraries';

// Composables
export {
  useIconConfig,
  useIconExists,
  useAvailableIcons,
  createIconRegistry,
} from './composables';

// Types
export type {
  IconProps,
  ConfigurableIconProps,
  IconLibrary,
  IconRegistry,
} from './types';
