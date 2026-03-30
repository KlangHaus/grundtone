import { GtComponent } from './base';

export class Alert extends GtComponent {
  private closeBtn!: HTMLElement | null;
  private closeHandler!: (() => void) | null;

  protected init(): void {
    this.closeBtn = null;
    this.closeHandler = null;

    // Only wire up if dismissible
    if (!this.el.hasAttribute('data-dismissible')) return;

    this.closeBtn = this.el.querySelector('.alert__close');
    if (!this.closeBtn) return;

    this.closeHandler = () => this.dismiss();
    this.closeBtn.addEventListener('click', this.closeHandler);
  }

  private dismiss(): void {
    const event = new CustomEvent('gt:dismiss', {
      bubbles: true,
      cancelable: true,
    });

    const allowed = this.el.dispatchEvent(event);
    if (allowed) {
      this.el.remove();
      this.markDestroyed();
    }
  }

  destroy(): void {
    if (this.closeBtn && this.closeHandler) {
      this.closeBtn.removeEventListener('click', this.closeHandler);
    }
    this.markDestroyed();
  }
}
