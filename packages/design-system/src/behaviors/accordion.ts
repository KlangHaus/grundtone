import { GtComponent } from './base';
import { uid, slideOpen, slideClose } from './utils';

type Transition = 'slide' | 'fade' | 'none';

export class Accordion extends GtComponent {
  private transition!: Transition;
  private headers!: HTMLElement[];
  private headerHandlers!: Map<HTMLElement, () => void>;
  private toggleAllBtn!: HTMLElement | null;
  private toggleAllHandler!: (() => void) | null;

  protected init(): void {
    this.headerHandlers = new Map();
    this.toggleAllBtn = null;
    this.toggleAllHandler = null;
    this.transition = (this.el.dataset.transition as Transition) || 'slide';

    // Wire up each accordion item
    this.headers = Array.from(
      this.el.querySelectorAll<HTMLElement>('.accordion__header'),
    );

    for (const header of this.headers) {
      const item = header.closest('.accordion__item') as HTMLElement | null;
      if (!item) continue;

      this.ensureAria(header, item);
      this.syncPanel(item, item.classList.contains('accordion__item--open'));

      const handler = () => this.toggle(item);
      header.addEventListener('click', handler);
      this.headerHandlers.set(header, handler);
    }

    // Toggle-all button
    this.toggleAllBtn = this.el.querySelector('.accordion__toggle-all');
    if (this.toggleAllBtn) {
      this.toggleAllHandler = () => this.toggleAll();
      this.toggleAllBtn.addEventListener('click', this.toggleAllHandler);
    }
  }

  private getItems(): HTMLElement[] {
    return Array.from(
      this.el.querySelectorAll<HTMLElement>('.accordion__item'),
    );
  }

  private ensureAria(header: HTMLElement, item: HTMLElement): void {
    const panel = item.querySelector('.accordion__panel') as HTMLElement | null;
    if (!panel) return;

    const isOpen = item.classList.contains('accordion__item--open');
    header.setAttribute('aria-expanded', String(isOpen));

    // Generate IDs if missing
    if (!panel.id) {
      const id = uid('accordion-panel');
      panel.id = id;
    }
    if (!header.id) {
      header.id = uid('accordion-header');
    }

    header.setAttribute('aria-controls', panel.id);
    panel.setAttribute('aria-labelledby', header.id);
    panel.setAttribute('role', 'region');
  }

  private toggle(item: HTMLElement): void {
    const isOpen = item.classList.contains('accordion__item--open');
    if (isOpen) {
      this.close(item);
    } else {
      this.open(item);
    }
  }

  private open(item: HTMLElement): void {
    item.classList.add('accordion__item--open');
    const header = item.querySelector('.accordion__header') as HTMLElement;
    header?.setAttribute('aria-expanded', 'true');
    this.showPanel(item);
  }

  private close(item: HTMLElement): void {
    const header = item.querySelector('.accordion__header') as HTMLElement;
    header?.setAttribute('aria-expanded', 'false');
    this.hidePanel(item, () => {
      item.classList.remove('accordion__item--open');
    });
  }

  private showPanel(item: HTMLElement): void {
    const panel = item.querySelector('.accordion__panel') as HTMLElement | null;
    if (!panel) return;

    switch (this.transition) {
      case 'slide':
        panel.classList.add('accordion__panel--slide');
        panel.classList.add('accordion__panel--open');
        slideOpen(panel);
        break;
      case 'fade':
        panel.classList.add('accordion__panel--fade');
        panel.classList.add('accordion__panel--open');
        break;
      case 'none':
        panel.classList.add('accordion__panel--none');
        panel.classList.add('accordion__panel--open');
        panel.removeAttribute('hidden');
        break;
    }
  }

  private hidePanel(item: HTMLElement, done: () => void): void {
    const panel = item.querySelector('.accordion__panel') as HTMLElement | null;
    if (!panel) {
      done();
      return;
    }

    switch (this.transition) {
      case 'slide':
        slideClose(panel, () => {
          panel.classList.remove('accordion__panel--open');
          done();
        });
        break;
      case 'fade':
        panel.classList.remove('accordion__panel--open');
        done();
        break;
      case 'none':
        panel.classList.remove('accordion__panel--open');
        panel.setAttribute('hidden', '');
        done();
        break;
    }
  }

  /**
   * Sync panel state for initial render (no animation).
   */
  private syncPanel(item: HTMLElement, isOpen: boolean): void {
    const panel = item.querySelector('.accordion__panel') as HTMLElement | null;
    if (!panel) return;

    switch (this.transition) {
      case 'slide':
        panel.classList.add('accordion__panel--slide');
        if (isOpen) {
          panel.classList.add('accordion__panel--open');
          panel.style.height = 'auto';
        } else {
          panel.classList.remove('accordion__panel--open');
          panel.style.height = '0px';
        }
        break;
      case 'fade':
        panel.classList.add('accordion__panel--fade');
        if (isOpen) {
          panel.classList.add('accordion__panel--open');
        } else {
          panel.classList.remove('accordion__panel--open');
        }
        break;
      case 'none':
        panel.classList.add('accordion__panel--none');
        if (isOpen) {
          panel.classList.add('accordion__panel--open');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('accordion__panel--open');
          panel.setAttribute('hidden', '');
        }
        break;
    }
  }

  private toggleAll(): void {
    const items = this.getItems();
    const allOpen = items.every(item =>
      item.classList.contains('accordion__item--open'),
    );

    for (const item of items) {
      if (allOpen) {
        this.close(item);
      } else {
        if (!item.classList.contains('accordion__item--open')) {
          this.open(item);
        }
      }
    }
  }

  destroy(): void {
    for (const [header, handler] of this.headerHandlers) {
      header.removeEventListener('click', handler);
    }
    this.headerHandlers.clear();

    if (this.toggleAllBtn && this.toggleAllHandler) {
      this.toggleAllBtn.removeEventListener('click', this.toggleAllHandler);
    }

    this.markDestroyed();
  }
}
