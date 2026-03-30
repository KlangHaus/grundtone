import { GtComponent } from './base';

export class Toggle extends GtComponent {
  private clickHandler!: (() => void) | null;

  protected init(): void {
    this.clickHandler = null;
    // Ensure ARIA
    if (!this.el.getAttribute('role')) {
      this.el.setAttribute('role', 'switch');
    }

    const isChecked = this.el.classList.contains('toggle--checked');
    this.el.setAttribute('aria-checked', String(isChecked));

    this.clickHandler = () => this.onToggle();
    this.el.addEventListener('click', this.clickHandler);
  }

  private onToggle(): void {
    if (
      this.el.hasAttribute('disabled') ||
      this.el.classList.contains('toggle--disabled')
    ) {
      return;
    }

    const isChecked = this.el.classList.contains('toggle--checked');
    const newState = !isChecked;

    this.el.classList.toggle('toggle--checked', newState);
    this.el.setAttribute('aria-checked', String(newState));

    this.el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  destroy(): void {
    if (this.clickHandler) {
      this.el.removeEventListener('click', this.clickHandler);
    }
    this.markDestroyed();
  }
}
