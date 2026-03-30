import { GtComponent } from './base';

export class Toast extends GtComponent {
  private closeHandler!: ((e: Event) => void) | null;
  private animEndHandler!: EventListener | null;

  protected init(): void {
    this.closeHandler = null;
    this.animEndHandler = null;

    // Close button
    const closeBtn = this.el.querySelector('.toast__close');
    if (closeBtn) {
      this.closeHandler = () => this.dismiss();
      closeBtn.addEventListener('click', this.closeHandler);
    }

    // Auto-dismiss via countdown animation end
    const countdown = this.el.querySelector('.toast__countdown');
    if (countdown) {
      this.animEndHandler = () => this.dismiss();
      countdown.addEventListener(
        'animationend',
        this.animEndHandler as EventListener,
      );
    }
  }

  private dismiss(): void {
    this.el.classList.add('toast--dismissing');

    const onTransitionEnd = () => {
      this.el.removeEventListener('transitionend', onTransitionEnd);
      this.el.remove();
      this.markDestroyed();
    };

    this.el.addEventListener('transitionend', onTransitionEnd);

    // Fallback if no transition fires
    setTimeout(() => {
      if (this.el.parentNode) {
        this.el.remove();
        this.markDestroyed();
      }
    }, 500);
  }

  destroy(): void {
    if (this.closeHandler) {
      const closeBtn = this.el.querySelector('.toast__close');
      closeBtn?.removeEventListener('click', this.closeHandler);
    }
    if (this.animEndHandler) {
      const countdown = this.el.querySelector('.toast__countdown');
      countdown?.removeEventListener(
        'animationend',
        this.animEndHandler as EventListener,
      );
    }
    this.markDestroyed();
  }
}
