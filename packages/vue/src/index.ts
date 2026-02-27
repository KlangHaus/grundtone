// Atoms
export { Button } from './atoms/Button';
export { ThemeToggle } from './atoms/ThemeToggle';

// Icon System - Configurable
export {
  Icon,
  IconProvider,
  // Utilities
  grundtoneIcons,
  createHeroiconsConfig,
  createLucideConfig,
  createCustomIconsConfig,
  createHybridIconsConfig,
  iconMappings,
  mapIconName,
  // Composables
  useIconConfig,
  useIconExists,
  useAvailableIcons,
  createIconRegistry,
} from './atoms/Icon';

// Icon System - Individual Icons (for backward compatibility)
export { SunIcon, MoonIcon } from './atoms/Icon';

// Molecules
export { ThemeProvider } from './molecules/ThemeProvider';

// Types
export * from './types';
export type { ThemeToggleProps, ThemeToggleEmits } from './atoms/ThemeToggle';

// Icon System Types
export type {
  IconProps,
  ConfigurableIconProps,
  IconLibrary,
  IconRegistry,
  IconConfig,
} from './atoms/Icon';
// export { InputGroup } from './molecules/InputGroup'
// export { FormField } from './molecules/FormField'
// export { Card } from './molecules/Card'

// Organisms
// export { Header } from './organisms/Header'
// export { Footer } from './organisms/Footer'
// export { Modal } from './organisms/Modal'

// Templates
// export { DefaultLayout } from './templates/DefaultLayout'
// export { AuthLayout } from './templates/AuthLayout'

// Pages
// export { HomePage } from './pages/HomePage'
// export { LoginPage } from './pages/LoginPage'
