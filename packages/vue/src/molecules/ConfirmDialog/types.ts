export interface ConfirmDialogProps {
  /** Controls visibility (v-model:open). */
  open: boolean;
  /** Dialog title / question. */
  title: string;
  /** Optional supporting message below the title (or use the default slot). */
  message?: string;
  /** Confirm button label. */
  confirmLabel?: string;
  /** Cancel button label. */
  cancelLabel?: string;
  /**
   * Destructive actions (delete, revoke) render the confirm button in the
   * negative variant so the consequence reads before the click.
   */
  destructive?: boolean;
  /** Show a loading spinner on confirm (e.g. while an async action runs). */
  loading?: boolean;
}
