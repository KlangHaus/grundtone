import { GtComponent } from './base';

export class Tooltip extends GtComponent {
  private trigger!: HTMLElement;
  private bubble!: HTMLElement | null;
  private showHandler!: () => void;
  private hideHandler!: () => void;
  private keydownHandler!: (e: KeyboardEvent) => void;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  protected init(): void {
    this.trigger = this.el;
    this.bubble = this.el.querySelector('.tooltip__bubble');
    if (!this.bubble) return;

    const isClick = this.el.getAttribute('data-trigger') === 'click';

    if (isClick) {
      this.showHandler = () => this.toggle();
      this.trigger.addEventListener('click', this.showHandler);
    } else {
      this.showHandler = () => this.show();
      this.hideHandler = () => this.hide();
      this.trigger.addEventListener('mouseenter', this.showHandler);
      this.trigger.addEventListener('focusin', this.showHandler);
      this.trigger.addEventListener('mouseleave', this.hideHandler);
      this.trigger.addEventListener('focusout', this.hideHandler);
    }

    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.hide();
    };
    this.trigger.addEventListener('keydown', this.keydownHandler);
  }

  private show(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.bubble?.classList.add('tooltip__bubble--visible');
    this.computePosition();
  }

  private hide(): void {
    this.hideTimeout = setTimeout(() => {
      this.bubble?.classList.remove('tooltip__bubble--visible');
    }, 100);
  }

  private toggle(): void {
    if (this.bubble?.classList.contains('tooltip__bubble--visible')) {
      this.hide();
    } else {
      this.show();
    }
  }

  private computePosition(): void {
    if (!this.bubble) return;
    const rect = this.trigger.getBoundingClientRect();
    const preferred = this.el.getAttribute('data-position') ?? 'top';

    // Flip if not enough space
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    let position = preferred;

    if (preferred === 'top' && spaceAbove < 80) position = 'bottom';
    if (preferred === 'bottom' && spaceBelow < 80) position = 'top';

    this.bubble.classList.toggle('tooltip__bubble--top', position === 'top');
    this.bubble.classList.toggle(
      'tooltip__bubble--bottom',
      position === 'bottom',
    );
  }

  destroy(): void {
    const isClick = this.el.getAttribute('data-trigger') === 'click';

    if (isClick) {
      this.trigger.removeEventListener('click', this.showHandler);
    } else {
      this.trigger.removeEventListener('mouseenter', this.showHandler);
      this.trigger.removeEventListener('focusin', this.showHandler);
      if (this.hideHandler) {
        this.trigger.removeEventListener('mouseleave', this.hideHandler);
        this.trigger.removeEventListener('focusout', this.hideHandler);
      }
    }
    this.trigger.removeEventListener('keydown', this.keydownHandler);

    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.markDestroyed();
  }
}
