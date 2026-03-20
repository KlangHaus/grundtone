import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DateInput from './DateInput.vue';

const BASE = 'gt-input';

describe('DateInput', () => {
  // Rendering
  it('renders 3 inputs', () => {
    const wrapper = mount(DateInput);
    const inputs = wrapper.findAll('input');
    expect(inputs).toHaveLength(3);
  });

  it('renders default labels (Dag, Måned, År)', () => {
    const wrapper = mount(DateInput);
    const labels = wrapper.findAll('.date-input__label');
    expect(labels).toHaveLength(3);
    expect(labels[0].text()).toBe('Dag');
    expect(labels[1].text()).toBe('Måned');
    expect(labels[2].text()).toBe('År');
  });

  // Custom labels
  it('renders custom labels', () => {
    const wrapper = mount(DateInput, {
      props: { dayLabel: 'Day', monthLabel: 'Month', yearLabel: 'Year' },
    });
    const labels = wrapper.findAll('.date-input__label');
    expect(labels[0].text()).toBe('Day');
    expect(labels[1].text()).toBe('Month');
    expect(labels[2].text()).toBe('Year');
  });

  // v-model
  it('emits update:modelValue on day input', async () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: { day: '', month: '', year: '' } },
    });
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('15');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([
      { day: '15', month: '', year: '' },
    ]);
  });

  it('emits update:modelValue on month input', async () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: { day: '15', month: '', year: '' } },
    });
    const inputs = wrapper.findAll('input');
    await inputs[1].setValue('03');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([
      { day: '15', month: '03', year: '' },
    ]);
  });

  it('emits update:modelValue on year input', async () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: { day: '15', month: '03', year: '' } },
    });
    const inputs = wrapper.findAll('input');
    await inputs[2].setValue('1990');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([
      { day: '15', month: '03', year: '1990' },
    ]);
  });

  it('renders modelValue in inputs', () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: { day: '05', month: '12', year: '2018' } },
    });
    const inputs = wrapper.findAll('input');
    expect(inputs[0].element.value).toBe('05');
    expect(inputs[1].element.value).toBe('12');
    expect(inputs[2].element.value).toBe('2018');
  });

  // Error state
  it('applies error class on all inputs when errorText is set', () => {
    const wrapper = mount(DateInput, {
      props: { errorText: 'Invalid date' },
    });
    const inputs = wrapper.findAll('input');
    inputs.forEach(input => {
      expect(input.classes()).toContain(`${BASE}--error`);
    });
  });

  it('renders error text with role="alert"', () => {
    const wrapper = mount(DateInput, {
      props: { errorText: 'Invalid date' },
    });
    const error = wrapper.find(`.${BASE}-error`);
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Invalid date');
    expect(error.attributes('role')).toBe('alert');
  });

  // Disabled
  it('sets disabled on all inputs', () => {
    const wrapper = mount(DateInput, { props: { disabled: true } });
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('disabled')).toBeDefined();
    });
  });

  // Required
  it('sets aria-required on all inputs', () => {
    const wrapper = mount(DateInput, { props: { required: true } });
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('aria-required')).toBe('true');
    });
  });

  // ARIA
  it('has role="group" on date wrapper', () => {
    const wrapper = mount(DateInput, { props: { label: 'Date' } });
    const group = wrapper.find('[role="group"]');
    expect(group.exists()).toBe(true);
  });

  it('aria-labelledby points to group label', () => {
    const wrapper = mount(DateInput, {
      props: { label: 'Birth date', id: 'bd' },
    });
    const group = wrapper.find('[role="group"]');
    expect(group.attributes('aria-labelledby')).toBe('bd-label');
    const label = wrapper.find(`#bd-label`);
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Birth date');
  });

  it('aria-describedby points to help text', () => {
    const wrapper = mount(DateInput, {
      props: { helpText: 'Enter your date', id: 'test' },
    });
    const group = wrapper.find('[role="group"]');
    expect(group.attributes('aria-describedby')).toBe('test-desc');
    const hint = wrapper.find(`.${BASE}-hint`);
    expect(hint.attributes('id')).toBe('test-desc');
  });

  it('error text replaces help text', () => {
    const wrapper = mount(DateInput, {
      props: { helpText: 'Help', errorText: 'Error' },
    });
    expect(wrapper.find(`.${BASE}-error`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}-hint`).exists()).toBe(false);
  });

  // inputmode
  it('all inputs have inputmode="numeric"', () => {
    const wrapper = mount(DateInput);
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('inputmode')).toBe('numeric');
    });
  });

  // aria-invalid
  it('aria-invalid is true on all inputs when error', () => {
    const wrapper = mount(DateInput, {
      props: { errorText: 'Error' },
    });
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('aria-invalid')).toBe('true');
    });
  });

  it('aria-invalid is false when no error', () => {
    const wrapper = mount(DateInput);
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('aria-invalid')).toBe('false');
    });
  });

  // Sizes
  it.each(['sm', 'md', 'lg'] as const)(
    'renders %s size on all inputs',
    size => {
      const wrapper = mount(DateInput, { props: { size } });
      wrapper.findAll('input').forEach(input => {
        expect(input.classes()).toContain(`${BASE}--${size}`);
      });
    },
  );

  // CSS prefix
  it('uses gt- prefix on input classes', () => {
    const wrapper = mount(DateInput);
    wrapper.findAll('input').forEach(input => {
      expect(input.classes()).toContain(BASE);
    });
  });

  // Label
  it('renders label when provided', () => {
    const wrapper = mount(DateInput, { props: { label: 'Test' } });
    const label = wrapper.find(`.${BASE}-label`);
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Test');
  });

  it('does not render label when not provided', () => {
    const wrapper = mount(DateInput);
    expect(wrapper.find(`.${BASE}-label`).exists()).toBe(false);
  });

  // Help text
  it('renders help text', () => {
    const wrapper = mount(DateInput, {
      props: { helpText: 'Example: 27 03 1990' },
    });
    const hint = wrapper.find(`.${BASE}-hint`);
    expect(hint.exists()).toBe(true);
    expect(hint.text()).toBe('Example: 27 03 1990');
  });

  // Autocomplete
  it('sets autocomplete attributes from prefix', () => {
    const wrapper = mount(DateInput, {
      props: { autocomplete: 'bday', id: 'ac' },
    });
    const inputs = wrapper.findAll('input');
    expect(inputs[0].attributes('autocomplete')).toBe('bday-day');
    expect(inputs[1].attributes('autocomplete')).toBe('bday-month');
    expect(inputs[2].attributes('autocomplete')).toBe('bday-year');
  });

  // Filters non-numeric
  it('strips non-numeric characters from input', async () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: { day: '', month: '', year: '' } },
    });
    const input = wrapper.findAll('input')[0];
    await input.setValue('1a');
    const emitted = wrapper.emitted('update:modelValue')!;
    expect(emitted[emitted.length - 1]).toEqual([
      { day: '1', month: '', year: '' },
    ]);
  });
});
