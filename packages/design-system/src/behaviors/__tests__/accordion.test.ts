import { describe, it, expect, beforeEach } from 'vitest';
import { Accordion } from '../accordion';
import { GtComponent } from '../base';

function createAccordion(
  transition: string = 'none',
  itemCount: number = 2,
): HTMLElement {
  const html = `
    <div class="accordion" data-transition="${transition}" role="region" aria-label="Test">
      <button class="accordion__toggle-all">Toggle all</button>
      ${Array.from(
        { length: itemCount },
        (_, i) => `
        <div class="accordion__item${i === 0 ? ' accordion__item--open' : ''}">
          <button class="accordion__header" aria-expanded="${i === 0}">
            <span class="accordion__icon" aria-hidden="true"></span>
            <span class="accordion__heading">Item ${i + 1}</span>
          </button>
          <div class="accordion__panel" role="region">
            <div class="accordion__body"><p>Content ${i + 1}</p></div>
          </div>
        </div>
      `,
      ).join('')}
    </div>
  `;
  document.body.innerHTML = html;
  return document.querySelector('.accordion')!;
}

describe('Accordion', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes with correct ARIA attributes', () => {
    const el = createAccordion('none');
    new Accordion(el);

    const headers = el.querySelectorAll('.accordion__header');
    const panels = el.querySelectorAll('.accordion__panel');

    expect(headers[0].getAttribute('aria-expanded')).toBe('true');
    expect(headers[1].getAttribute('aria-expanded')).toBe('false');
    expect(headers[0].getAttribute('aria-controls')).toBe(panels[0].id);
    expect(panels[0].getAttribute('aria-labelledby')).toBe(headers[0].id);
  });

  it('toggles item on click', () => {
    const el = createAccordion('none');
    new Accordion(el);

    const header = el.querySelectorAll('.accordion__header')[1] as HTMLElement;
    const item = header.closest('.accordion__item')!;

    expect(item.classList.contains('accordion__item--open')).toBe(false);

    header.click();
    expect(item.classList.contains('accordion__item--open')).toBe(true);
    expect(header.getAttribute('aria-expanded')).toBe('true');

    header.click();
    expect(item.classList.contains('accordion__item--open')).toBe(false);
    expect(header.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggle-all opens all, then closes all', () => {
    const el = createAccordion('none');
    new Accordion(el);

    const toggleAll = el.querySelector('.accordion__toggle-all') as HTMLElement;
    const items = el.querySelectorAll('.accordion__item');

    // Not all open initially (item 2 is closed)
    toggleAll.click();
    expect(items[0].classList.contains('accordion__item--open')).toBe(true);
    expect(items[1].classList.contains('accordion__item--open')).toBe(true);

    // All open → close all
    toggleAll.click();
    expect(items[0].classList.contains('accordion__item--open')).toBe(false);
    expect(items[1].classList.contains('accordion__item--open')).toBe(false);
  });

  it('throws if initialized twice on same element', () => {
    const el = createAccordion('none');
    new Accordion(el);
    expect(() => new Accordion(el)).toThrow('Already initialized');
  });

  it('destroy removes listeners — click after destroy does nothing', () => {
    const el = createAccordion('none');
    const instance = new Accordion(el);

    const header = el.querySelectorAll('.accordion__header')[1] as HTMLElement;
    const item = header.closest('.accordion__item')!;

    instance.destroy();

    header.click();
    expect(item.classList.contains('accordion__item--open')).toBe(false);
  });

  it('getInstance returns instance or null', () => {
    const el = createAccordion('none');
    expect(GtComponent.getInstance(el)).toBeNull();

    const instance = new Accordion(el);
    expect(GtComponent.getInstance(el)).toBe(instance);

    instance.destroy();
    expect(GtComponent.getInstance(el)).toBeNull();
  });

  it('hides closed panels with hidden attribute for none transition', () => {
    const el = createAccordion('none');
    new Accordion(el);

    const panels = el.querySelectorAll('.accordion__panel');
    // First item is open
    expect(panels[0].hasAttribute('hidden')).toBe(false);
    // Second item is closed
    expect(panels[1].hasAttribute('hidden')).toBe(true);
  });

  it('applies slide classes for slide transition', () => {
    const el = createAccordion('slide');
    new Accordion(el);

    const panels = el.querySelectorAll('.accordion__panel');
    expect(panels[0].classList.contains('accordion__panel--slide')).toBe(true);
    expect(panels[0].classList.contains('accordion__panel--open')).toBe(true);
    expect((panels[0] as HTMLElement).style.height).toBe('auto');

    expect(panels[1].classList.contains('accordion__panel--slide')).toBe(true);
    expect((panels[1] as HTMLElement).style.height).toBe('0px');
  });

  it('applies fade classes for fade transition', () => {
    const el = createAccordion('fade');
    new Accordion(el);

    const panels = el.querySelectorAll('.accordion__panel');
    expect(panels[0].classList.contains('accordion__panel--fade')).toBe(true);
    expect(panels[0].classList.contains('accordion__panel--open')).toBe(true);
    expect(panels[1].classList.contains('accordion__panel--fade')).toBe(true);
    expect(panels[1].classList.contains('accordion__panel--open')).toBe(false);
  });
});
