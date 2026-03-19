import { describe, it, expect, beforeEach } from 'vitest';
import { Toggle } from '../toggle';
import { GtComponent } from '../base';

function createToggle(checked = false, disabled = false): HTMLElement {
  const classes = ['toggle', 'toggle--md'];
  if (checked) classes.push('toggle--checked');
  if (disabled) classes.push('toggle--disabled');

  document.body.innerHTML = `
    <button class="${classes.join(' ')}"${disabled ? ' disabled' : ''}>
      <span class="toggle__track"></span>
      <span class="toggle__thumb"></span>
    </button>
  `;
  return document.querySelector('.toggle')!;
}

describe('Toggle', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes with correct ARIA', () => {
    const el = createToggle(false);
    new Toggle(el);

    expect(el.getAttribute('role')).toBe('switch');
    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('initializes checked state', () => {
    const el = createToggle(true);
    new Toggle(el);

    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('toggles on click', () => {
    const el = createToggle(false);
    new Toggle(el);

    el.click();
    expect(el.classList.contains('toggle--checked')).toBe(true);
    expect(el.getAttribute('aria-checked')).toBe('true');

    el.click();
    expect(el.classList.contains('toggle--checked')).toBe(false);
    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('dispatches change event', () => {
    const el = createToggle(false);
    new Toggle(el);

    let changeCount = 0;
    el.addEventListener('change', () => changeCount++);

    el.click();
    expect(changeCount).toBe(1);

    el.click();
    expect(changeCount).toBe(2);
  });

  it('does not toggle when disabled', () => {
    const el = createToggle(false, true);
    new Toggle(el);

    el.click();
    expect(el.classList.contains('toggle--checked')).toBe(false);
    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('destroy removes listeners', () => {
    const el = createToggle(false);
    const instance = new Toggle(el);
    instance.destroy();

    el.click();
    expect(el.classList.contains('toggle--checked')).toBe(false);
  });

  it('getInstance works', () => {
    const el = createToggle(false);
    const instance = new Toggle(el);
    expect(GtComponent.getInstance(el)).toBe(instance);

    instance.destroy();
    expect(GtComponent.getInstance(el)).toBeNull();
  });
});
