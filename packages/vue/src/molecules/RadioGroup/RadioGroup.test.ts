import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RadioGroup from './RadioGroup.vue';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

function mountRadio(props = {}) {
  return mount(RadioGroup, { props: { options, ...props } });
}

describe('RadioGroup', () => {
  it('renders all options', () => {
    const wrapper = mountRadio();
    expect(wrapper.findAll('.gt-choice--radio')).toHaveLength(3);
  });

  it('renders labels', () => {
    const wrapper = mountRadio();
    const labels = wrapper.findAll('.gt-choice__label');
    expect(labels[0].text()).toBe('Option A');
    expect(labels[1].text()).toBe('Option B');
  });

  it('renders as radio inputs', () => {
    const wrapper = mountRadio();
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('type')).toBe('radio');
    });
  });

  it('emits update:modelValue on selection', async () => {
    const wrapper = mountRadio();
    await wrapper.findAll('input')[1].trigger('change');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['b']);
  });

  it('marks selected option as checked', () => {
    const wrapper = mountRadio({ modelValue: 'b' });
    const choices = wrapper.findAll('.gt-choice--radio');
    expect(choices[1].classes()).toContain('gt-choice--checked');
    expect(choices[0].classes()).not.toContain('gt-choice--checked');
  });

  it('renders group label as legend', () => {
    const wrapper = mountRadio({ label: 'Pick one' });
    expect(wrapper.find('.gt-choice-group__legend').text()).toBe('Pick one');
  });

  it('renders help text', () => {
    const wrapper = mountRadio({ helpText: 'Choose wisely' });
    expect(wrapper.find('.gt-choice-group__hint').text()).toBe('Choose wisely');
  });

  it('renders error text', () => {
    const wrapper = mountRadio({ errorText: 'Required' });
    const error = wrapper.find('.gt-choice-group__error');
    expect(error.text()).toBe('Required');
    expect(error.attributes('role')).toBe('alert');
  });

  it('error replaces help text', () => {
    const wrapper = mountRadio({ helpText: 'Help', errorText: 'Error' });
    expect(wrapper.find('.gt-choice-group__error').exists()).toBe(true);
    expect(wrapper.find('.gt-choice-group__hint').exists()).toBe(false);
  });

  it('applies error class to options', () => {
    const wrapper = mountRadio({ errorText: 'Error' });
    wrapper.findAll('.gt-choice--radio').forEach(choice => {
      expect(choice.classes()).toContain('gt-choice--error');
    });
  });

  it('disables all options when group disabled', () => {
    const wrapper = mountRadio({ disabled: true });
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('disabled')).toBeDefined();
    });
  });

  it('disables individual option', () => {
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    const wrapper = mount(RadioGroup, { props: { options: opts } });
    expect(wrapper.findAll('input')[1].attributes('disabled')).toBeDefined();
  });

  it('renders option hints', () => {
    const opts = [{ value: 'a', label: 'A', hint: 'Hint text' }];
    const wrapper = mount(RadioGroup, { props: { options: opts } });
    expect(wrapper.find('.gt-choice__hint').text()).toBe('Hint text');
  });

  it('has role="radiogroup"', () => {
    const wrapper = mountRadio();
    expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true);
  });

  it('shares name across all inputs', () => {
    const wrapper = mountRadio({ name: 'my-radio' });
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('name')).toBe('my-radio');
    });
  });
});
