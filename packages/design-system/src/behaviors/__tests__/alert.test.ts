import { describe, it, expect, beforeEach } from 'vitest';
import { Alert } from '../alert';
import { GtComponent } from '../base';

function createAlert(dismissible = true): HTMLElement {
  document.body.innerHTML = `
    <div class="alert alert--info"${dismissible ? ' data-dismissible' : ''} role="status">
      <div class="alert__content">
        <p class="alert__heading">Info</p>
        <div class="alert__body"><p>Message</p></div>
      </div>
      ${dismissible ? '<button class="alert__close" aria-label="Close">&times;</button>' : ''}
    </div>
  `;
  return document.querySelector('.alert')!;
}

describe('Alert', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes on dismissible alert', () => {
    const el = createAlert(true);
    const instance = new Alert(el);
    expect(GtComponent.getInstance(el)).toBe(instance);
  });

  it('removes element on dismiss', () => {
    const el = createAlert(true);
    new Alert(el);

    const closeBtn = el.querySelector('.alert__close') as HTMLElement;
    closeBtn.click();

    expect(document.querySelector('.alert')).toBeNull();
  });

  it('dispatches gt:dismiss event', () => {
    const el = createAlert(true);
    new Alert(el);

    let dismissed = false;
    el.addEventListener('gt:dismiss', () => {
      dismissed = true;
    });

    const closeBtn = el.querySelector('.alert__close') as HTMLElement;
    closeBtn.click();

    expect(dismissed).toBe(true);
  });

  it('can prevent dismissal via event.preventDefault()', () => {
    const el = createAlert(true);
    new Alert(el);

    el.addEventListener('gt:dismiss', e => {
      e.preventDefault();
    });

    const closeBtn = el.querySelector('.alert__close') as HTMLElement;
    closeBtn.click();

    // Element should still be in DOM
    expect(document.querySelector('.alert')).not.toBeNull();
  });

  it('does nothing on non-dismissible alert', () => {
    const el = createAlert(false);
    new Alert(el);

    // No close button exists, no crash
    expect(GtComponent.getInstance(el)).not.toBeNull();
  });

  it('destroy removes listener', () => {
    const el = createAlert(true);
    const instance = new Alert(el);
    instance.destroy();

    const closeBtn = el.querySelector('.alert__close') as HTMLElement;
    closeBtn.click();

    // Element should still be in DOM
    expect(document.querySelector('.alert')).not.toBeNull();
  });
});
