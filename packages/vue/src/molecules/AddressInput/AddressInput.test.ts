import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AddressInput from './AddressInput.vue';

const BASE = 'gt-autocomplete';

describe('AddressInput', () => {
  it('renders autocomplete component', () => {
    const wrapper = mount(AddressInput);
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
  });

  it('renders input with combobox role', () => {
    const wrapper = mount(AddressInput);
    expect(wrapper.find('input').attributes('role')).toBe('combobox');
  });

  it('renders label', () => {
    const wrapper = mount(AddressInput, {
      props: { label: 'Adresse' },
    });
    expect(wrapper.find('label').text()).toContain('Adresse');
  });

  it('renders placeholder', () => {
    const wrapper = mount(AddressInput, {
      props: { placeholder: 'Søg adresse...' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'Søg adresse...',
    );
  });

  it('renders error text', () => {
    const wrapper = mount(AddressInput, {
      props: { errorText: 'Ugyldig adresse' },
    });
    expect(wrapper.find('[role="alert"]').text()).toBe('Ugyldig adresse');
  });

  it('renders help text', () => {
    const wrapper = mount(AddressInput, {
      props: { helpText: 'Begynd at skrive din adresse' },
    });
    expect(wrapper.text()).toContain('Begynd at skrive din adresse');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AddressInput);
    await wrapper.find('input').setValue('Vester');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('disabled state', () => {
    const wrapper = mount(AddressInput, {
      props: { disabled: true },
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('default placeholder text', () => {
    const wrapper = mount(AddressInput);
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'Indtast adresse...',
    );
  });
});
