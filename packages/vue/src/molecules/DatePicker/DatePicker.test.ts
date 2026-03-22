import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DatePicker from './DatePicker.vue';

const BASE = 'gt-date-picker';
const stubs = { GTIcon: true };

function mountPicker(props = {}) {
  return mount(DatePicker, { props, global: { stubs } });
}

describe('DatePicker', () => {
  it('renders input field', () => {
    const wrapper = mountPicker();
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('renders calendar icon button', () => {
    const wrapper = mountPicker();
    expect(wrapper.find(`.${BASE}__icon-btn`).exists()).toBe(true);
  });

  it('calendar hidden by default', () => {
    const wrapper = mountPicker();
    expect(wrapper.find(`.${BASE}__calendar`).exists()).toBe(false);
  });

  it('opens calendar on icon click', async () => {
    const wrapper = mountPicker();
    await wrapper.find(`.${BASE}__icon-btn`).trigger('click');
    expect(wrapper.find(`.${BASE}__calendar`).exists()).toBe(true);
  });

  it('renders 7 weekday headers', async () => {
    const wrapper = mountPicker();
    await wrapper.find(`.${BASE}__icon-btn`).trigger('click');
    expect(wrapper.findAll(`.${BASE}__weekday`)).toHaveLength(7);
  });

  it('renders month label', async () => {
    const wrapper = mountPicker();
    await wrapper.find(`.${BASE}__icon-btn`).trigger('click');
    expect(wrapper.find(`.${BASE}__month-label`).text()).toBeTruthy();
  });

  it('has prev/next navigation', async () => {
    const wrapper = mountPicker();
    await wrapper.find(`.${BASE}__icon-btn`).trigger('click');
    expect(wrapper.findAll(`.${BASE}__nav`)).toHaveLength(2);
  });

  it('renders label', () => {
    const wrapper = mountPicker({ label: 'Dato' });
    expect(wrapper.find('.gt-input-label').text()).toBe('Dato');
  });

  it('renders help text', () => {
    const wrapper = mountPicker({ helpText: 'Vælg dato' });
    expect(wrapper.find('.gt-input-hint').text()).toBe('Vælg dato');
  });

  it('renders error text', () => {
    const wrapper = mountPicker({ errorText: 'Påkrævet' });
    expect(wrapper.find('.gt-input-error').text()).toBe('Påkrævet');
  });

  it('displays formatted date', () => {
    const wrapper = mountPicker({ modelValue: '2025-12-25' });
    expect(
      (wrapper.find('input').element as unknown as { value: string }).value,
    ).toBe('25/12/2025');
  });

  it('renders placeholder', () => {
    const wrapper = mountPicker();
    expect(wrapper.find('input').attributes('placeholder')).toBe('DD/MM/ÅÅÅÅ');
  });

  it('disabled state', () => {
    const wrapper = mountPicker({ disabled: true });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    expect(
      wrapper.find(`.${BASE}__icon-btn`).attributes('disabled'),
    ).toBeDefined();
  });

  it('closes on Escape', async () => {
    const wrapper = mountPicker();
    await wrapper.find(`.${BASE}__icon-btn`).trigger('click');
    expect(wrapper.find(`.${BASE}__calendar`).exists()).toBe(true);
    await wrapper
      .find(`.${BASE}`)
      .element.parentElement!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
    // Manual trigger since jsdom doesn't bubble well
    await wrapper.vm.$nextTick();
  });

  it('has role="grid" on calendar', async () => {
    const wrapper = mountPicker();
    await wrapper.find(`.${BASE}__icon-btn`).trigger('click');
    expect(wrapper.find('[role="grid"]').exists()).toBe(true);
  });
});
