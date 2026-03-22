import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OtpInput from './OtpInput.vue';

const BASE = 'gt-otp-input';

function mountOtp(props = {}) {
  return mount(OtpInput, { props });
}

describe('OtpInput', () => {
  it('renders 6 inputs by default', () => {
    const wrapper = mountOtp();
    expect(wrapper.findAll(`.${BASE}__field`)).toHaveLength(6);
  });

  it('renders custom length', () => {
    const wrapper = mountOtp({ length: 4 });
    expect(wrapper.findAll(`.${BASE}__field`)).toHaveLength(4);
  });

  it('all inputs have inputmode="numeric"', () => {
    const wrapper = mountOtp();
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('inputmode')).toBe('numeric');
    });
  });

  it('all inputs have maxlength="1"', () => {
    const wrapper = mountOtp();
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('maxlength')).toBe('1');
    });
  });

  it('has autocomplete="one-time-code"', () => {
    const wrapper = mountOtp();
    expect(wrapper.findAll('input')[0].attributes('autocomplete')).toBe(
      'one-time-code',
    );
  });

  it('renders modelValue across fields', () => {
    const wrapper = mountOtp({ modelValue: '1234', length: 4 });
    const inputs = wrapper.findAll('input');
    expect((inputs[0].element as unknown as { value: string }).value).toBe('1');
    expect((inputs[1].element as unknown as { value: string }).value).toBe('2');
    expect((inputs[2].element as unknown as { value: string }).value).toBe('3');
    expect((inputs[3].element as unknown as { value: string }).value).toBe('4');
  });

  it('applies filled class when digit present', () => {
    const wrapper = mountOtp({ modelValue: '12', length: 4 });
    const fields = wrapper.findAll(`.${BASE}__field`);
    expect(fields[0].classes()).toContain(`${BASE}__field--filled`);
    expect(fields[1].classes()).toContain(`${BASE}__field--filled`);
    expect(fields[2].classes()).not.toContain(`${BASE}__field--filled`);
  });

  it('applies error class', () => {
    const wrapper = mountOtp({ errorText: 'Invalid code' });
    wrapper.findAll(`.${BASE}__field`).forEach(f => {
      expect(f.classes()).toContain(`${BASE}__field--error`);
    });
  });

  it('renders label', () => {
    const wrapper = mountOtp({ label: 'Enter code' });
    expect(wrapper.find('.gt-input-label').text()).toBe('Enter code');
  });

  it('renders error text', () => {
    const wrapper = mountOtp({ errorText: 'Wrong code' });
    expect(wrapper.find('.gt-input-error').text()).toBe('Wrong code');
  });

  it('has role="group"', () => {
    const wrapper = mountOtp();
    expect(wrapper.find('[role="group"]').exists()).toBe(true);
  });

  it('disables all inputs', () => {
    const wrapper = mountOtp({ disabled: true });
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('disabled')).toBeDefined();
    });
  });
});
