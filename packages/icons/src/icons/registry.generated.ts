// AUTO-GENERATED — do not edit. Source: packages/icons/src/icons/svg/**/*.svg
// Run: pnpm generate:icons

export interface IconDefinition {
  body: string;
  viewBox: string;
  category?: string;
}

export const iconRegistry = {
  check: {
    body: '<path d="M20 6L9 17l-5-5"/>',
    viewBox: '0 0 24 24',
    category: 'action',
  },
  close: {
    body: '<path d="M18 6L6 18M6 6l12 12"/>',
    viewBox: '0 0 24 24',
    category: 'action',
  },
  search: {
    body: '<circle cx="11" cy="11" r="8"/> <path d="M21 21l-4.35-4.35"/>',
    viewBox: '0 0 24 24',
    category: 'action',
  },
  'arrow-left': {
    body: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    viewBox: '0 0 24 24',
    category: 'navigation',
  },
  'arrow-right': {
    body: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    viewBox: '0 0 24 24',
    category: 'navigation',
  },
  menu: {
    body: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    viewBox: '0 0 24 24',
    category: 'navigation',
  },
} as const;

export type IconName = keyof typeof iconRegistry;

export const iconCategories = ['action', 'navigation'] as const;

export type IconCategory = (typeof iconCategories)[number];
