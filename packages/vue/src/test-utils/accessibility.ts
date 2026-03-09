/**
 * Accessibility testing utilities for Grundtone UI components
 * Provides standardized A11Y testing across all components
 */

import { configureAxe } from 'vitest-axe';
import type { AxeConfig } from 'vitest-axe';

/**
 * Standard accessibility configuration for Grundtone UI components
 * Follows WCAG 2.1 AA guidelines
 */
export const grundtoneA11yConfig: AxeConfig = {
  // Focus on WCAG 2.1 AA compliance
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],

  // Disable rules that may conflict with component libraries
  rules: {
    region: { enabled: false }, // Components may not always be in regions
    'page-has-heading-one': { enabled: false }, // Components don't need h1
    'landmark-one-main': { enabled: false }, // Components don't need main landmark
  },

  // Custom result processing for better error messages
  resultTypes: ['violations', 'incomplete'],
};

/**
 * Configure axe with Grundtone UI standards
 */
export const configureGrundtoneAxe = () => {
  configureAxe(grundtoneA11yConfig);
};

/**
 * Color contrast testing utilities
 */
export interface ContrastTestResult {
  ratio: number;
  passes: boolean;
  level: 'AA' | 'AAA' | 'fail';
}

/**
 * Test color contrast ratio between foreground and background
 * @param foreground - Foreground color (hex, rgb, hsl)
 * @param background - Background color (hex, rgb, hsl)
 * @param isLargeText - Whether text is considered large (18pt+ or 14pt+ bold)
 * @returns Contrast test result
 */
export function testColorContrast(
  foreground: string,
  background: string,
  isLargeText: boolean = false,
): ContrastTestResult {
  // Convert colors to luminance values
  const foregroundLuminance = getLuminance(foreground);
  const backgroundLuminance = getLuminance(background);

  // Calculate contrast ratio
  const ratio =
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);

  // Determine compliance level
  const aaThreshold = isLargeText ? 3.0 : 4.5;
  const aaaThreshold = isLargeText ? 4.5 : 7.0;

  let level: 'AA' | 'AAA' | 'fail';
  if (ratio >= aaaThreshold) {
    level = 'AAA';
  } else if (ratio >= aaThreshold) {
    level = 'AA';
  } else {
    level = 'fail';
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= aaThreshold,
    level,
  };
}

/**
 * Convert color to relative luminance
 * Based on WCAG 2.1 specification
 */
function getLuminance(color: string): number {
  // Convert hex to RGB
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  // Convert to relative luminance
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Common accessibility test scenarios for components
 */
export const a11yTestScenarios = {
  /**
   * Test keyboard navigation through focusable elements
   */
  keyboardNavigation: {
    name: 'Keyboard Navigation',
    description: 'Elements can be accessed and operated via keyboard',
    keys: ['Tab', 'Shift+Tab', 'Enter', 'Space', 'Escape', 'Arrow keys'],
  },

  /**
   * Test focus management
   */
  focusManagement: {
    name: 'Focus Management',
    description: 'Focus is properly managed and visible',
    requirements: ['Focus indicators', 'Focus trapping', 'Focus restoration'],
  },

  /**
   * Test screen reader compatibility
   */
  screenReader: {
    name: 'Screen Reader Support',
    description: 'Component is accessible to screen readers',
    requirements: ['ARIA labels', 'Role attributes', 'State announcements'],
  },

  /**
   * Test color contrast
   */
  colorContrast: {
    name: 'Color Contrast',
    description: 'Text has sufficient contrast against background',
    standards: {
      AA: { normal: 4.5, large: 3.0 },
      AAA: { normal: 7.0, large: 4.5 },
    },
  },
};

/**
 * Accessibility testing helper for Vue components
 */
export interface A11yTestOptions {
  /** Component name for error reporting */
  componentName?: string;
  /** Additional axe rules to run */
  additionalRules?: string[];
  /** Rules to disable for this test */
  disableRules?: string[];
  /** Whether to test color contrast */
  testContrast?: boolean;
  /** Custom contrast combinations to test */
  contrastTests?: Array<{
    foreground: string;
    background: string;
    isLargeText?: boolean;
    description?: string;
  }>;
}

/**
 * Run accessibility tests on a Vue component
 * @param element - The DOM element to test
 * @param options - Test configuration options
 */
export async function testComponentAccessibility(
  element: HTMLElement,
  options: A11yTestOptions = {},
): Promise<void> {
  const {
    componentName = 'Component',
    additionalRules = [],
    disableRules = [],
    testContrast = true,
    contrastTests = [],
  } = options;

  // Configure axe for this test
  const config = {
    ...grundtoneA11yConfig,
    rules: {
      ...grundtoneA11yConfig.rules,
      // Enable additional rules
      ...Object.fromEntries(
        additionalRules.map(rule => [rule, { enabled: true }]),
      ),
      // Disable specified rules
      ...Object.fromEntries(
        disableRules.map(rule => [rule, { enabled: false }]),
      ),
    },
  };

  // Import axe dynamically to avoid issues in SSR
  const { axe } = await import('vitest-axe');

  // Run axe accessibility tests
  const results = await axe(element, config);

  // Custom error message for better debugging
  if (results.violations.length > 0) {
    const violationMessages = results.violations
      .map(
        violation =>
          `${violation.id}: ${violation.description}\n  Impact: ${violation.impact}\n  Help: ${violation.helpUrl}`,
      )
      .join('\n\n');

    throw new Error(
      `${componentName} accessibility violations found:\n\n${violationMessages}`,
    );
  }

  // Run color contrast tests if enabled
  if (testContrast && contrastTests.length > 0) {
    const contrastFailures: string[] = [];

    for (const test of contrastTests) {
      const result = testColorContrast(
        test.foreground,
        test.background,
        test.isLargeText,
      );

      if (!result.passes) {
        contrastFailures.push(
          `${test.description || 'Color combination'}: ${test.foreground} on ${test.background} ` +
            `(ratio: ${result.ratio}, required: ${test.isLargeText ? '3.0' : '4.5'})`,
        );
      }
    }

    if (contrastFailures.length > 0) {
      throw new Error(
        `${componentName} color contrast failures:\n\n${contrastFailures.join('\n')}`,
      );
    }
  }
}
