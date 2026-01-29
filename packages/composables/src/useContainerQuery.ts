import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface UseContainerQueryOptions {
  /**
   * The container element to observe
   * If not provided, will use the parent element of the component
   */
  container?: Ref<HTMLElement | null> | HTMLElement | null;

  /**
   * Container query string (e.g., '(min-width: 320px)')
   */
  query: string;

  /**
   * Whether to enable the query immediately
   * @default true
   */
  enabled?: boolean;
}

export interface UseContainerQueryReturn {
  /**
   * Whether the container query matches
   */
  matches: Ref<boolean>;

  /**
   * Whether container queries are supported by the browser
   */
  isSupported: Ref<boolean>;

  /**
   * Start observing the container query
   */
  start: () => void;

  /**
   * Stop observing the container query
   */
  stop: () => void;
}

/**
 * Vue composable for container queries
 *
 * @example
 * ```vue
 * <template>
 *   <div ref="containerRef" class="haspen-container">
 *     <div v-if="matches">Large container content</div>
 *     <div v-else>Small container content</div>
 *   </div>
 * </template>
 *
 * <script setup>
 * import { ref } from 'vue'
 * import { useContainerQuery } from '@ipeeon/composables'
 *
 * const containerRef = ref()
 * const { matches } = useContainerQuery({
 *   container: containerRef,
 *   query: '(min-width: 400px)'
 * })
 * </script>
 * ```
 */
export function useContainerQuery(
  options: UseContainerQueryOptions,
): UseContainerQueryReturn {
  const { query, enabled = true } = options;

  const matches = ref(false);
  const isSupported = ref(false);

  let resizeObserver: ResizeObserver | null = null;
  let containerElement: HTMLElement | null = null;

  // Check browser support for container queries
  const checkSupport = () => {
    try {
      // Check if container queries are supported
      if (typeof CSS !== 'undefined' && CSS.supports) {
        isSupported.value = CSS.supports('container-type', 'inline-size');
      }
    } catch {
      isSupported.value = false;
    }
  };

  // Parse container query to extract breakpoint
  const parseQuery = (queryString: string): number | null => {
    const match = queryString.match(/min-width:\s*(\d+(?:\.\d+)?)(px|rem|em)/i);
    if (!match) return null;

    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case 'px':
        return value;
      case 'rem':
        return value * 16; // Assume 16px base font size
      case 'em':
        return value * 16; // Assume 16px base font size
      default:
        return null;
    }
  };

  // Fallback for browsers without container query support
  const checkMatchesFallback = (width: number, threshold: number): boolean => {
    const isMinWidth = query.includes('min-width');
    const isMaxWidth = query.includes('max-width');

    if (isMinWidth) {
      return width >= threshold;
    } else if (isMaxWidth) {
      return width <= threshold;
    }

    return false;
  };

  // Update matches based on container size
  const updateMatches = () => {
    if (!containerElement) return;

    if (isSupported.value) {
      // Use native container query support if available
      try {
        const computedStyle = getComputedStyle(containerElement);
        const hasContainerType =
          computedStyle.getPropertyValue('container-type') !== '';

        if (hasContainerType) {
          // For browsers with container query support, we'll rely on CSS
          // This is mainly for detecting support, actual matching is done via CSS
          matches.value = true;
          return;
        }
      } catch {
        // Fall through to manual calculation
      }
    }

    // Fallback: manually check container size
    const threshold = parseQuery(query);
    if (threshold !== null) {
      const containerRect = containerElement.getBoundingClientRect();
      matches.value = checkMatchesFallback(containerRect.width, threshold);
    }
  };

  // Start observing container size changes
  const start = () => {
    if (!enabled) return;

    // Get container element
    if (options.container) {
      if ('value' in options.container) {
        containerElement = options.container.value;
      } else {
        containerElement = options.container;
      }
    }

    if (!containerElement) return;

    // Set up ResizeObserver for fallback support
    if (!isSupported.value && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        updateMatches();
      });

      resizeObserver.observe(containerElement);
    }

    // Initial check
    updateMatches();
  };

  // Stop observing
  const stop = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  };

  onMounted(() => {
    checkSupport();
    if (enabled) {
      start();
    }
  });

  onUnmounted(() => {
    stop();
  });

  return {
    matches,
    isSupported,
    start,
    stop,
  };
}

/**
 * Preset container query hooks for common breakpoints
 */
export const useContainerQuerySm = (container?: Ref<HTMLElement | null>) =>
  useContainerQuery({ container, query: '(min-width: 384px)' });

export const useContainerQueryMd = (container?: Ref<HTMLElement | null>) =>
  useContainerQuery({ container, query: '(min-width: 512px)' });

export const useContainerQueryLg = (container?: Ref<HTMLElement | null>) =>
  useContainerQuery({ container, query: '(min-width: 768px)' });

export const useContainerQueryXl = (container?: Ref<HTMLElement | null>) =>
  useContainerQuery({ container, query: '(min-width: 1024px)' });

/**
 * Container query utilities for common patterns
 */
export const useResponsiveCard = (container?: Ref<HTMLElement | null>) => {
  const sm = useContainerQuerySm(container);
  const md = useContainerQueryMd(container);
  const lg = useContainerQueryLg(container);

  return {
    isCompact: ref(() => !sm.matches.value),
    isNormal: ref(() => sm.matches.value && !lg.matches.value),
    isSpacious: ref(() => lg.matches.value),
    ...sm,
    sm,
    md,
    lg,
  };
};
