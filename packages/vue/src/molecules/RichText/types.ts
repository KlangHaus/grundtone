import type { JSONContent } from '@tiptap/vue-3';

/** The constrained set of formatting features GTRichText can expose. */
export type RichTextFeature =
  | 'bold'
  | 'italic'
  | 'code'
  | 'heading'
  | 'bulletList'
  | 'orderedList'
  | 'link';

export interface RichTextProps {
  /**
   * v-model — the canonical ProseMirror document (JSON). Source of truth,
   * round-trippable. HTML is exposed separately (output-only) via `@update:html`.
   */
  modelValue?: JSONContent | null;
  /** Placeholder shown while the document is empty. */
  placeholder?: string;
  /** Read-only: renders the content, no editing, toolbar hidden. */
  readonly?: boolean;
  /** Disabled: dimmed, non-interactive. */
  disabled?: boolean;
  /** Invalid state — boolean, or a message id the field wrapper describes with. */
  error?: boolean | string;
  /** Accessible label for the editor region. */
  ariaLabel?: string;
  /**
   * Allow-list subset of features to expose (toolbar + schema). Omit for the
   * full set. A feature not listed is neither in the toolbar nor the paste
   * allow-list.
   */
  features?: RichTextFeature[];
  /** Accessible label for the formatting toolbar */
  toolbarLabel?: string;
  /** Accessible label for the open-link button in the link popover */
  openLinkLabel?: string;
  /** Accessible label for the edit-link button in the link popover */
  editLinkLabel?: string;
  /** Accessible label for the remove-link button in the link popover */
  removeLinkLabel?: string;
  /** Accessible label for the link editor */
  linkInputLabel?: string;
}
