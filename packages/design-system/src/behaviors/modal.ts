import { GtComponent } from './base';
import { prefersReducedMotion } from './utils';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export class Modal extends GtComponent {
  private dialog!: HTMLElement | null;
  private closeBtn!: HTMLElement | null;
  private isPersistent!: boolean;
  private previousFocus!: HTMLElement | null;
  private boundKeydown!: (e: KeyboardEvent) => void;
  private boundBackdropClick!: (e: MouseEvent) => void;
  private boundCloseClick!: () => void;
  private originalOverflow!: string;
  private originalPaddingRight!: string;

  protected init(): void {
    this.dialog = this.el.querySelector('.modal__dialog');
    this.closeBtn = this.el.querySelector('.modal__close');
    this.isPersistent = this.el.hasAttribute('data-persistent');
    this.previousFocus = null;
    this.originalOverflow = '';
    this.originalPaddingRight = '';

    this.boundKeydown = (e: KeyboardEvent) => this.onKeydown(e);
    this.boundBackdropClick = (e: MouseEvent) => this.onBackdropClick(e);
    this.boundCloseClick = () => this.close();

    // Wire up triggers that target this modal
    const id = this.el.id;
    if (id) {
      document
        .querySelectorAll<HTMLElement>(`[data-modal-target="#${id}"]`)
        .forEach(trigger => {
          trigger.addEventListener('click', () => this.open());
        });
    }

    if (this.closeBtn && !this.isPersistent) {
      this.closeBtn.addEventListener('click', this.boundCloseClick);
    }
  }

  open(): void {
    this.previousFocus = document.activeElement as HTMLElement;

    // Scroll lock
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    this.originalOverflow = document.body.style.overflow;
    this.originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    this.el.style.display = 'flex';
    this.el.setAttribute('aria-hidden', 'false');

    if (!prefersReducedMotion()) {
      this.el.classList.add('modal--entering');
      this.el.addEventListener(
        'animationend',
        () => this.el.classList.remove('modal--entering'),
        { once: true },
      );
    }

    document.addEventListener('keydown', this.boundKeydown);
    this.el.addEventListener('click', this.boundBackdropClick);

    // Focus trap — focus first focusable in dialog
    if (this.dialog) {
      const focusable = this.dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length > 0) focusable[0].focus();
    }

    this.el.dispatchEvent(new CustomEvent('gt:modal-open', { bubbles: true }));
  }

  close(): void {
    const event = new CustomEvent('gt:modal-close', {
      bubbles: true,
      cancelable: true,
    });
    if (!this.el.dispatchEvent(event)) return;

    document.removeEventListener('keydown', this.boundKeydown);
    this.el.removeEventListener('click', this.boundBackdropClick);

    const finish = () => {
      this.el.style.display = 'none';
      this.el.setAttribute('aria-hidden', 'true');

      // Restore scroll
      document.body.style.overflow = this.originalOverflow;
      document.body.style.paddingRight = this.originalPaddingRight;

      // Restore focus
      if (this.previousFocus) this.previousFocus.focus();
    };

    if (prefersReducedMotion()) {
      finish();
    } else {
      this.el.classList.add('modal--leaving');
      this.el.addEventListener(
        'animationend',
        () => {
          this.el.classList.remove('modal--leaving');
          finish();
        },
        { once: true },
      );
    }
  }

  private onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && !this.isPersistent) {
      e.preventDefault();
      this.close();
      return;
    }

    // Focus trap
    if (e.key === 'Tab' && this.dialog) {
      const focusable = Array.from(
        this.dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter(el => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  private onBackdropClick(e: MouseEvent): void {
    if (this.isPersistent) return;
    if (e.target === this.el) this.close();
  }

  destroy(): void {
    document.removeEventListener('keydown', this.boundKeydown);
    this.el.removeEventListener('click', this.boundBackdropClick);
    if (this.closeBtn) {
      this.closeBtn.removeEventListener('click', this.boundCloseClick);
    }
    // Restore scroll if still open
    document.body.style.overflow = this.originalOverflow;
    document.body.style.paddingRight = this.originalPaddingRight;
    this.markDestroyed();
  }
}
