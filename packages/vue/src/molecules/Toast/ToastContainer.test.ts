import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import ToastContainer from './ToastContainer.vue';
import { toastState, useToast } from '../../composables/useToast';

const stubs = { GTIcon: true };

let wrapper: VueWrapper | null = null;

function mountContainer(props = {}) {
  wrapper = mount(ToastContainer, {
    props,
    attachTo: document.body,
    global: { stubs },
  });
  return wrapper;
}

describe('ToastContainer', () => {
  beforeEach(() => {
    toastState.toasts.splice(0);
  });

  afterEach(() => {
    // Clear state BEFORE unmounting so reactive updates don't hit detached DOM
    toastState.toasts.splice(0);
    wrapper?.unmount();
    wrapper = null;
  });

  it('renders nothing when no toasts', () => {
    mountContainer();
    expect(document.body.querySelector('.gt-toast-container')).toBeNull();
  });

  it('renders container when toasts exist', async () => {
    const toast = useToast();
    toast('Hello');
    mountContainer();
    await wrapper!.vm.$nextTick();
    expect(document.body.querySelector('.gt-toast-container')).not.toBeNull();
  });

  it.each([
    'bottom-center',
    'bottom-right',
    'bottom-left',
    'top-center',
    'top-right',
    'top-left',
  ] as const)('applies %s position class', async position => {
    const toast = useToast();
    toast('Hello');
    mountContainer({ position });
    await wrapper!.vm.$nextTick();
    const container = document.body.querySelector('.gt-toast-container');
    expect(container?.className).toContain(`gt-toast-container--${position}`);
  });

  it('limits visible toasts to visibleToasts count', async () => {
    const toast = useToast();
    toast('One');
    toast('Two');
    toast('Three');
    toast('Four');
    toast('Five');
    mountContainer({ visibleToasts: 3 });
    await wrapper!.vm.$nextTick();
    expect(document.body.querySelectorAll('.gt-toast')).toHaveLength(3);
  });

  it('shows all toasts when expand=true', async () => {
    const toast = useToast();
    toast('One');
    toast('Two');
    toast('Three');
    toast('Four');
    mountContainer({ expand: true, visibleToasts: 2 });
    await wrapper!.vm.$nextTick();
    expect(document.body.querySelectorAll('.gt-toast')).toHaveLength(4);
  });

  it('applies expanded class when expand=true', async () => {
    const toast = useToast();
    toast('Hello');
    mountContainer({ expand: true });
    await wrapper!.vm.$nextTick();
    const container = document.body.querySelector('.gt-toast-container');
    expect(container?.className).toContain('gt-toast-container--expanded');
  });

  it('expands on hover', async () => {
    const toast = useToast();
    toast('One');
    toast('Two');
    toast('Three');
    toast('Four');
    mountContainer({ visibleToasts: 2 });
    await wrapper!.vm.$nextTick();

    expect(document.body.querySelectorAll('.gt-toast')).toHaveLength(2);

    const container = document.body.querySelector(
      '.gt-toast-container',
    ) as HTMLElement;
    container.dispatchEvent(new MouseEvent('mouseenter'));
    await wrapper!.vm.$nextTick();

    expect(document.body.querySelectorAll('.gt-toast')).toHaveLength(4);
    expect(container.className).toContain('gt-toast-container--expanded');

    container.dispatchEvent(new MouseEvent('mouseleave'));
    await wrapper!.vm.$nextTick();
    expect(document.body.querySelectorAll('.gt-toast')).toHaveLength(2);
  });

  it('removes toast from state when dismiss is emitted', async () => {
    const toast = useToast();
    toast('One');
    toast('Two');
    mountContainer();
    await wrapper!.vm.$nextTick();

    expect(toastState.toasts).toHaveLength(2);

    const closeBtn = document.body.querySelector(
      '.gt-toast__close',
    ) as HTMLElement;
    closeBtn.click();
    await wrapper!.vm.$nextTick();

    expect(toastState.toasts).toHaveLength(1);
  });

  it('passes richColors to toasts', async () => {
    const toast = useToast();
    toast.success('Saved');
    mountContainer({ richColors: true });
    await wrapper!.vm.$nextTick();
    const t = document.body.querySelector('.gt-toast');
    expect(t?.className).toContain('gt-toast--rich');
  });

  it('uses default position bottom-center', async () => {
    const toast = useToast();
    toast('Hello');
    mountContainer();
    await wrapper!.vm.$nextTick();
    const container = document.body.querySelector('.gt-toast-container');
    expect(container?.className).toContain('gt-toast-container--bottom-center');
  });

  it('sets data-index on each toast', async () => {
    const toast = useToast();
    toast('One');
    toast('Two');
    mountContainer();
    await wrapper!.vm.$nextTick();
    const toasts = document.body.querySelectorAll('.gt-toast');
    expect(toasts[0].getAttribute('data-index')).toBe('0');
    expect(toasts[1].getAttribute('data-index')).toBe('1');
  });
});
