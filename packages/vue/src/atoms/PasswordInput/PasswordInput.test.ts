import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PasswordInput from './PasswordInput.vue';

const BASE = 'gt-password-input';
const stubs = { GTIcon: true };

function mountPw(props = {}) {
  return mount(PasswordInput, { props, global: { stubs } });
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

  it('toggle has aria-label "Vis" by default', () => {
    const wrapper = mountPw();
    expect(wrapper.find(`.${BASE}__toggle`).attributes('aria-label')).toBe(
      'Vis',
    );
  });

  it('toggle has aria-label "Skjul" when visible', async () => {
    const wrapper = mountPw();
    await wrapper.find(`.${BASE}__toggle`).trigger('click');
    expect(wrapper.find(`.${BASE}__toggle`).attributes('aria-label')).toBe(
      'Skjul',
    );
  });

  it('custom show/hide labels in aria-label', async () => {
    const wrapper = mountPw({ showLabel: 'Show', hideLabel: 'Hide' });
    expect(wrapper.find(`.${BASE}__toggle`).attributes('aria-label')).toBe(
      'Show',
    );
    await wrapper.find(`.${BASE}__toggle`).trigger('click');
    expect(wrapper.find(`.${BASE}__toggle`).attributes('aria-label')).toBe(
      'Hide',
    );
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

  describe('focus and blur', () => {
    it('emits focus when focus enters the control', async () => {
      const wrapper = mountPw();
      await wrapper.find('input').trigger('focusin');
      expect(wrapper.emitted('focus')).toHaveLength(1);
    });

    it('emits blur when focus leaves the control entirely', async () => {
      const wrapper = mountPw();
      await wrapper.find('input').trigger('focusin');
      await wrapper
        .find('input')
        .trigger('focusout', { relatedTarget: document.body });
      expect(wrapper.emitted('blur')).toHaveLength(1);
    });

    it('stays silent when focus moves to its own show/hide toggle', async () => {
      const wrapper = mountPw();
      await wrapper.find('input').trigger('focusin');
      const toggle = wrapper.find(`.${BASE}__toggle`).element;
      await wrapper
        .find('input')
        .trigger('focusout', { relatedTarget: toggle });
      await wrapper.find(`.${BASE}__toggle`).trigger('focusin');

      // Revealing the password must not read as "the user left the field" —
      // a consumer validating on blur would otherwise flag a half-typed value.
      expect(wrapper.emitted('blur')).toBeUndefined();
      expect(wrapper.emitted('focus')).toHaveLength(1);
    });
  });
});
