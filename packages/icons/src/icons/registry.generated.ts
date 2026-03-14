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
  'alert-circle': {
    body: '<circle cx="12" cy="12" r="10"/> <path d="M12 8v4M12 16h.01"/>',
    viewBox: '0 0 24 24',
    category: 'status',
  },
  'alert-triangle': {
    body: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/> <path d="M12 9v4M12 17h.01"/>',
    viewBox: '0 0 24 24',
    category: 'status',
  },
  'check-circle': {
    body: '<circle cx="12" cy="12" r="10"/> <path d="m9 12 2 2 4-4"/>',
    viewBox: '0 0 24 24',
    category: 'status',
  },
  'info-circle': {
    body: '<circle cx="12" cy="12" r="10"/> <path d="M12 16v-4M12 8h.01"/>',
    viewBox: '0 0 24 24',
    category: 'status',
  },
} as const;

export type IconName = keyof typeof iconRegistry;

export const iconCategories = ['action', 'navigation', 'status'] as const;

export type IconCategory = (typeof iconCategories)[number];
