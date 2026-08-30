/**
 * State of the bulk operation the bar is reporting on.
 *
 * The consumer owns the async call and sets this; the bar only renders it.
 */
export type BulkActionState = 'idle' | 'sending' | 'receipt' | 'error';

export interface BulkActionBarProps {
  /**
   * Number of selected rows. Drives visibility together with {@link message}.
   *
   * 🔴 The bar is NOT visible on `count > 0` alone — see {@link message}.
   */
  count: number;

  /**
   * The label shown on the left, already formatted by the consumer
   * ("5 riffs selected").
   *
   * A design system that knows the word "riff" has taken a leak from one
   * consumer's domain, and plural rules are cheaper to solve where the domain
   * lives. The string is rendered VERBATIM — never truncated or transformed.
   */
  label: string;

  /**
   * Current state of the operation. `sending` disables the actions and keeps
   * the selection; `error` keeps it too, so a partial failure can be retried
   * on exactly the rows that were missed.
   */
  state?: BulkActionState;

  /**
   * Result text for `state: 'receipt'` — a NUMBER, not a checkmark
   * ("120 of 172 moved"). A count is the difference between noticing a partial
   * failure and not.
   *
   * 🔴 THIS DRIVES VISIBILITY TOGETHER WITH {@link count}. The bar stays up
   * while a receipt is unacknowledged, even at `count === 0`. On full success
   * the consumer clears the selection — if visibility hung on the count alone,
   * the result would vanish the instant it was set, and a successful action
   * would be indistinguishable from no action at all.
   *
   * Omit it and NO receipt is shown. The bar never invents an "OK": a
   * component that can report success without data will eventually do so.
   */
  message?: string;

  /**
   * Identity of the current selection — bump it whenever the selected rows
   * change, whatever their number.
   *
   * 🔴 A count cannot express identity. Swap three selected rows for three
   * others and the count never changes value, so the bar cannot tell a fresh
   * selection from the one its receipt describes — and a stale
   * "3 of 3 moved" sits beside it, reading as if it did. Any join of the ids
   * works; the bar only checks whether it changed.
   *
   * Omit it and the receipt is discarded on a change of COUNT alone, which is
   * correct until a selection can change without changing size.
   */
  selectionKey?: string | number;

  /** Label for the clear control. */
  clearLabel?: string;

  /** Accessible label for the bar itself. */
  ariaLabel?: string;
}
