import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tag from './Tag.vue';

const BASE = 'tag';

// GTIcon needs registry — stub it
const stubs = { GTIcon: true };

describe('Tag', () => {
  it('renders with label', () => {
    const wrapper = mount(Tag, {
      props: { label: 'Design' },
      global: { stubs },
    });
    expect(wrapper.find(`.${BASE}__label`).text()).toBe('Design');
  });

  it('has correct base class', () => {
    const wrapper = mount(Tag, { props: { label: 'Tag' }, global: { stubs } });
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
  });

  // Sizes
  it.each(['sm', 'md'] as const)('renders %s size', size => {
    const wrapper = mount(Tag, {
      props: { label: 'Tag', size },
      global: { stubs },
    });
    expect(wrapper.find(`.${BASE}`).classes()).toContain(`${BASE}--${size}`);
  });

  // Click
  it('emits click with value', async () => {
    const wrapper = mount(Tag, {
      props: { label: 'Vue', value: 'vue' },
      global: { stubs },
    });
    await wrapper.find(`.${BASE}`).trigger('click');
    expect(wrapper.emitted('click')![0]).toEqual(['vue']);
  });

  it('emits update:selected on click', async () => {
    const wrapper = mount(Tag, {
      props: { label: 'Vue', selected: false },
      global: { stubs },
    });
    await wrapper.find(`.${BASE}`).trigger('click');
    expect(wrapper.emitted('update:selected')![0]).toEqual([true]);
  });

  // Dismissible
  it('shows dismiss button when dismissible', () => {
    const wrapper = mount(Tag, {
      props: { label: 'Filter', dismissible: true },
      global: { stubs },
    });
    expect(wrapper.find(`.${BASE}__dismiss`).exists()).toBe(true);
  });

  it('does not show dismiss button by default', () => {
    const wrapper = mount(Tag, { props: { label: 'Tag' }, global: { stubs } });
    expect(wrapper.find(`.${BASE}__dismiss`).exists()).toBe(false);
  });

  it('emits dismiss on × click', async () => {
    const wrapper = mount(Tag, {
      props: { label: 'Vue', value: 'vue', dismissible: true },
      global: { stubs },
    });
    await wrapper.find(`.${BASE}__dismiss`).trigger('click');
    expect(wrapper.emitted('dismiss')![0]).toEqual(['vue']);
  });

  it('dismiss does not bubble to click', async () => {
    const wrapper = mount(Tag, {
      props: { label: 'Vue', dismissible: true },
      global: { stubs },
    });
    await wrapper.find(`.${BASE}__dismiss`).trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  // Selected
  it('applies selected class', () => {
    const wrapper = mount(Tag, {
      props: { label: 'Active', selected: true },
      global: { stubs },
    });
    expect(wrapper.find(`.${BASE}`).classes()).toContain(`${BASE}--selected`);
  });

  it('has aria-selected when selected prop given', () => {
    const wrapper = mount(Tag, {
      props: { label: 'Tag', selected: true },
      global: { stubs },
    });
    expect(wrapper.find(`.${BASE}`).attributes('aria-selected')).toBe('true');
  });

  // Disabled
  it('applies disabled class', () => {
    const wrapper = mount(Tag, {
      props: { label: 'Tag', disabled: true },
      global: { stubs },
    });
    expect(wrapper.find(`.${BASE}`).classes()).toContain(`${BASE}--disabled`);
  });

  it('does not emit when disabled', async () => {
    const wrapper = mount(Tag, {
      props: { label: 'Tag', disabled: true },
      global: { stubs },
    });
    await wrapper.find(`.${BASE}`).trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  // Keyboard
  it('emits click on Enter key', async () => {
    const wrapper = mount(Tag, {
      props: { label: 'Tag', value: 'x' },
      global: { stubs },
    });
    await wrapper.find(`.${BASE}`).trigger('keydown.enter');
    expect(wrapper.emitted('click')![0]).toEqual(['x']);
  });
});
