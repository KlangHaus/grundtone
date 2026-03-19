let counter = 0;

/** Generate a unique ID for ARIA linkage. */
export function uid(prefix = 'gt'): string {
  return `${prefix}-${++counter}`;
}

/** Check if user prefers reduced motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate an element open from height 0 → auto using scrollHeight measurement.
 * Replicates the Vue AccordionItem slide logic.
 */
export function slideOpen(el: HTMLElement, done?: () => void): void {
  if (prefersReducedMotion()) {
    el.style.height = 'auto';
    done?.();
    return;
  }

  // Measure natural height
  el.style.height = 'auto';
  const height = el.scrollHeight;
  el.style.height = '0px';

  // Force reflow
  void el.offsetHeight;

  el.style.height = `${height}px`;
  el.addEventListener(
    'transitionend',
    () => {
      el.style.height = 'auto';
      done?.();
    },
    { once: true },
  );
}

/**
 * Animate an element closed from current height → 0.
 */
export function slideClose(el: HTMLElement, done?: () => void): void {
  if (prefersReducedMotion()) {
    el.style.height = '0px';
    done?.();
    return;
  }

  el.style.height = `${el.scrollHeight}px`;

  // Force reflow
  void el.offsetHeight;

  el.style.height = '0px';
  el.addEventListener(
    'transitionend',
    () => {
      done?.();
    },
    { once: true },
  );
}
