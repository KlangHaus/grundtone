const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface FocusTrap {
  activate(): void;
  deactivate(): void;
}

/**
 * Creates a focus trap that cycles Tab/Shift+Tab within a container.
 * Call activate() when the container is visible, deactivate() when hidden.
 */
export function createFocusTrap(container: HTMLElement): FocusTrap {
  let handler: ((e: KeyboardEvent) => void) | null = null;

  function getFocusable(): HTMLElement[] {
    return Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter(el => el.offsetParent !== null);
  }

  function activate(): void {
    if (handler) return;

    handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', handler);

    // Focus first focusable element
    const focusable = getFocusable();
    if (focusable.length > 0) focusable[0].focus();
  }

  function deactivate(): void {
    if (handler) {
      container.removeEventListener('keydown', handler);
      handler = null;
    }
  }

  return { activate, deactivate };
}
