import { GtComponent } from './base';
import { uid } from './utils';

export class Tabs extends GtComponent {
  private tabs!: HTMLElement[];
  private panels!: HTMLElement[];
  private clickHandlers!: Map<HTMLElement, (e: Event) => void>;
  private keydownHandler!: ((e: KeyboardEvent) => void) | null;

  protected init(): void {
    this.clickHandlers = new Map();
    this.keydownHandler = null;
    this.tabs = Array.from(this.el.querySelectorAll<HTMLElement>('.tabs__tab'));
    this.panels = Array.from(
      this.el.querySelectorAll<HTMLElement>('.tabs__panel'),
    );

    // Ensure ARIA attributes
    const list = this.el.querySelector('.tabs__list');
    if (list && !list.getAttribute('role')) {
      list.setAttribute('role', 'tablist');
    }

    for (let i = 0; i < this.tabs.length; i++) {
      const tab = this.tabs[i];
      const panel = this.panels[i] as HTMLElement | undefined;

      // Set role
      if (!tab.getAttribute('role')) {
        tab.setAttribute('role', 'tab');
      }

      // Generate IDs
      if (!tab.id) tab.id = uid('tab');
      if (panel && !panel.id) panel.id = uid('tabpanel');

      // Link tab ↔ panel
      if (panel) {
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', tab.id);
        if (!panel.getAttribute('role')) {
          panel.setAttribute('role', 'tabpanel');
        }
        panel.setAttribute('tabindex', '0');
      }

      const isActive = tab.classList.contains('tabs__tab--active');
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');

      if (panel) {
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      }

      // Click handler
      const handler = () => this.activate(i);
      tab.addEventListener('click', handler);
      this.clickHandlers.set(tab, handler);
    }

    // Keyboard navigation on the tab list
    this.keydownHandler = (e: KeyboardEvent) => this.onKeydown(e);
    const tablist = this.el.querySelector('[role="tablist"]');
    (tablist ?? this.el).addEventListener(
      'keydown',
      this.keydownHandler as EventListener,
    );
  }

  private activate(index: number): void {
    for (let i = 0; i < this.tabs.length; i++) {
      const tab = this.tabs[i];
      const panel = this.panels[i] as HTMLElement | undefined;
      const isActive = i === index;

      tab.classList.toggle('tabs__tab--active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');

      if (panel) {
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      }
    }
  }

  private onKeydown(e: KeyboardEvent): void {
    const currentIndex = this.tabs.findIndex(t => t === document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % this.tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = this.tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    this.activate(nextIndex);
    this.tabs[nextIndex].focus();
  }

  destroy(): void {
    for (const [tab, handler] of this.clickHandlers) {
      tab.removeEventListener('click', handler);
    }
    this.clickHandlers.clear();

    if (this.keydownHandler) {
      const tablist = this.el.querySelector('[role="tablist"]');
      (tablist ?? this.el).removeEventListener(
        'keydown',
        this.keydownHandler as EventListener,
      );
    }

    this.markDestroyed();
  }
}
