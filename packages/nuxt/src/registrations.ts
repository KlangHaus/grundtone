// Names registered from the package ENTRY, not from a directory scan.
//
// 🔴 WHY NOT A DIRECTORY (riff zh3ayeik, two measured defects):
//   1. '@grundtone/vue' ships only dist + scss (measured on the published
//      tarball: 3.1.0 has 0 src entries, 2.23.3 had 255). Registering from
//      ../../vue/src therefore points at a directory a consumer does not have.
//   2. A component loaded from src and a consumer's own
//      `import { useToast } from '@grundtone/vue'` (dist) are two module
//      instances. useToast keeps toastState in a module-level reactive, so the
//      container reads one state and the consumer writes the other — and
//      nothing errors; the toast simply never appears.
// Registering everything through the entry gives consumers one instance and
// needs nothing but the published files.
//
// registrations.test.ts compares these lists to what the built package
// actually exports, so a new component fails the test instead of silently
// not being auto-imported.

/** Every GT* component exported by @grundtone/vue. */
export const COMPONENT_NAMES = [
  'GTAccordion',
  'GTAccordionItem',
  'GTAddressInput',
  'GTAlert',
  'GTAnchorLinks',
  'GTAppShell',
  'GTAutocomplete',
  'GTBackLink',
  'GTBackToTop',
  'GTBadge',
  'GTBreadcrumb',
  'GTBulkActionBar',
  'GTButton',
  'GTCard',
  'GTCarousel',
  'GTCarouselSlide',
  'GTChartContainer',
  'GTChartLegend',
  'GTCheckbox',
  'GTCheckboxGroup',
  'GTCodeBlock',
  'GTConfirmDialog',
  'GTCookieMessage',
  'GTDateInput',
  'GTDatePicker',
  'GTDetails',
  'GTDrawer',
  'GTErrorPage',
  'GTFileUpload',
  'GTHero',
  'GTIcon',
  'GTInput',
  'GTMeter',
  'GTModal',
  'GTOtpInput',
  'GTOverflowMenu',
  'GTPasswordInput',
  'GTRadioGroup',
  'GTRichText',
  'GTSearchField',
  'GTSelect',
  'GTSkipLink',
  'GTSlider',
  'GTSpinner',
  'GTStepper',
  'GTSummaryItem',
  'GTSummaryList',
  'GTTabPanel',
  'GTTable',
  'GTTabs',
  'GTTag',
  'GTTextarea',
  'GTToast',
  'GTToastContainer',
  'GTToggle',
  'GTTooltip',
] as const;

/** Composables exported by @grundtone/vue (auto-imported for consumers). */
export const COMPOSABLE_NAMES = [
  'useDateField',
  'useDawaAutocomplete',
  'useField',
  'useFormValidation',
  'useTheme',
  'useToast',
] as const;

/** Non-component values the module has always auto-imported from the entry. */
export const VALUE_NAMES = ['GT_ICON_REGISTRY_KEY'] as const;
