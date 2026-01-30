import { ref, readonly, onMounted, type Ref } from 'vue';
import {
  registerCSSProperties,
  HASPEN_REGISTERED_PROPERTIES,
  HASPEN_CSS_PROPERTIES,
  type HaspenCSSPropertyName,
  type HaspenRegisteredProperties,
} from '@ipeeon/design-tokens';
// Simple logger for composables (to avoid circular dependencies)
const logger = {
  warn: (message: string, metadata?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[Haspen UI] ${message}`, metadata);
    }
  },
  error: (message: string, metadata?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`[Haspen UI] ${message}`, metadata);
    }
  },
};

interface UseRegisteredPropertiesOptions {
  /**
   * Whether to automatically register properties on mount
   * @default true
   */
  autoRegister?: boolean;

  /**
   * Subset of properties to register
   * @default all properties
   */
  properties?: Partial<HaspenRegisteredProperties>;

  /**
   * Whether to warn about unsupported browsers
   * @default true
   */
  warn?: boolean;
}

interface UseRegisteredPropertiesReturn {
  /**
   * Whether CSS.registerProperty is supported
   */
  isSupported: Ref<boolean>;

  /**
   * Whether properties have been registered
   */
  isRegistered: Ref<boolean>;

  /**
   * Register CSS properties programmatically
   */
  register: (properties?: Partial<HaspenRegisteredProperties>) => void;

  /**
   * Get a CSS custom property value
   */
  getProperty: (name: HaspenCSSPropertyName) => string;

  /**
   * Set a CSS custom property value
   */
  setProperty: (name: HaspenCSSPropertyName, value: string) => void;

  /**
   * Remove a CSS custom property
   */
  removeProperty: (name: HaspenCSSPropertyName) => void;

  /**
   * Property name constants for type safety
   */
  properties: typeof HASPEN_CSS_PROPERTIES;
}

/**
 * Composable for managing registered CSS custom properties
 *
 * Provides utilities for:
 * - Automatic registration of CSS @property definitions
 * - Type-safe property name access
 * - Browser support detection
 * - Runtime property manipulation
 *
 * @param options - Configuration options
 * @returns Utilities for working with registered CSS properties
 *
 * @example
 * ```ts
 * const { isSupported, register, getProperty, setProperty, properties } = useRegisteredProperties();
 *
 * // Check if registered properties are supported
 * if (isSupported.value) {
 *   // Set a custom value for a registered property
 *   setProperty('COLOR_PRIMARY', '#ff0000');
 *
 *   // Get the current value
 *   const primaryColor = getProperty('COLOR_PRIMARY');
 * }
 * ```
 */
export function useRegisteredProperties(
  options: UseRegisteredPropertiesOptions = {},
): UseRegisteredPropertiesReturn {
  const {
    autoRegister = true,
    properties = HASPEN_REGISTERED_PROPERTIES,
    warn = true,
  } = options;

  const isSupported = ref(false);
  const isRegistered = ref(false);

  // Check browser support
  function checkSupport(): boolean {
    return (
      typeof CSS !== 'undefined' && typeof CSS.registerProperty === 'function'
    );
  }

  // Register CSS properties
  function register(
    propertiesToRegister: Partial<HaspenRegisteredProperties> = properties,
  ): void {
    if (!checkSupport()) {
      if (warn) {
        logger.warn(
          'CSS.registerProperty is not supported. Properties will fall back to regular custom properties.',
          {
            component: 'useRegisteredProperties',
            action: 'registerProperties',
            severity: 'low',
          },
        );
      }
      return;
    }

    try {
      registerCSSProperties(propertiesToRegister);
      isRegistered.value = true;
    } catch (error) {
      if (warn) {
        logger.error('Failed to register CSS properties', {
          component: 'useRegisteredProperties',
          action: 'registerProperties',
          severity: 'medium',
          metadata: { error: String(error) },
        });
      }
    }
  }

  // Get CSS custom property value
  function getProperty(name: HaspenCSSPropertyName): string {
    const propertyName = HASPEN_CSS_PROPERTIES[name];
    return getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();
  }

  // Set CSS custom property value
  function setProperty(name: HaspenCSSPropertyName, value: string): void {
    const propertyName = HASPEN_CSS_PROPERTIES[name];
    document.documentElement.style.setProperty(propertyName, value);
  }

  // Remove CSS custom property
  function removeProperty(name: HaspenCSSPropertyName): void {
    const propertyName = HASPEN_CSS_PROPERTIES[name];
    document.documentElement.style.removeProperty(propertyName);
  }

  onMounted(() => {
    isSupported.value = checkSupport();

    if (autoRegister && isSupported.value) {
      register();
    }
  });

  return {
    isSupported: readonly(isSupported),
    isRegistered: readonly(isRegistered),
    register,
    getProperty,
    setProperty,
    removeProperty,
    properties: HASPEN_CSS_PROPERTIES,
  };
}

// Type-safe utility for getting property names
export function usePropertyName(name: HaspenCSSPropertyName): string {
  return HASPEN_CSS_PROPERTIES[name];
}

/**
 * Reactive CSS custom property hook
 *
 * Creates a reactive reference to a CSS custom property that updates when the property changes.
 *
 * @param name - Property name constant
 * @param initialValue - Initial/fallback value
 * @returns Reactive reference to the property value
 *
 * @example
 * ```ts
 * const primaryColor = useCSSProperty('COLOR_PRIMARY', '#0059b3');
 *
 * // Changes automatically when CSS property changes
 * watch(primaryColor, (newColor) => {
 *   console.log('Primary color changed to:', newColor);
 * });
 * ```
 */
export function useCSSProperty(
  name: HaspenCSSPropertyName,
  initialValue?: string,
): Ref<string> {
  const propertyValue = ref(initialValue || '');

  onMounted(() => {
    const propertyName = HASPEN_CSS_PROPERTIES[name];

    // Set initial value from computed styles
    const computedValue = getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();

    if (computedValue) {
      propertyValue.value = computedValue;
    }

    // Watch for changes using MutationObserver
    const observer = new MutationObserver(() => {
      const newValue = getComputedStyle(document.documentElement)
        .getPropertyValue(propertyName)
        .trim();

      if (newValue && newValue !== propertyValue.value) {
        propertyValue.value = newValue;
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  });

  return propertyValue;
}
