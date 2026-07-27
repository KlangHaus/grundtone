export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  /** Controls visibility (v-model:open) */
  open: boolean;
  /** Edge the panel slides in from. `left` = nav (default), `right` = detail panel. */
  side?: DrawerSide;
  /** Panel inline size (any CSS length). */
  size?: string;
  /**
   * Modal drawers dim the page behind a scrim, trap focus, and lock body
   * scroll — the pattern for mobile navigation. Set `false` for a non-modal
   * detail panel that leaves the rest of the page interactive (no scrim, no
   * trap); focus still moves into the panel on open and returns to the opener
   * on close.
   */
  modal?: boolean;
  /** Accessible label for the dialog (use when there is no visible heading). */
  ariaLabel?: string;
}
