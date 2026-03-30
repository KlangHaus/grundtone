import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';

const BASE = 'gt-tooltip';

function mountTooltip(props = {}) {
  return mount(Tooltip, {
    props: { content: 'Help text', ...props },
    slots: { default: '<span>Trigger</span>' },
  });
}

describe('Tooltip', () => {
  // Click trigger (default)
  it('renders help icon for click trigger', () => {
    const wrapper = mountTooltip();
    expect(wrapper.find(`.${BASE}-trigger__icon`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}-trigger__icon`).text()).toBe('?');
  });

  it('tooltip hidden by default', () => {
    const wrapper = mountTooltip();
    expect(wrapper.find(`.${BASE}`).exists()).toBe(false);
  });

  it('shows tooltip on icon click', async () => {
    const wrapper = mountTooltip();
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}`).text()).toContain('Help text');
  });

  it('hides tooltip on second click', async () => {
    const wrapper = mountTooltip();
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    expect(wrapper.find(`.${BASE}`).exists()).toBe(false);
  });

  it('closes on Escape', async () => {
    const wrapper = mountTooltip();
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    await wrapper
      .find(`.${BASE}-trigger`)
      .trigger('keydown', { key: 'Escape' });
    expect(wrapper.find(`.${BASE}`).exists()).toBe(false);
  });

  // Hover trigger
  it('does not render help icon for hover trigger', () => {
    const wrapper = mountTooltip({ trigger: 'hover' });
    expect(wrapper.find(`.${BASE}-trigger__icon`).exists()).toBe(false);
  });

  // Position — jsdom has no layout, so auto-flip always goes to bottom
  it('auto-flips to bottom in jsdom (no space above)', async () => {
    const wrapper = mountTooltip({ position: 'top' });
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    // In jsdom getBoundingClientRect returns 0, so spaceAbove < 80 → flips to bottom
    expect(wrapper.find(`.${BASE}--bottom`).exists()).toBe(true);
  });

  it('applies bottom position when specified', async () => {
    const wrapper = mountTooltip({ position: 'bottom' });
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    expect(wrapper.find(`.${BASE}--bottom`).exists()).toBe(true);
  });

  // ARIA
  it('has role="tooltip"', async () => {
    const wrapper = mountTooltip();
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    expect(wrapper.find(`.${BASE}`).attributes('role')).toBe('tooltip');
  });

  it('icon has aria-expanded', () => {
    const wrapper = mountTooltip();
    expect(
      wrapper.find(`.${BASE}-trigger__icon`).attributes('aria-expanded'),
    ).toBe('false');
  });

  // Slot content
  it('renders slot content', () => {
    const wrapper = mountTooltip();
    expect(wrapper.text()).toContain('Trigger');
  });

  // Visible class
  it('applies visible class', async () => {
    const wrapper = mountTooltip();
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    expect(wrapper.find(`.${BASE}--visible`).exists()).toBe(true);
  });

  // Arrow
  it('renders arrow', async () => {
    const wrapper = mountTooltip();
    await wrapper.find(`.${BASE}-trigger__icon`).trigger('click');
    expect(wrapper.find(`.${BASE}__arrow`).exists()).toBe(true);
  });
});
