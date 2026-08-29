import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BulkActionBar from './BulkActionBar.vue';

// 🔴 These tests are written from the TRAP LIST agreed with the first consumer,
// not from the implementation. A test written from the code can only confirm
// the code — every trap below is a mistake someone already made in a real bar.

const BASE = 'gt-bulk-action-bar';

function mountBar(props: Record<string, unknown> = {}) {
  return mount(BulkActionBar, {
    props: { count: 3, label: '3 selected', ...props },
  });
}

const bar = (w: ReturnType<typeof mountBar>) => w.find(`.${BASE}`);
const receipt = (w: ReturnType<typeof mountBar>) => w.find(`.${BASE}__receipt`);

describe('GTBulkActionBar — visibility', () => {
  it('is hidden with nothing selected and no receipt', () => {
    expect(bar(mountBar({ count: 0 })).exists()).toBe(false);
  });

  it('is visible with a selection', () => {
    expect(bar(mountBar()).exists()).toBe(true);
  });

  // 🔴 TRAP 1. On full success the consumer clears the selection. If visibility
  // hung on the count alone, the result would vanish the instant it was set —
  // a successful action would be indistinguishable from no action.
  //
  // The gap is invisible to the ordinary test: partial success and error both
  // KEEP a selection, so the receipt shows fine there. Only the full-success
  // path exposes it, which is why this asserts AFTER the count drops to zero.
  it('stays visible with a receipt after the selection is cleared', async () => {
    const w = mountBar();
    await w.setProps({ state: 'receipt', message: '120 of 172 moved' });
    await w.setProps({ count: 0 });

    expect(bar(w).exists()).toBe(true);
    expect(receipt(w).text()).toBe('120 of 172 moved');
  });

  it('hides once the receipt is dismissed', async () => {
    const w = mountBar();
    await w.setProps({ state: 'receipt', message: 'done' });
    await w.setProps({ count: 0 });
    await w.find(`.${BASE}__clear`).trigger('click');

    expect(bar(w).exists()).toBe(false);
  });
});

describe('GTBulkActionBar — the receipt', () => {
  // A component that can report success without data will eventually do so.
  it('shows no receipt when the consumer sends no message', async () => {
    const w = mountBar();
    await w.setProps({ state: 'receipt' });
    expect(receipt(w).exists()).toBe(false);
  });

  it('renders the consumer message verbatim', async () => {
    const w = mountBar();
    await w.setProps({ state: 'receipt', message: '120 of 172 moved' });
    expect(receipt(w).text()).toBe('120 of 172 moved');
  });

  // 🔴 TRAP 3. A stale result beside a fresh selection reads as describing it.
  it('discards an unacknowledged receipt when a new selection starts', async () => {
    const w = mountBar();
    await w.setProps({ state: 'receipt', message: '120 of 172 moved' });
    await w.setProps({ count: 0 });
    expect(receipt(w).exists()).toBe(true);

    await w.setProps({ count: 5, label: '5 selected', state: 'idle' });

    expect(receipt(w).exists()).toBe(false);
    expect(bar(w).exists()).toBe(true);
  });
});

describe('GTBulkActionBar — who owns the selection', () => {
  // 🔴 TRAP 4. The consumer clears conditionally on the outcome so a partial
  // success stays retryable on exactly the missed rows. A bar that cleared for
  // them would overwrite that logic.
  it('emits clear instead of changing anything itself', async () => {
    const w = mountBar();
    await w.find(`.${BASE}__clear`).trigger('click');

    expect(w.emitted('clear')).toHaveLength(1);
    expect(w.props('count')).toBe(3);
  });

  it('keeps the selection while sending, and disables clearing', async () => {
    const w = mountBar({ state: 'sending' });
    expect(bar(w).exists()).toBe(true);
    expect(w.find(`.${BASE}__clear`).attributes('disabled')).toBeDefined();
  });

  it('keeps the selection on error so it can be retried', async () => {
    const w = mountBar({ state: 'error' });
    expect(bar(w).exists()).toBe(true);
    expect(w.props('count')).toBe(3);
  });
});

describe('GTBulkActionBar — reserved space', () => {
  // The test DOM reports every element as 0px high, so a real measurement is
  // invisible here. Stubbing the height makes the behaviour observable rather
  // than weakening the assertion to `toBeDefined()` — an assertion that cannot
  // tell "reserved 56px" from "reserved nothing" would pass against a
  // component that never reserved anything at all.
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get: () => 56,
    });
    document.body.style.removeProperty('--gt-bulk-action-bar-space');
  });

  afterEach(() => {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>)
      .offsetHeight;
  });

  // 🔴 TRAP 2. The bar lies over the page, so the last row becomes unreachable.
  // Telling consumers they MUST add padding is a workaround the fourth one
  // forgets — the component reserves the space itself.
  const reserved = () =>
    document.body.style.getPropertyValue('--gt-bulk-action-bar-space');

  it('reserves nothing while hidden', () => {
    mountBar({ count: 0 });
    expect(reserved()).toBe('0px');
  });

  it('reserves space while visible', async () => {
    const w = mountBar();
    await w.vm.$nextTick();
    await Promise.resolve();
    expect(reserved()).toBe('56px');
  });

  // 🔴 The space must survive the selection going away, for the same reason the
  // bar does: while a receipt is showing, the bar is still on screen.
  it('keeps the space reserved while only a receipt is showing', async () => {
    const w = mountBar();
    await w.setProps({ state: 'receipt', message: 'done' });
    await w.setProps({ count: 0 });
    await w.vm.$nextTick();
    await Promise.resolve();

    expect(bar(w).exists()).toBe(true);
    expect(reserved()).toBe('56px');
  });

  it('releases the space when the bar goes away', async () => {
    const w = mountBar();
    await w.setProps({ count: 0 });
    await w.vm.$nextTick();
    expect(reserved()).toBe('0px');
  });

  it('releases the space on unmount', async () => {
    const w = mountBar();
    await w.vm.$nextTick();
    w.unmount();
    expect(reserved()).toBe('0px');
  });
});

describe('GTBulkActionBar — slot and labels', () => {
  it('renders consumer actions in the slot', () => {
    const w = mount(BulkActionBar, {
      props: { count: 2, label: '2 selected' },
      slots: { default: '<button class="mine">Move</button>' },
    });
    expect(w.find(`.${BASE}__actions .mine`).exists()).toBe(true);
  });

  it('renders the label verbatim, without formatting a count itself', () => {
    const w = mountBar({ count: 172, label: '172 riffs markeret' });
    expect(w.find(`.${BASE}__count`).text()).toBe('172 riffs markeret');
  });
});
