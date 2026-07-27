export type MeterVariant = 'determinate' | 'accent' | 'threshold';

/** Semantic tones map to the design-system feedback colours. */
export type MeterTone =
  'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

/** Ascending: value ≥ at → tone (high = bad, e.g. capacity).
 *  Descending: value ≤ at → tone (low = bad, e.g. a success rate). */
export type ThresholdDirection = 'asc' | 'desc';

export interface MeterThreshold {
  /** The value boundary. */
  at: number;
  /** The tone to apply once the boundary is crossed. */
  tone: MeterTone;
}

export interface MeterProps {
  /** Current value. */
  value: number;
  /** Maximum value (default 100). */
  max?: number;
  /**
   * - `determinate`: solid fill in `tone` (default primary) — a plain progress bar.
   * - `accent`: fill in the caller-provided `accent` colour — e.g. an album colour.
   * - `threshold`: fill tone chosen from `thresholds` by `value` + `direction`.
   */
  variant?: MeterVariant;
  /** Fill tone for the `determinate` variant, and the base tone before any
   *  threshold is crossed for the `threshold` variant. */
  tone?: MeterTone;
  /** Fill colour (any CSS colour / var) for the `accent` variant. */
  accent?: string;
  /** Threshold bands for the `threshold` variant. */
  thresholds?: MeterThreshold[];
  /** Which way the thresholds apply (default `asc`). */
  direction?: ThresholdDirection;
  /** Accessible label (maps to aria-label on the progressbar). */
  label?: string;
}
