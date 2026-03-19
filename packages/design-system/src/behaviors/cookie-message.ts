import { GtComponent } from './base';

export class CookieMessage extends GtComponent {
  private handlers!: Array<[HTMLElement, string, () => void]>;

  protected init(): void {
    this.handlers = [];

    // Accept buttons
    this.bindAll('[data-action="accept"]', 'click', () =>
      this.emit('gt:cookie-accept'),
    );

    // Reject buttons
    this.bindAll('[data-action="reject"]', 'click', () =>
      this.emit('gt:cookie-reject'),
    );

    // Settings toggle buttons
    this.bindAll('[data-action="settings"]', 'click', () =>
      this.toggleSettings(),
    );

    // Close button
    const closeBtn = this.el.querySelector('.cookie-message__close');
    if (closeBtn) {
      this.bind(closeBtn as HTMLElement, 'click', () =>
        this.emit('gt:cookie-accept'),
      );
    }
  }

  private bindAll(selector: string, event: string, handler: () => void): void {
    const elements = Array.from(
      this.el.querySelectorAll<HTMLElement>(selector),
    );
    for (const el of elements) {
      this.bind(el, event, handler);
    }
  }

  private bind(el: HTMLElement, event: string, handler: () => void): void {
    el.addEventListener(event, handler);
    this.handlers.push([el, event, handler]);
  }

  private toggleSettings(): void {
    const panel = this.el.querySelector(
      '.cookie-message__settings',
    ) as HTMLElement | null;
    if (!panel) {
      // No settings panel — just emit event
      this.emit('gt:cookie-settings');
      return;
    }

    const isOpen = !panel.hasAttribute('hidden');
    if (isOpen) {
      panel.setAttribute('hidden', '');
    } else {
      panel.removeAttribute('hidden');
    }

    // Update aria-expanded on settings buttons
    const btns = Array.from(
      this.el.querySelectorAll<HTMLElement>('[data-action="settings"]'),
    );
    for (const btn of btns) {
      btn.setAttribute('aria-expanded', String(!isOpen));
    }
  }

  private emit(name: string): void {
    this.el.dispatchEvent(new CustomEvent(name, { bubbles: true }));
  }

  destroy(): void {
    for (const [el, event, handler] of this.handlers) {
      el.removeEventListener(event, handler);
    }
    this.handlers = [];
    this.markDestroyed();
  }
}
