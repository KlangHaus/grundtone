import { GtComponent } from './base';

const FOCUSABLE_ITEM =
  '.overflow-menu__link:not(.overflow-menu__link--disabled)';

export class OverflowMenu extends GtComponent {
  private trigger!: HTMLElement | null;
  private panel!: HTMLElement | null;
  private isOpen!: boolean;
  private boundTriggerClick!: () => void;
  private boundKeydown!: (e: KeyboardEvent) => void;
  private boundOutsideClick!: (e: MouseEvent) => void;

  protected init(): void {
    this.trigger = this.el.querySelector('.overflow-menu__trigger');
    this.panel = this.el.querySelector('.overflow-menu__panel');
    this.isOpen = false;

    this.boundTriggerClick = () => this.toggle();
    this.boundKeydown = (e: KeyboardEvent) => this.onKeydown(e);
    this.boundOutsideClick = (e: MouseEvent) => this.onOutsideClick(e);

    if (this.trigger) {
      this.trigger.setAttribute('aria-haspopup', 'menu');
      this.trigger.setAttribute('aria-expanded', 'false');
      this.trigger.addEventListener('click', this.boundTriggerClick);
    }

    if (this.panel) {
      this.panel.setAttribute('role', 'menu');
      // Set role="menuitem" on links
      this.panel
        .querySelectorAll('.overflow-menu__link')
        .forEach(link => link.setAttribute('role', 'menuitem'));
    }
  }

  toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.el.classList.add('overflow-menu--open');
    this.trigger?.setAttribute('aria-expanded', 'true');

    document.addEventListener('click', this.boundOutsideClick);
    this.el.addEventListener('keydown', this.boundKeydown);

    // Focus first item
    const first = this.panel?.querySelector<HTMLElement>(FOCUSABLE_ITEM);
    if (first) first.focus();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.el.classList.remove('overflow-menu--open');
    this.trigger?.setAttribute('aria-expanded', 'false');

    document.removeEventListener('click', this.boundOutsideClick);
    this.el.removeEventListener('keydown', this.boundKeydown);

    this.trigger?.focus();
  }

  private getItems(): HTMLElement[] {
    if (!this.panel) return [];
    return Array.from(this.panel.querySelectorAll<HTMLElement>(FOCUSABLE_ITEM));
  }

  private onKeydown(e: KeyboardEvent): void {
    const items = this.getItems();
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < items.length - 1) items[currentIndex + 1].focus();
        else items[0].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) items[currentIndex - 1].focus();
        else items[items.length - 1].focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
    }
  }

  private onOutsideClick(e: MouseEvent): void {
    if (!this.el.contains(e.target as Node)) {
      this.close();
    }
  }

  destroy(): void {
    document.removeEventListener('click', this.boundOutsideClick);
    this.el.removeEventListener('keydown', this.boundKeydown);
    if (this.trigger) {
      this.trigger.removeEventListener('click', this.boundTriggerClick);
    }
    this.markDestroyed();
  }
}
