/**
 * CSS Registered Properties Type Definitions
 *
 * These types provide TypeScript support for the registered CSS custom properties.
 * Registered properties offer better performance, type safety, and animation capabilities.
 */

// Simple logger for design tokens package (browser compatible)
const logger = {
  warn: (
    message: string,
    context?: {
      component?: string;
      action?: string;
      severity?: string;
      metadata?: Record<string, unknown>;
    },
  ) => {
    if (
      typeof process !== 'undefined' &&
      process.env?.NODE_ENV === 'development'
    ) {
      // eslint-disable-next-line no-console
      console.warn('[Grundtone Design Tokens Warning]', {
        message,
        context,
        timestamp: new Date().toISOString(),
      });
    }
  },
};

// CSS Registered Property Syntax Types
export type CSSPropertySyntax =
  | '<color>'
  | '<length>'
  | '<number>'
  | '<integer>'
  | '<time>'
  | '<percentage>'
  | '<angle>'
  | '*';

// Registered Property Definition
export interface RegisteredProperty {
  syntax: CSSPropertySyntax;
  initialValue: string;
  inherits: boolean;
}

// Color Properties — aligned with @grundtone/core semantic tokens
export interface GrundtoneColorProperties {
  // Brand
  '--color-primary': RegisteredProperty;
  '--color-primary-light': RegisteredProperty;
  '--color-primary-dark': RegisteredProperty;
  '--color-on-primary': RegisteredProperty;
  '--color-secondary': RegisteredProperty;
  '--color-secondary-light': RegisteredProperty;
  '--color-secondary-dark': RegisteredProperty;
  // Status
  '--color-success': RegisteredProperty;
  '--color-success-light': RegisteredProperty;
  '--color-success-dark': RegisteredProperty;
  '--color-warning': RegisteredProperty;
  '--color-warning-light': RegisteredProperty;
  '--color-warning-dark': RegisteredProperty;
  '--color-error': RegisteredProperty;
  '--color-error-light': RegisteredProperty;
  '--color-error-dark': RegisteredProperty;
  '--color-info': RegisteredProperty;
  '--color-info-light': RegisteredProperty;
  '--color-info-dark': RegisteredProperty;
  // Surface
  '--color-background-alt': RegisteredProperty;
  '--color-surface-alt': RegisteredProperty;
  '--color-surface-raised': RegisteredProperty;
  // Text
  '--color-text-inverse': RegisteredProperty;
  '--color-text-placeholder': RegisteredProperty;
  '--color-text-disabled': RegisteredProperty;
  // Border
  '--color-border-light': RegisteredProperty;
  '--color-border-medium': RegisteredProperty;
  '--color-border-strong': RegisteredProperty;
  // Focus & Neutral
  '--color-focus': RegisteredProperty;
  '--color-neutral': RegisteredProperty;
}

// Typography Properties
export interface GrundtoneTypographyProperties {
  '--font-size-base': RegisteredProperty;
  '--font-size-sm': RegisteredProperty;
  '--font-size-lg': RegisteredProperty;
  '--font-size-xl': RegisteredProperty;
  '--font-weight-normal': RegisteredProperty;
  '--font-weight-medium': RegisteredProperty;
  '--font-weight-semibold': RegisteredProperty;
  '--font-weight-bold': RegisteredProperty;
  '--line-height-normal': RegisteredProperty;
  '--line-height-tight': RegisteredProperty;
  '--line-height-relaxed': RegisteredProperty;
}

// Spacing Properties
export interface GrundtoneSpacingProperties {
  '--space-xs': RegisteredProperty;
  '--space-sm': RegisteredProperty;
  '--space-md': RegisteredProperty;
  '--space-lg': RegisteredProperty;
  '--space-xl': RegisteredProperty;
  '--space-2xl': RegisteredProperty;
}

// Border Radius Properties
export interface GrundtoneRadiusProperties {
  '--radius-sm': RegisteredProperty;
  '--radius-md': RegisteredProperty;
  '--radius-lg': RegisteredProperty;
  '--radius-xl': RegisteredProperty;
  '--radius-full': RegisteredProperty;
}

// Animation Properties
export interface GrundtoneAnimationProperties {
  '--duration-fast': RegisteredProperty;
  '--duration-normal': RegisteredProperty;
  '--duration-slow': RegisteredProperty;
}

// Breakpoint Properties
export interface GrundtoneBreakpointProperties {
  '--breakpoint-sm': RegisteredProperty;
  '--breakpoint-md': RegisteredProperty;
  '--breakpoint-lg': RegisteredProperty;
  '--breakpoint-xl': RegisteredProperty;
  '--breakpoint-2xl': RegisteredProperty;
}

// Z-index Properties
export interface GrundtoneZIndexProperties {
  '--z-dropdown': RegisteredProperty;
  '--z-sticky': RegisteredProperty;
  '--z-fixed': RegisteredProperty;
  '--z-modal-backdrop': RegisteredProperty;
  '--z-modal': RegisteredProperty;
  '--z-popover': RegisteredProperty;
  '--z-tooltip': RegisteredProperty;
  '--z-toast': RegisteredProperty;
}

// All Registered Properties
export interface GrundtoneRegisteredProperties
  extends GrundtoneColorProperties,
    GrundtoneTypographyProperties,
    GrundtoneSpacingProperties,
    GrundtoneRadiusProperties,
    GrundtoneAnimationProperties,
    GrundtoneBreakpointProperties,
    GrundtoneZIndexProperties {}

// Property Registration Configuration
export const GRUNDTONE_REGISTERED_PROPERTIES: GrundtoneRegisteredProperties = {
  // Color properties — aligned with @grundtone/core semantic tokens
  // Brand
  '--color-primary': {
    syntax: '<color>',
    initialValue: '#0059b3',
    inherits: false,
  },
  '--color-primary-light': {
    syntax: '<color>',
    initialValue: '#3381cc',
    inherits: false,
  },
  '--color-primary-dark': {
    syntax: '<color>',
    initialValue: '#003a7a',
    inherits: false,
  },
  '--color-on-primary': {
    syntax: '<color>',
    initialValue: '#ffffff',
    inherits: false,
  },
  '--color-secondary': {
    syntax: '<color>',
    initialValue: '#6c757d',
    inherits: false,
  },
  '--color-secondary-light': {
    syntax: '<color>',
    initialValue: '#868e96',
    inherits: false,
  },
  '--color-secondary-dark': {
    syntax: '<color>',
    initialValue: '#494f54',
    inherits: false,
  },
  // Status
  '--color-success': {
    syntax: '<color>',
    initialValue: '#198754',
    inherits: false,
  },
  '--color-success-light': {
    syntax: '<color>',
    initialValue: '#d1e7dd',
    inherits: false,
  },
  '--color-success-dark': {
    syntax: '<color>',
    initialValue: '#146c43',
    inherits: false,
  },
  '--color-warning': {
    syntax: '<color>',
    initialValue: '#ffc107',
    inherits: false,
  },
  '--color-warning-light': {
    syntax: '<color>',
    initialValue: '#fff3cd',
    inherits: false,
  },
  '--color-warning-dark': {
    syntax: '<color>',
    initialValue: '#cc9a06',
    inherits: false,
  },
  '--color-error': {
    syntax: '<color>',
    initialValue: '#dc3545',
    inherits: false,
  },
  '--color-error-light': {
    syntax: '<color>',
    initialValue: '#f8d7da',
    inherits: false,
  },
  '--color-error-dark': {
    syntax: '<color>',
    initialValue: '#b02a37',
    inherits: false,
  },
  '--color-info': {
    syntax: '<color>',
    initialValue: '#0dcaf0',
    inherits: false,
  },
  '--color-info-light': {
    syntax: '<color>',
    initialValue: '#cff4fc',
    inherits: false,
  },
  '--color-info-dark': {
    syntax: '<color>',
    initialValue: '#0aa2c0',
    inherits: false,
  },
  // Surface
  '--color-background-alt': {
    syntax: '<color>',
    initialValue: '#fafafa',
    inherits: false,
  },
  '--color-surface-alt': {
    syntax: '<color>',
    initialValue: '#f0f1f2',
    inherits: false,
  },
  '--color-surface-raised': {
    syntax: '<color>',
    initialValue: '#ffffff',
    inherits: false,
  },
  // Text
  '--color-text-inverse': {
    syntax: '<color>',
    initialValue: '#ffffff',
    inherits: false,
  },
  '--color-text-placeholder': {
    syntax: '<color>',
    initialValue: '#a3a3a3',
    inherits: false,
  },
  '--color-text-disabled': {
    syntax: '<color>',
    initialValue: '#d4d4d4',
    inherits: false,
  },
  // Border
  '--color-border-light': {
    syntax: '<color>',
    initialValue: '#dee2e6',
    inherits: false,
  },
  '--color-border-medium': {
    syntax: '<color>',
    initialValue: '#ced4da',
    inherits: false,
  },
  '--color-border-strong': {
    syntax: '<color>',
    initialValue: '#adb5bd',
    inherits: false,
  },
  // Focus & Neutral
  '--color-focus': {
    syntax: '<color>',
    initialValue: '#0059b3',
    inherits: false,
  },
  '--color-neutral': {
    syntax: '<color>',
    initialValue: '#6c757d',
    inherits: false,
  },

  // Typography properties
  '--font-size-base': {
    syntax: '<length>',
    initialValue: '1rem',
    inherits: true,
  },
  '--font-size-sm': {
    syntax: '<length>',
    initialValue: '0.875rem',
    inherits: true,
  },
  '--font-size-lg': {
    syntax: '<length>',
    initialValue: '1.125rem',
    inherits: true,
  },
  '--font-size-xl': {
    syntax: '<length>',
    initialValue: '1.25rem',
    inherits: true,
  },
  '--font-weight-normal': {
    syntax: '<number>',
    initialValue: '400',
    inherits: true,
  },
  '--font-weight-medium': {
    syntax: '<number>',
    initialValue: '500',
    inherits: true,
  },
  '--font-weight-semibold': {
    syntax: '<number>',
    initialValue: '600',
    inherits: true,
  },
  '--font-weight-bold': {
    syntax: '<number>',
    initialValue: '700',
    inherits: true,
  },
  '--line-height-normal': {
    syntax: '<number>',
    initialValue: '1.5',
    inherits: true,
  },
  '--line-height-tight': {
    syntax: '<number>',
    initialValue: '1.25',
    inherits: true,
  },
  '--line-height-relaxed': {
    syntax: '<number>',
    initialValue: '1.75',
    inherits: true,
  },

  // Spacing properties
  '--space-xs': {
    syntax: '<length>',
    initialValue: '0.25rem',
    inherits: false,
  },
  '--space-sm': {
    syntax: '<length>',
    initialValue: '0.5rem',
    inherits: false,
  },
  '--space-md': {
    syntax: '<length>',
    initialValue: '1rem',
    inherits: false,
  },
  '--space-lg': {
    syntax: '<length>',
    initialValue: '1.5rem',
    inherits: false,
  },
  '--space-xl': {
    syntax: '<length>',
    initialValue: '2rem',
    inherits: false,
  },
  '--space-2xl': {
    syntax: '<length>',
    initialValue: '3rem',
    inherits: false,
  },

  // Border radius properties
  '--radius-sm': {
    syntax: '<length>',
    initialValue: '0.125rem',
    inherits: false,
  },
  '--radius-md': {
    syntax: '<length>',
    initialValue: '0.25rem',
    inherits: false,
  },
  '--radius-lg': {
    syntax: '<length>',
    initialValue: '0.5rem',
    inherits: false,
  },
  '--radius-xl': {
    syntax: '<length>',
    initialValue: '1rem',
    inherits: false,
  },
  '--radius-full': {
    syntax: '<length>',
    initialValue: '9999px',
    inherits: false,
  },

  // Animation properties
  '--duration-fast': {
    syntax: '<time>',
    initialValue: '150ms',
    inherits: false,
  },
  '--duration-normal': {
    syntax: '<time>',
    initialValue: '300ms',
    inherits: false,
  },
  '--duration-slow': {
    syntax: '<time>',
    initialValue: '500ms',
    inherits: false,
  },

  // Breakpoint properties
  '--breakpoint-sm': {
    syntax: '<length>',
    initialValue: '640px',
    inherits: false,
  },
  '--breakpoint-md': {
    syntax: '<length>',
    initialValue: '768px',
    inherits: false,
  },
  '--breakpoint-lg': {
    syntax: '<length>',
    initialValue: '1024px',
    inherits: false,
  },
  '--breakpoint-xl': {
    syntax: '<length>',
    initialValue: '1280px',
    inherits: false,
  },
  '--breakpoint-2xl': {
    syntax: '<length>',
    initialValue: '1536px',
    inherits: false,
  },

  // Z-index properties
  '--z-dropdown': {
    syntax: '<integer>',
    initialValue: '1000',
    inherits: false,
  },
  '--z-sticky': {
    syntax: '<integer>',
    initialValue: '1020',
    inherits: false,
  },
  '--z-fixed': {
    syntax: '<integer>',
    initialValue: '1030',
    inherits: false,
  },
  '--z-modal-backdrop': {
    syntax: '<integer>',
    initialValue: '1040',
    inherits: false,
  },
  '--z-modal': {
    syntax: '<integer>',
    initialValue: '1050',
    inherits: false,
  },
  '--z-popover': {
    syntax: '<integer>',
    initialValue: '1060',
    inherits: false,
  },
  '--z-tooltip': {
    syntax: '<integer>',
    initialValue: '1070',
    inherits: false,
  },
  '--z-toast': {
    syntax: '<integer>',
    initialValue: '1080',
    inherits: false,
  },
};

/**
 * Utility function to register CSS custom properties programmatically
 * Useful for fallback support or dynamic registration
 */
export function registerCSSProperties(
  properties: Partial<GrundtoneRegisteredProperties> = GRUNDTONE_REGISTERED_PROPERTIES,
): void {
  if (!CSS?.registerProperty) {
    logger.warn(
      'CSS.registerProperty is not supported in this browser. Registered properties will fallback to regular custom properties.',
      {
        component: 'registerCSSProperties',
        action: 'checkSupport',
        severity: 'low',
      },
    );
    return;
  }

  for (const [name, config] of Object.entries(properties)) {
    try {
      CSS.registerProperty({
        name,
        ...config,
      });
    } catch (error) {
      logger.warn(`Failed to register CSS property ${name}`, {
        component: 'registerCSSProperties',
        action: 'registerProperty',
        severity: 'low',
        metadata: { propertyName: name, error: String(error) },
      });
    }
  }
}

// Property name constants for type safety
export const GRUNDTONE_CSS_PROPERTIES = {
  // Colors — Brand
  COLOR_PRIMARY: '--color-primary',
  COLOR_PRIMARY_LIGHT: '--color-primary-light',
  COLOR_PRIMARY_DARK: '--color-primary-dark',
  COLOR_ON_PRIMARY: '--color-on-primary',
  COLOR_SECONDARY: '--color-secondary',
  COLOR_SECONDARY_LIGHT: '--color-secondary-light',
  COLOR_SECONDARY_DARK: '--color-secondary-dark',
  // Colors — Status
  COLOR_SUCCESS: '--color-success',
  COLOR_SUCCESS_LIGHT: '--color-success-light',
  COLOR_SUCCESS_DARK: '--color-success-dark',
  COLOR_WARNING: '--color-warning',
  COLOR_WARNING_LIGHT: '--color-warning-light',
  COLOR_WARNING_DARK: '--color-warning-dark',
  COLOR_ERROR: '--color-error',
  COLOR_ERROR_LIGHT: '--color-error-light',
  COLOR_ERROR_DARK: '--color-error-dark',
  COLOR_INFO: '--color-info',
  COLOR_INFO_LIGHT: '--color-info-light',
  COLOR_INFO_DARK: '--color-info-dark',
  // Colors — Surface
  COLOR_BACKGROUND_ALT: '--color-background-alt',
  COLOR_SURFACE_ALT: '--color-surface-alt',
  COLOR_SURFACE_RAISED: '--color-surface-raised',
  // Colors — Text
  COLOR_TEXT_INVERSE: '--color-text-inverse',
  COLOR_TEXT_PLACEHOLDER: '--color-text-placeholder',
  COLOR_TEXT_DISABLED: '--color-text-disabled',
  // Colors — Border
  COLOR_BORDER_LIGHT: '--color-border-light',
  COLOR_BORDER_MEDIUM: '--color-border-medium',
  COLOR_BORDER_STRONG: '--color-border-strong',
  // Colors — Focus & Neutral
  COLOR_FOCUS: '--color-focus',
  COLOR_NEUTRAL: '--color-neutral',

  // Typography
  FONT_SIZE_BASE: '--font-size-base',
  FONT_SIZE_SM: '--font-size-sm',
  FONT_SIZE_LG: '--font-size-lg',
  FONT_SIZE_XL: '--font-size-xl',
  FONT_WEIGHT_NORMAL: '--font-weight-normal',
  FONT_WEIGHT_MEDIUM: '--font-weight-medium',
  FONT_WEIGHT_SEMIBOLD: '--font-weight-semibold',
  FONT_WEIGHT_BOLD: '--font-weight-bold',
  LINE_HEIGHT_NORMAL: '--line-height-normal',
  LINE_HEIGHT_TIGHT: '--line-height-tight',
  LINE_HEIGHT_RELAXED: '--line-height-relaxed',

  // Spacing
  SPACE_XS: '--space-xs',
  SPACE_SM: '--space-sm',
  SPACE_MD: '--space-md',
  SPACE_LG: '--space-lg',
  SPACE_XL: '--space-xl',
  SPACE_2XL: '--space-2xl',

  // Border radius
  RADIUS_SM: '--radius-sm',
  RADIUS_MD: '--radius-md',
  RADIUS_LG: '--radius-lg',
  RADIUS_XL: '--radius-xl',
  RADIUS_FULL: '--radius-full',

  // Animation
  DURATION_FAST: '--duration-fast',
  DURATION_NORMAL: '--duration-normal',
  DURATION_SLOW: '--duration-slow',

  // Breakpoints
  BREAKPOINT_SM: '--breakpoint-sm',
  BREAKPOINT_MD: '--breakpoint-md',
  BREAKPOINT_LG: '--breakpoint-lg',
  BREAKPOINT_XL: '--breakpoint-xl',
  BREAKPOINT_2XL: '--breakpoint-2xl',

  // Z-index
  Z_DROPDOWN: '--z-dropdown',
  Z_STICKY: '--z-sticky',
  Z_FIXED: '--z-fixed',
  Z_MODAL_BACKDROP: '--z-modal-backdrop',
  Z_MODAL: '--z-modal',
  Z_POPOVER: '--z-popover',
  Z_TOOLTIP: '--z-tooltip',
  Z_TOAST: '--z-toast',
} as const;

export type GrundtoneCSSPropertyName = keyof typeof GRUNDTONE_CSS_PROPERTIES;
