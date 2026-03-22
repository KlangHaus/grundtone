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
  cookie: {
    body: '<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/>',
    viewBox: '0 0 24 24',
    category: 'action',
  },
  'eye-off': {
    body: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/> <line x1="1" y1="1" x2="23" y2="23"/>',
    viewBox: '0 0 24 24',
    category: 'action',
  },
  eye: {
    body: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/> <circle cx="12" cy="12" r="3"/>',
    viewBox: '0 0 24 24',
    category: 'action',
  },
  file: {
    body: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/> <polyline points="14 2 14 8 20 8"/>',
    viewBox: '0 0 24 24',
    category: 'action',
  },
  search: {
    body: '<circle cx="11" cy="11" r="8"/> <path d="M21 21l-4.35-4.35"/>',
    viewBox: '0 0 24 24',
    category: 'action',
  },
  upload: {
    body: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
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
  'chevron-up': {
    body: '<path d="M18 15l-6-6-6 6"/>',
    viewBox: '0 0 24 24',
    category: 'navigation',
  },
  'external-link': {
    body: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>',
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
