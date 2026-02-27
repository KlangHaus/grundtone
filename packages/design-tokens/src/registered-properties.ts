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

// Color Properties
export interface GrundtoneColorProperties {
  '--grundtone-color-primary': RegisteredProperty;
  '--grundtone-color-primary-hover': RegisteredProperty;
  '--grundtone-color-primary-active': RegisteredProperty;
  '--grundtone-color-secondary': RegisteredProperty;
  '--grundtone-color-success': RegisteredProperty;
  '--grundtone-color-warning': RegisteredProperty;
  '--grundtone-color-error': RegisteredProperty;
  '--grundtone-color-info': RegisteredProperty;
}

// Typography Properties
export interface GrundtoneTypographyProperties {
  '--grundtone-font-size-base': RegisteredProperty;
  '--grundtone-font-size-sm': RegisteredProperty;
  '--grundtone-font-size-lg': RegisteredProperty;
  '--grundtone-font-size-xl': RegisteredProperty;
  '--grundtone-font-weight-normal': RegisteredProperty;
  '--grundtone-font-weight-medium': RegisteredProperty;
  '--grundtone-font-weight-semibold': RegisteredProperty;
  '--grundtone-font-weight-bold': RegisteredProperty;
  '--grundtone-line-height-normal': RegisteredProperty;
  '--grundtone-line-height-tight': RegisteredProperty;
  '--grundtone-line-height-relaxed': RegisteredProperty;
}

// Spacing Properties
export interface GrundtoneSpacingProperties {
  '--grundtone-space-xs': RegisteredProperty;
  '--grundtone-space-sm': RegisteredProperty;
  '--grundtone-space-md': RegisteredProperty;
  '--grundtone-space-lg': RegisteredProperty;
  '--grundtone-space-xl': RegisteredProperty;
  '--grundtone-space-2xl': RegisteredProperty;
}

// Border Radius Properties
export interface GrundtoneRadiusProperties {
  '--grundtone-radius-sm': RegisteredProperty;
  '--grundtone-radius-md': RegisteredProperty;
  '--grundtone-radius-lg': RegisteredProperty;
  '--grundtone-radius-xl': RegisteredProperty;
  '--grundtone-radius-full': RegisteredProperty;
}

// Animation Properties
export interface GrundtoneAnimationProperties {
  '--grundtone-duration-fast': RegisteredProperty;
  '--grundtone-duration-normal': RegisteredProperty;
  '--grundtone-duration-slow': RegisteredProperty;
}

// Breakpoint Properties
export interface GrundtoneBreakpointProperties {
  '--grundtone-breakpoint-sm': RegisteredProperty;
  '--grundtone-breakpoint-md': RegisteredProperty;
  '--grundtone-breakpoint-lg': RegisteredProperty;
  '--grundtone-breakpoint-xl': RegisteredProperty;
  '--grundtone-breakpoint-2xl': RegisteredProperty;
}

// Z-index Properties
export interface GrundtoneZIndexProperties {
  '--grundtone-z-dropdown': RegisteredProperty;
  '--grundtone-z-sticky': RegisteredProperty;
  '--grundtone-z-fixed': RegisteredProperty;
  '--grundtone-z-modal-backdrop': RegisteredProperty;
  '--grundtone-z-modal': RegisteredProperty;
  '--grundtone-z-popover': RegisteredProperty;
  '--grundtone-z-tooltip': RegisteredProperty;
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
  // Color properties
  '--grundtone-color-primary': {
    syntax: '<color>',
    initialValue: '#0059b3',
    inherits: false,
  },
  '--grundtone-color-primary-hover': {
    syntax: '<color>',
    initialValue: '#004a96',
    inherits: false,
  },
  '--grundtone-color-primary-active': {
    syntax: '<color>',
    initialValue: '#003a7a',
    inherits: false,
  },
  '--grundtone-color-secondary': {
    syntax: '<color>',
    initialValue: '#6c757d',
    inherits: false,
  },
  '--grundtone-color-success': {
    syntax: '<color>',
    initialValue: '#28a745',
    inherits: false,
  },
  '--grundtone-color-warning': {
    syntax: '<color>',
    initialValue: '#ffc107',
    inherits: false,
  },
  '--grundtone-color-error': {
    syntax: '<color>',
    initialValue: '#dc3545',
    inherits: false,
  },
  '--grundtone-color-info': {
    syntax: '<color>',
    initialValue: '#17a2b8',
    inherits: false,
  },

  // Typography properties
  '--grundtone-font-size-base': {
    syntax: '<length>',
    initialValue: '1rem',
    inherits: true,
  },
  '--grundtone-font-size-sm': {
    syntax: '<length>',
    initialValue: '0.875rem',
    inherits: true,
  },
  '--grundtone-font-size-lg': {
    syntax: '<length>',
    initialValue: '1.125rem',
    inherits: true,
  },
  '--grundtone-font-size-xl': {
    syntax: '<length>',
    initialValue: '1.25rem',
    inherits: true,
  },
  '--grundtone-font-weight-normal': {
    syntax: '<number>',
    initialValue: '400',
    inherits: true,
  },
  '--grundtone-font-weight-medium': {
    syntax: '<number>',
    initialValue: '500',
    inherits: true,
  },
  '--grundtone-font-weight-semibold': {
    syntax: '<number>',
    initialValue: '600',
    inherits: true,
  },
  '--grundtone-font-weight-bold': {
    syntax: '<number>',
    initialValue: '700',
    inherits: true,
  },
  '--grundtone-line-height-normal': {
    syntax: '<number>',
    initialValue: '1.5',
    inherits: true,
  },
  '--grundtone-line-height-tight': {
    syntax: '<number>',
    initialValue: '1.25',
    inherits: true,
  },
  '--grundtone-line-height-relaxed': {
    syntax: '<number>',
    initialValue: '1.75',
    inherits: true,
  },

  // Spacing properties
  '--grundtone-space-xs': {
    syntax: '<length>',
    initialValue: '0.25rem',
    inherits: false,
  },
  '--grundtone-space-sm': {
    syntax: '<length>',
    initialValue: '0.5rem',
    inherits: false,
  },
  '--grundtone-space-md': {
    syntax: '<length>',
    initialValue: '1rem',
    inherits: false,
  },
  '--grundtone-space-lg': {
    syntax: '<length>',
    initialValue: '1.5rem',
    inherits: false,
  },
  '--grundtone-space-xl': {
    syntax: '<length>',
    initialValue: '2rem',
    inherits: false,
  },
  '--grundtone-space-2xl': {
    syntax: '<length>',
    initialValue: '3rem',
    inherits: false,
  },

  // Border radius properties
  '--grundtone-radius-sm': {
    syntax: '<length>',
    initialValue: '0.125rem',
    inherits: false,
  },
  '--grundtone-radius-md': {
    syntax: '<length>',
    initialValue: '0.25rem',
    inherits: false,
  },
  '--grundtone-radius-lg': {
    syntax: '<length>',
    initialValue: '0.5rem',
    inherits: false,
  },
  '--grundtone-radius-xl': {
    syntax: '<length>',
    initialValue: '1rem',
    inherits: false,
  },
  '--grundtone-radius-full': {
    syntax: '<length>',
    initialValue: '9999px',
    inherits: false,
  },

  // Animation properties
  '--grundtone-duration-fast': {
    syntax: '<time>',
    initialValue: '150ms',
    inherits: false,
  },
  '--grundtone-duration-normal': {
    syntax: '<time>',
    initialValue: '300ms',
    inherits: false,
  },
  '--grundtone-duration-slow': {
    syntax: '<time>',
    initialValue: '500ms',
    inherits: false,
  },

  // Breakpoint properties
  '--grundtone-breakpoint-sm': {
    syntax: '<length>',
    initialValue: '640px',
    inherits: false,
  },
  '--grundtone-breakpoint-md': {
    syntax: '<length>',
    initialValue: '768px',
    inherits: false,
  },
  '--grundtone-breakpoint-lg': {
    syntax: '<length>',
    initialValue: '1024px',
    inherits: false,
  },
  '--grundtone-breakpoint-xl': {
    syntax: '<length>',
    initialValue: '1280px',
    inherits: false,
  },
  '--grundtone-breakpoint-2xl': {
    syntax: '<length>',
    initialValue: '1536px',
    inherits: false,
  },

  // Z-index properties
  '--grundtone-z-dropdown': {
    syntax: '<integer>',
    initialValue: '1000',
    inherits: false,
  },
  '--grundtone-z-sticky': {
    syntax: '<integer>',
    initialValue: '1020',
    inherits: false,
  },
  '--grundtone-z-fixed': {
    syntax: '<integer>',
    initialValue: '1030',
    inherits: false,
  },
  '--grundtone-z-modal-backdrop': {
    syntax: '<integer>',
    initialValue: '1040',
    inherits: false,
  },
  '--grundtone-z-modal': {
    syntax: '<integer>',
    initialValue: '1050',
    inherits: false,
  },
  '--grundtone-z-popover': {
    syntax: '<integer>',
    initialValue: '1060',
    inherits: false,
  },
  '--grundtone-z-tooltip': {
    syntax: '<integer>',
    initialValue: '1070',
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
  // Colors
  COLOR_PRIMARY: '--grundtone-color-primary',
  COLOR_PRIMARY_HOVER: '--grundtone-color-primary-hover',
  COLOR_PRIMARY_ACTIVE: '--grundtone-color-primary-active',
  COLOR_SECONDARY: '--grundtone-color-secondary',
  COLOR_SUCCESS: '--grundtone-color-success',
  COLOR_WARNING: '--grundtone-color-warning',
  COLOR_ERROR: '--grundtone-color-error',
  COLOR_INFO: '--grundtone-color-info',

  // Typography
  FONT_SIZE_BASE: '--grundtone-font-size-base',
  FONT_SIZE_SM: '--grundtone-font-size-sm',
  FONT_SIZE_LG: '--grundtone-font-size-lg',
  FONT_SIZE_XL: '--grundtone-font-size-xl',
  FONT_WEIGHT_NORMAL: '--grundtone-font-weight-normal',
  FONT_WEIGHT_MEDIUM: '--grundtone-font-weight-medium',
  FONT_WEIGHT_SEMIBOLD: '--grundtone-font-weight-semibold',
  FONT_WEIGHT_BOLD: '--grundtone-font-weight-bold',
  LINE_HEIGHT_NORMAL: '--grundtone-line-height-normal',
  LINE_HEIGHT_TIGHT: '--grundtone-line-height-tight',
  LINE_HEIGHT_RELAXED: '--grundtone-line-height-relaxed',

  // Spacing
  SPACE_XS: '--grundtone-space-xs',
  SPACE_SM: '--grundtone-space-sm',
  SPACE_MD: '--grundtone-space-md',
  SPACE_LG: '--grundtone-space-lg',
  SPACE_XL: '--grundtone-space-xl',
  SPACE_2XL: '--grundtone-space-2xl',

  // Border radius
  RADIUS_SM: '--grundtone-radius-sm',
  RADIUS_MD: '--grundtone-radius-md',
  RADIUS_LG: '--grundtone-radius-lg',
  RADIUS_XL: '--grundtone-radius-xl',
  RADIUS_FULL: '--grundtone-radius-full',

  // Animation
  DURATION_FAST: '--grundtone-duration-fast',
  DURATION_NORMAL: '--grundtone-duration-normal',
  DURATION_SLOW: '--grundtone-duration-slow',

  // Breakpoints
  BREAKPOINT_SM: '--grundtone-breakpoint-sm',
  BREAKPOINT_MD: '--grundtone-breakpoint-md',
  BREAKPOINT_LG: '--grundtone-breakpoint-lg',
  BREAKPOINT_XL: '--grundtone-breakpoint-xl',
  BREAKPOINT_2XL: '--grundtone-breakpoint-2xl',

  // Z-index
  Z_DROPDOWN: '--grundtone-z-dropdown',
  Z_STICKY: '--grundtone-z-sticky',
  Z_FIXED: '--grundtone-z-fixed',
  Z_MODAL_BACKDROP: '--grundtone-z-modal-backdrop',
  Z_MODAL: '--grundtone-z-modal',
  Z_POPOVER: '--grundtone-z-popover',
  Z_TOOLTIP: '--grundtone-z-tooltip',
} as const;

export type GrundtoneCSSPropertyName = keyof typeof GRUNDTONE_CSS_PROPERTIES;
