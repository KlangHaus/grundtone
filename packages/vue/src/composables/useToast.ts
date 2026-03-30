import { reactive } from 'vue';
import { generateId } from '@grundtone/utils';
import type {
  ToastItem,
  ToastVariant,
  ToastOptions,
} from '../molecules/Toast/types';

/** Shared reactive state for all toast instances */
export const toastState = reactive<{ toasts: ToastItem[] }>({
  toasts: [],
});

function addToast(
  variant: ToastVariant,
  message: string,
  options?: ToastOptions,
): string {
  const id = generateId('toast');
  const item: ToastItem = {
    id,
    variant,
    message,
    description: options?.description,
    icon: options?.icon,
    duration: options?.duration ?? 5000,
    dismissible: options?.dismissible ?? true,
  };

  // Newest first
  toastState.toasts.unshift(item);
  return id;
}

function dismiss(id: string): void {
  const idx = toastState.toasts.findIndex(t => t.id === id);
  if (idx >= 0) toastState.toasts.splice(idx, 1);
}

function dismissAll(): void {
  toastState.toasts.splice(0);
}

export interface UseToastReturn {
  (message: string, options?: ToastOptions): string;
  success: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

/**
 * Composable for showing toast notifications imperatively.
 *
 * @example
 * const toast = useToast();
 * toast.success('Gemt!');
 * toast.error('Fejl', { icon: 'alert-circle', duration: 0 });
 */
export function useToast(): UseToastReturn {
  const fn = ((message: string, options?: ToastOptions) =>
    addToast('default', message, options)) as UseToastReturn;

  fn.success = (msg, opts) => addToast('success', msg, opts);
  fn.warning = (msg, opts) => addToast('warning', msg, opts);
  fn.error = (msg, opts) => addToast('error', msg, opts);
  fn.info = (msg, opts) => addToast('info', msg, opts);
  fn.dismiss = dismiss;
  fn.dismissAll = dismissAll;

  return fn;
}
