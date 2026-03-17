/**
 * @grundtone/react-native
 *
 * React Native theme provider and hooks for Grundtone design system.
 * Use tokens from @grundtone/core in your RN app.
 *
 * @example
 * import { GrundtoneThemeProvider, useGrundtoneTheme } from '@grundtone/react-native';
 * import { createTheme } from '@grundtone/core';
 *
 * const { light, dark } = createTheme({
 *   light: { colors: { primary: '#007aff' } },
 *   dark: { colors: { primary: '#0a84ff' } }
 * });
 *
 * function App() {
 *   return (
 *     <GrundtoneThemeProvider light={light} dark={dark}>
 *       <MyScreen />
 *     </GrundtoneThemeProvider>
 *   );
 * }
 *
 * function MyScreen() {
 *   const { theme } = useGrundtoneTheme();
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background }}>
 *       <Text style={{ color: theme.colors.text }}>Hello</Text>
 *     </View>
 *   );
 * }
 */

export { GrundtoneThemeProvider, GrundtoneThemeContext } from './ThemeContext';
export type { GrundtoneThemeContextValue, ThemeMode } from './ThemeContext';
export { useGrundtoneTheme } from './useGrundtoneTheme';
export { createTheme } from '@grundtone/core';
export type { Theme } from '@grundtone/core';

// Shadows
export { shadowToRN } from './shadows';
export type { RNShadowStyle } from './shadows';

// Components
export { GTIcon } from './components/Icon';
export type { IconProps, IconSize } from './components/Icon';

// Icon registry provider
export { IconRegistryProvider, useIconRegistry } from './IconRegistryContext';
export type { IconRegistryProviderProps } from './IconRegistryContext';
export type { IconDefinition, IconRegistry } from '@grundtone/core';
export { GTButton } from './components/Button';
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonRadius,
} from './components/Button';
export { GTInput } from './components/Input';
export type {
  InputProps,
  InputSize,
  InputType,
  InputRadius,
} from './components/Input';
export { GTToggle } from './components/Toggle';
export type { ToggleProps, ToggleSize } from './components/Toggle';
export { GTAlert } from './components/Alert';
export type { AlertProps, AlertVariant } from './components/Alert';
export { GTCard } from './components/Card';
export type { CardProps, CardVariant } from './components/Card';

// Hooks
export { useField } from './useField';
export type { UseFieldOptions, UseFieldReturn } from './useField';
export { useFormValidation } from './useFormValidation';
export type { UseFormValidationReturn } from './useFormValidation';

// Validators (re-exported from @grundtone/utils)
export {
  required,
  email,
  phone,
  cpr,
  cvr,
  minLength,
  maxLength,
  pattern,
  url,
  composeValidators,
} from '@grundtone/utils';
export type { Validator, ValidationResult } from '@grundtone/utils';

// Branding
export {
  defaultLogoSource,
  getLogoSource,
  defaultBranding,
  createBranding,
  LOGO_VARIANT_SIZES,
} from './branding';
export type { BrandingConfig, LogoVariants } from './branding';
