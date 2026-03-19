import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AnchorLinks } from '../anchor-links';
import { GtComponent } from '../base';

function createAnchorLinks(): HTMLElement {
  document.body.innerHTML = `
    <nav class="anchor-links" aria-label="Table of contents">
      <ol class="anchor-links__list">
        <li class="anchor-links__item">
          <a href="#section-1" class="anchor-links__link anchor-links__link--active" aria-current="true">Section 1</a>
        </li>
        <li class="anchor-links__item">
          <a href="#section-2" class="anchor-links__link">Section 2</a>
        </li>
        <li class="anchor-links__item">
          <a href="#section-3" class="anchor-links__link">Section 3</a>
        </li>
      </ol>
    </nav>
    <div id="section-1"><h2>Section 1</h2></div>
    <div id="section-2"><h2>Section 2</h2></div>
    <div id="section-3"><h2>Section 3</h2></div>
  `;
  return document.querySelector('.anchor-links')!;
}

// jsdom doesn't implement scrollIntoView
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('AnchorLinks', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes correctly', () => {
    const el = createAnchorLinks();
    const instance = new AnchorLinks(el);
    expect(GtComponent.getInstance(el)).toBe(instance);
  });

  it('handles click with smooth scroll and history push', () => {
    const el = createAnchorLinks();
    new AnchorLinks(el);

    const section2 = document.getElementById('section-2')!;
    const pushStateSpy = vi
      .spyOn(window.history, 'pushState')
      .mockImplementation(() => {});

    const link = el.querySelectorAll('.anchor-links__link')[1] as HTMLElement;
    link.click();

    expect(section2.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#section-2');
  });

  it('updates active link on click', () => {
    const el = createAnchorLinks();
    new AnchorLinks(el);

    const links = el.querySelectorAll('.anchor-links__link');
    const link2 = links[1] as HTMLElement;
    const link1 = links[0] as HTMLElement;

    vi.spyOn(window.history, 'pushState').mockImplementation(() => {});

    link2.click();

    expect(link2.classList.contains('anchor-links__link--active')).toBe(true);
    expect(link2.getAttribute('aria-current')).toBe('true');
    expect(link1.classList.contains('anchor-links__link--active')).toBe(false);
    expect(link1.hasAttribute('aria-current')).toBe(false);
  });

  it('prevents default on click', () => {
    const el = createAnchorLinks();
    new AnchorLinks(el);

    vi.spyOn(window.history, 'pushState').mockImplementation(() => {});

    const link = el.querySelector('.anchor-links__link') as HTMLElement;
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    const preventSpy = vi.spyOn(event, 'preventDefault');

    link.dispatchEvent(event);
    expect(preventSpy).toHaveBeenCalled();
  });

  it('destroy cleans up', () => {
    const el = createAnchorLinks();
    const instance = new AnchorLinks(el);
    instance.destroy();

    expect(GtComponent.getInstance(el)).toBeNull();

    // Click should not trigger scroll after destroy
    const section2 = document.getElementById('section-2')!;
    (section2.scrollIntoView as ReturnType<typeof vi.fn>).mockClear();

    const link = el.querySelectorAll('.anchor-links__link')[1] as HTMLElement;
    link.click();

    expect(section2.scrollIntoView).not.toHaveBeenCalled();
  });
});
