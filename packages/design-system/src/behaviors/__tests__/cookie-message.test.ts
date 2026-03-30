import { describe, it, expect, beforeEach } from 'vitest';
import { CookieMessage } from '../cookie-message';
import { GtComponent } from '../base';

function createCookieMessage(withSettings = true): HTMLElement {
  document.body.innerHTML = `
    <div class="cookie-message" role="region" aria-label="Cookiemeddelelse">
      <div class="cookie-message__content">
        <p class="cookie-message__heading">Vi bruger cookies</p>
        <div class="cookie-message__body"><p>Text</p></div>
        <div class="cookie-message__actions">
          <button data-action="accept">Acceptér alle</button>
          <button data-action="reject">Afvis alle</button>
          <button data-action="settings"${withSettings ? ' aria-expanded="false"' : ''}>Indstillinger</button>
        </div>
      </div>
      ${withSettings ? '<div class="cookie-message__settings" hidden>Settings panel</div>' : ''}
      <button class="cookie-message__close" aria-label="Luk">&times;</button>
    </div>
  `;
  return document.querySelector('.cookie-message')!;
}

describe('CookieMessage', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes correctly', () => {
    const el = createCookieMessage();
    const instance = new CookieMessage(el);
    expect(GtComponent.getInstance(el)).toBe(instance);
  });

  it('emits gt:cookie-accept on accept button click', () => {
    const el = createCookieMessage();
    new CookieMessage(el);

    let accepted = false;
    el.addEventListener('gt:cookie-accept', () => {
      accepted = true;
    });

    (el.querySelector('[data-action="accept"]') as HTMLElement).click();
    expect(accepted).toBe(true);
  });

  it('emits gt:cookie-reject on reject button click', () => {
    const el = createCookieMessage();
    new CookieMessage(el);

    let rejected = false;
    el.addEventListener('gt:cookie-reject', () => {
      rejected = true;
    });

    (el.querySelector('[data-action="reject"]') as HTMLElement).click();
    expect(rejected).toBe(true);
  });

  it('emits gt:cookie-accept on close button click', () => {
    const el = createCookieMessage();
    new CookieMessage(el);

    let accepted = false;
    el.addEventListener('gt:cookie-accept', () => {
      accepted = true;
    });

    (el.querySelector('.cookie-message__close') as HTMLElement).click();
    expect(accepted).toBe(true);
  });

  it('toggles settings panel visibility', () => {
    const el = createCookieMessage(true);
    new CookieMessage(el);

    const panel = el.querySelector('.cookie-message__settings') as HTMLElement;
    const btn = el.querySelector('[data-action="settings"]') as HTMLElement;

    expect(panel.hasAttribute('hidden')).toBe(true);

    btn.click();
    expect(panel.hasAttribute('hidden')).toBe(false);
    expect(btn.getAttribute('aria-expanded')).toBe('true');

    btn.click();
    expect(panel.hasAttribute('hidden')).toBe(true);
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('emits gt:cookie-settings when no settings panel exists', () => {
    const el = createCookieMessage(false);
    new CookieMessage(el);

    let settingsEmitted = false;
    el.addEventListener('gt:cookie-settings', () => {
      settingsEmitted = true;
    });

    (el.querySelector('[data-action="settings"]') as HTMLElement).click();
    expect(settingsEmitted).toBe(true);
  });

  it('destroy removes all listeners', () => {
    const el = createCookieMessage();
    const instance = new CookieMessage(el);
    instance.destroy();

    let accepted = false;
    el.addEventListener('gt:cookie-accept', () => {
      accepted = true;
    });

    (el.querySelector('[data-action="accept"]') as HTMLElement).click();
    expect(accepted).toBe(false);
  });
});
