import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Toast from './Toast.vue';

const stubs = { GTIcon: true };

function mountToast(props = {}) {
  return mount(Toast, {
    props: { message: 'Test message', ...props },
    global: { stubs },
  });
}

describe('Toast', () => {
  it('renders message', () => {
    const wrapper = mountToast();
    expect(wrapper.find('.gt-toast__message').text()).toBe('Test message');
  });

  it('has gt-toast class', () => {
    const wrapper = mountToast();
    expect(wrapper.find('.gt-toast').exists()).toBe(true);
  });

  // Variants
  it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
    'renders %s variant',
    variant => {
      const wrapper = mountToast({ variant });
      expect(wrapper.find('.gt-toast').classes()).toContain(
        `gt-toast--${variant}`,
      );
    },
  );

  // Description
  it('renders description when provided', () => {
    const wrapper = mountToast({ description: 'Details here' });
    expect(wrapper.find('.gt-toast__description').text()).toBe('Details here');
  });

  it('does not render description when not provided', () => {
    const wrapper = mountToast();
    expect(wrapper.find('.gt-toast__description').exists()).toBe(false);
  });

  // Dismissible
  it('shows close button when dismissible', () => {
    const wrapper = mountToast({ dismissible: true });
    expect(wrapper.find('.gt-toast__close').exists()).toBe(true);
  });

  it('hides close button when not dismissible', () => {
    const wrapper = mountToast({ dismissible: false });
    expect(wrapper.find('.gt-toast__close').exists()).toBe(false);
  });

  it('emits dismiss on close click', async () => {
    const wrapper = mountToast();
    await wrapper.find('.gt-toast__close').trigger('click');
    expect(wrapper.emitted('dismiss')).toBeTruthy();
  });

  // Countdown bar
  it('shows countdown when duration > 0', () => {
    const wrapper = mountToast({ duration: 5000 });
    const countdown = wrapper.find('.gt-toast__countdown');
    expect(countdown.exists()).toBe(true);
    expect(countdown.attributes('style')).toContain('5000ms');
  });

  it('hides countdown when duration is 0', () => {
    const wrapper = mountToast({ duration: 0 });
    expect(wrapper.find('.gt-toast__countdown').exists()).toBe(false);
  });

  // ARIA
  it('has role="status" and aria-live="polite" for success', () => {
    const wrapper = mountToast({ variant: 'success' });
    const toast = wrapper.find('.gt-toast');
    expect(toast.attributes('role')).toBe('status');
    expect(toast.attributes('aria-live')).toBe('polite');
  });

  it('has role="alert" and aria-live="assertive" for error', () => {
    const wrapper = mountToast({ variant: 'error' });
    const toast = wrapper.find('.gt-toast');
    expect(toast.attributes('role')).toBe('alert');
    expect(toast.attributes('aria-live')).toBe('assertive');
  });

  it('has aria-atomic="true"', () => {
    const wrapper = mountToast();
    expect(wrapper.find('.gt-toast').attributes('aria-atomic')).toBe('true');
  });

  // Rich colors
  it('applies rich class', () => {
    const wrapper = mountToast({ rich: true, variant: 'success' });
    expect(wrapper.find('.gt-toast').classes()).toContain('gt-toast--rich');
  });

  // Index
  it('sets data-index attribute', () => {
    const wrapper = mountToast({ index: 2 });
    expect(wrapper.find('.gt-toast').attributes('data-index')).toBe('2');
  });

  // Icon presence (GTIcon requires registry — tested via demo)
  it('does not render icon when not provided', () => {
    const wrapper = mountToast();
    // No icon prop = no icon element in DOM
    expect(wrapper.html()).not.toContain('gt-toast__icon');
  });
});
