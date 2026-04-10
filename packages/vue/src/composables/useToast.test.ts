import { describe, it, expect, beforeEach } from 'vitest';
import { useToast, toastState } from './useToast';

describe('useToast', () => {
  beforeEach(() => {
    // Clear all toasts before each test
    toastState.toasts.splice(0);
  });

  it('adds a default toast', () => {
    const toast = useToast();
    toast('Hello');
    expect(toastState.toasts).toHaveLength(1);
    expect(toastState.toasts[0].message).toBe('Hello');
    expect(toastState.toasts[0].variant).toBe('default');
  });

  it('adds a success toast', () => {
    const toast = useToast();
    toast.success('Saved!');
    expect(toastState.toasts[0].variant).toBe('success');
    expect(toastState.toasts[0].message).toBe('Saved!');
  });

  it('adds a warning toast', () => {
    const toast = useToast();
    toast.warning('Watch out');
    expect(toastState.toasts[0].variant).toBe('warning');
  });

  it('adds an error toast', () => {
    const toast = useToast();
    toast.error('Failed');
    expect(toastState.toasts[0].variant).toBe('error');
  });

  it('adds an info toast', () => {
    const toast = useToast();
    toast.info('FYI');
    expect(toastState.toasts[0].variant).toBe('info');
  });

  it('returns toast id', () => {
    const toast = useToast();
    const id = toast('Test');
    expect(typeof id).toBe('string');
    expect(id).toContain('toast');
  });

  it('sets default duration to 5000ms', () => {
    const toast = useToast();
    toast('Test');
    expect(toastState.toasts[0].duration).toBe(5000);
  });

  it('allows custom duration', () => {
    const toast = useToast();
    toast('Test', { duration: 0 });
    expect(toastState.toasts[0].duration).toBe(0);
  });

  it('defaults to dismissible', () => {
    const toast = useToast();
    toast('Test');
    expect(toastState.toasts[0].dismissible).toBe(true);
  });

  it('allows non-dismissible', () => {
    const toast = useToast();
    toast('Test', { dismissible: false });
    expect(toastState.toasts[0].dismissible).toBe(false);
  });

  it('passes description and icon', () => {
    const toast = useToast();
    toast('Title', { description: 'Details', icon: 'check-circle' });
    expect(toastState.toasts[0].description).toBe('Details');
    expect(toastState.toasts[0].icon).toBe('check-circle');
  });

  it('newest toast is first', () => {
    const toast = useToast();
    toast('First');
    toast('Second');
    expect(toastState.toasts[0].message).toBe('Second');
    expect(toastState.toasts[1].message).toBe('First');
  });

  it('dismiss removes a specific toast', () => {
    const toast = useToast();
    const id1 = toast('One');
    toast('Two');
    expect(toastState.toasts).toHaveLength(2);

    toast.dismiss(id1);
    expect(toastState.toasts).toHaveLength(1);
    expect(toastState.toasts[0].message).toBe('Two');
  });

  it('dismiss with invalid id does nothing', () => {
    const toast = useToast();
    toast('One');
    toast.dismiss('non-existent');
    expect(toastState.toasts).toHaveLength(1);
  });

  it('dismissAll removes all toasts', () => {
    const toast = useToast();
    toast('One');
    toast('Two');
    toast('Three');
    expect(toastState.toasts).toHaveLength(3);

    toast.dismissAll();
    expect(toastState.toasts).toHaveLength(0);
  });

  it('multiple useToast instances share state', () => {
    const toast1 = useToast();
    const toast2 = useToast();

    toast1('From 1');
    toast2('From 2');
    expect(toastState.toasts).toHaveLength(2);

    toast1.dismissAll();
    expect(toastState.toasts).toHaveLength(0);
  });
});
