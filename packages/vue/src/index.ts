/**
 * @grundtone/vue
 *
 * Vue 3 component library for the Grundtone design system.
 */

// Design system tokens (CSS custom properties) — bundled into dist/index.css
import '@grundtone/design-system/dist/index.css';

// Atoms
export { GTButton } from './atoms/Button';
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonRadius,
} from './atoms/Button';
export { GTIcon } from './atoms/Icon';
export type { IconProps, IconSize } from './atoms/Icon';
export { GT_ICON_REGISTRY_KEY } from './atoms/Icon';
export type { IconDefinition, IconRegistry } from '@grundtone/core';
export { GTInput } from './atoms/Input';
export type {
  InputProps,
  InputSize,
  InputType,
  InputRadius,
  InputWidth,
  InputCharWidth,
} from './atoms/Input';
export { GTToggle } from './atoms/Toggle';
export type { ToggleProps, ToggleSize } from './atoms/Toggle';

// Theme
export { default as GrundtoneThemeProvider } from './ThemeProvider.vue';
export { applyThemeToDOM } from './applyThemeToDOM';
export { getSystemThemeMode } from '@grundtone/utils';

// Composables
export { useTheme } from './composables/useTheme';
export { useField } from './composables/useField';
export type { UseFieldOptions, UseFieldReturn } from './composables/useField';
export { useFormValidation } from './composables/useFormValidation';
export type { UseFormValidationReturn } from './composables/useFormValidation';

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

// Molecules
export { GTAlert } from './molecules/Alert';
export type { AlertProps, AlertVariant } from './molecules/Alert';
export { GTBreadcrumb } from './molecules/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './molecules/Breadcrumb';

// Organisms
