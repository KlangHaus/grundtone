import { describe, it, expect, beforeEach } from 'vitest';
import { Tabs } from '../tabs';
import { GtComponent } from '../base';

function createTabs(activeIndex: number = 0): HTMLElement {
  const tabs = ['Tab A', 'Tab B', 'Tab C'];
  const html = `
    <div class="tabs tabs--underline">
      <div class="tabs__list" role="tablist">
        ${tabs
          .map(
            (t, i) => `
          <button class="tabs__tab${i === activeIndex ? ' tabs__tab--active' : ''}" role="tab" aria-selected="${i === activeIndex}">${t}</button>
        `,
          )
          .join('')}
      </div>
      ${tabs
        .map(
          t => `
        <div class="tabs__panel" role="tabpanel"><p>${t} content</p></div>
      `,
        )
        .join('')}
    </div>
  `;
  document.body.innerHTML = html;
  return document.querySelector('.tabs')!;
}

describe('Tabs', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes with correct ARIA and visibility', () => {
    const el = createTabs(0);
    new Tabs(el);

    const tabs = el.querySelectorAll('.tabs__tab');
    const panels = el.querySelectorAll('.tabs__panel');

    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
    expect(tabs[1].getAttribute('tabindex')).toBe('-1');

    expect(panels[0].hasAttribute('hidden')).toBe(false);
    expect(panels[1].hasAttribute('hidden')).toBe(true);
    expect(panels[2].hasAttribute('hidden')).toBe(true);

    // ARIA linkage
    expect(tabs[0].getAttribute('aria-controls')).toBe(panels[0].id);
    expect(panels[0].getAttribute('aria-labelledby')).toBe(tabs[0].id);
  });

  it('switches tab on click', () => {
    const el = createTabs(0);
    new Tabs(el);

    const tabs = el.querySelectorAll('.tabs__tab') as NodeListOf<HTMLElement>;
    const panels = el.querySelectorAll('.tabs__panel');

    tabs[1].click();

    expect(tabs[0].classList.contains('tabs__tab--active')).toBe(false);
    expect(tabs[1].classList.contains('tabs__tab--active')).toBe(true);
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(panels[0].hasAttribute('hidden')).toBe(true);
    expect(panels[1].hasAttribute('hidden')).toBe(false);
  });

  it('keyboard ArrowRight navigates to next tab (wraps)', () => {
    const el = createTabs(0);
    new Tabs(el);

    const tabs = el.querySelectorAll('.tabs__tab') as NodeListOf<HTMLElement>;
    tabs[0].focus();

    tabs[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    expect(tabs[1].classList.contains('tabs__tab--active')).toBe(true);

    // Navigate to last and wrap
    tabs[1].focus();
    tabs[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    expect(tabs[2].classList.contains('tabs__tab--active')).toBe(true);

    tabs[2].focus();
    tabs[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    expect(tabs[0].classList.contains('tabs__tab--active')).toBe(true);
  });

  it('keyboard ArrowLeft navigates to previous tab (wraps)', () => {
    const el = createTabs(0);
    new Tabs(el);

    const tabs = el.querySelectorAll('.tabs__tab') as NodeListOf<HTMLElement>;
    tabs[0].focus();

    tabs[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    );
    expect(tabs[2].classList.contains('tabs__tab--active')).toBe(true);
  });

  it('keyboard Home/End jumps to first/last tab', () => {
    const el = createTabs(1);
    new Tabs(el);

    const tabs = el.querySelectorAll('.tabs__tab') as NodeListOf<HTMLElement>;
    tabs[1].focus();

    tabs[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true }),
    );
    expect(tabs[0].classList.contains('tabs__tab--active')).toBe(true);

    tabs[0].focus();
    tabs[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
    );
    expect(tabs[2].classList.contains('tabs__tab--active')).toBe(true);
  });

  it('destroy removes listeners', () => {
    const el = createTabs(0);
    const instance = new Tabs(el);
    instance.destroy();

    const tabs = el.querySelectorAll('.tabs__tab') as NodeListOf<HTMLElement>;
    tabs[1].click();

    // Tab 0 should still be active (click handler was removed)
    expect(tabs[0].classList.contains('tabs__tab--active')).toBe(true);
  });

  it('throws if initialized twice', () => {
    const el = createTabs(0);
    new Tabs(el);
    expect(() => new Tabs(el)).toThrow('Already initialized');
  });

  it('getInstance returns instance', () => {
    const el = createTabs(0);
    const instance = new Tabs(el);
    expect(GtComponent.getInstance(el)).toBe(instance);
  });
});
