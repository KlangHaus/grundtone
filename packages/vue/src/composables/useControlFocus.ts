import { ref } from 'vue';

/** Emit signature shared by controls that forward focus and blur. */
export type ControlFocusEmit = ((e: 'focus', event: FocusEvent) => void) &
  ((e: 'blur', event: FocusEvent) => void);

/**
 * Focus tracking for a control built from more than one focusable element —
 * a password field and its show/hide toggle, a date field split in three, an
 * OTP field of N boxes.
 *
 * `focus` and `blur` do not bubble, so a listener on the wrapper never hears
 * them; `focusin` and `focusout` do. Moving between the control's own parts
 * stays silent, so a consumer validating on blur is not interrupted when the
 * user reveals the password or tabs from day to month.
 */
export function useControlFocus(emit: ControlFocusEmit) {
  const hasFocus = ref(false);

  function onFocusin(event: FocusEvent) {
    if (hasFocus.value) return;
    hasFocus.value = true;
    emit('focus', event);
  }

  function onFocusout(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    const root = event.currentTarget as HTMLElement | null;
    if (next && root?.contains(next)) return;
    hasFocus.value = false;
    emit('blur', event);
  }

  return { hasFocus, onFocusin, onFocusout };
}
