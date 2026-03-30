export interface ScrollLock {
  lock(): void;
  unlock(): void;
}

/**
 * Locks body scroll with scrollbar width compensation to avoid layout shift.
 * Call lock() when showing an overlay, unlock() when hiding it.
 */
export function createScrollLock(): ScrollLock {
  let locked = false;
  let originalOverflow = '';
  let originalPaddingRight = '';

  function lock(): void {
    if (locked) return;
    locked = true;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  function unlock(): void {
    if (!locked) return;
    locked = false;

    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  }

  return { lock, unlock };
}
