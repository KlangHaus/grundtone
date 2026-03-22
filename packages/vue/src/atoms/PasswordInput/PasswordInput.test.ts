import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PasswordInput from './PasswordInput.vue';

const BASE = 'gt-password-input';

function mountPw(props = {}) {
  return mount(PasswordInput, { props });
}

describe('PasswordInput', () => {
  it('renders password input', () => {
    const wrapper = mountPw();
    expect(wrapper.find('input').attributes('type')).toBe('password');
  });

  it('toggles to text on show click', async () => {
    const wrapper = mountPw();
    await wrapper.find(`.${BASE}__toggle`).trigger('click');
    expect(wrapper.find('input').attributes('type')).toBe('text');
  });

  it('toggles back to password on second click', async () => {
    const wrapper = mountPw();
    await wrapper.find(`.${BASE}__toggle`).trigger('click');
    await wrapper.find(`.${BASE}__toggle`).trigger('click');
    expect(wrapper.find('input').attributes('type')).toBe('password');
  });

  it('toggle button shows "Vis" by default', () => {
    const wrapper = mountPw();
    expect(wrapper.find(`.${BASE}__toggle`).text()).toBe('Vis');
  });

  it('toggle button shows "Skjul" when visible', async () => {
    const wrapper = mountPw();
    await wrapper.find(`.${BASE}__toggle`).trigger('click');
    expect(wrapper.find(`.${BASE}__toggle`).text()).toBe('Skjul');
  });

  it('custom show/hide labels', async () => {
    const wrapper = mountPw({ showLabel: 'Show', hideLabel: 'Hide' });
    expect(wrapper.find(`.${BASE}__toggle`).text()).toBe('Show');
    await wrapper.find(`.${BASE}__toggle`).trigger('click');
    expect(wrapper.find(`.${BASE}__toggle`).text()).toBe('Hide');
  });

  it('emits update:modelValue', async () => {
    const wrapper = mountPw({ modelValue: '' });
    await wrapper.find('input').setValue('secret');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['secret']);
  });

  it('has spellcheck=false', () => {
    const wrapper = mountPw();
    expect(wrapper.find('input').attributes('spellcheck')).toBe('false');
  });

  it('has autocapitalize=off', () => {
    const wrapper = mountPw();
    expect(wrapper.find('input').attributes('autocapitalize')).toBe('off');
  });

  it('sets autocomplete', () => {
    const wrapper = mountPw({ autocomplete: 'new-password' });
    expect(wrapper.find('input').attributes('autocomplete')).toBe(
      'new-password',
    );
  });

  it('renders label', () => {
    const wrapper = mountPw({ label: 'Password' });
    expect(wrapper.find('.gt-input-label').text()).toBe('Password');
  });

  it('renders error', () => {
    const wrapper = mountPw({ errorText: 'Required' });
    expect(wrapper.find('.gt-input-error').text()).toBe('Required');
    expect(wrapper.find('input').classes()).toContain('gt-input--error');
  });
});
