/**
 * @grundtone/vue
 *
 * Vue 3 component library for the Grundtone design system.
 */

// Design system tokens (CSS custom properties) — bundled into dist/index.css
import '@grundtone/design-system/dist/index.css';

// Atoms
export { GTAutocomplete } from './atoms/Autocomplete';
export type {
  AutocompleteProps,
  AutocompleteSuggestion,
  AutocompleteSize,
} from './atoms/Autocomplete';
export { GTBadge } from './atoms/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './atoms/Badge';
export { GTButton } from './atoms/Button';
export { GTDetails } from './atoms/Details';
export type { DetailsProps, DetailsVariant } from './atoms/Details';
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
export { GTDateInput } from './atoms/DateInput';
export type {
  DateInputProps,
  DateInputValue,
  DateInputSize,
} from './atoms/DateInput';
export { GTInput } from './atoms/Input';
export { GTSelect } from './atoms/Select';
export { GTSkipLink } from './atoms/SkipLink';
export type { SkipLinkProps } from './atoms/SkipLink';
export type {
  SelectProps,
  SelectOption,
  SelectOptionGroup,
  SelectSize,
} from './atoms/Select';
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
export { useDawaAutocomplete } from './composables/useDawaAutocomplete';
export type {
  DawaType,
  DawaResult,
  UseDawaAutocompleteOptions,
  UseDawaAutocompleteReturn,
} from './composables/useDawaAutocomplete';
export { useField } from './composables/useField';
export type { UseFieldOptions, UseFieldReturn } from './composables/useField';
export { useDateField } from './composables/useDateField';
export type {
  UseDateFieldOptions,
  UseDateFieldReturn,
} from './composables/useDateField';
export { useFormValidation } from './composables/useFormValidation';
export type { UseFormValidationReturn } from './composables/useFormValidation';

// Validators (re-exported from @grundtone/utils)
export {
  required,
  email,
  phone,
  cpr,
  cvr,
  date,
  datePast,
  dateFuture,
  minLength,
  maxLength,
  pattern,
  url,
  composeValidators,
} from '@grundtone/utils';
export type { Validator, ValidationResult } from '@grundtone/utils';

// Molecules
export { GTAccordion, GTAccordionItem } from './molecules/Accordion';
export type {
  AccordionProps,
  AccordionVariant,
  AccordionTransition,
  AccordionItemProps,
} from './molecules/Accordion';
export { GTAddressInput } from './molecules/AddressInput';
export type {
  AddressInputProps,
  AddressInputSize,
} from './molecules/AddressInput';
export { GTAlert } from './molecules/Alert';
export { GTAnchorLinks } from './molecules/AnchorLinks';
export type { AnchorLinksProps, AnchorLinkItem } from './molecules/AnchorLinks';
export type { AlertProps, AlertVariant } from './molecules/Alert';
export { GTBreadcrumb } from './molecules/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './molecules/Breadcrumb';
export { GTCard } from './molecules/Card';
export type { CardProps, CardVariant } from './molecules/Card';
export { GTCookieMessage } from './molecules/CookieMessage';
export type { CookieMessageProps } from './molecules/CookieMessage';
export { GTTabs, GTTabPanel } from './molecules/Tabs';
export type {
  TabsProps,
  TabsVariant,
  TabItem,
  TabPanelProps,
} from './molecules/Tabs';

// Organisms
