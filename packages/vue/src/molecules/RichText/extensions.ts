import type { AnyExtension } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';

import type { RichTextFeature } from './types';

/** The features GTRichText enables when a caller names none. */
export const DEFAULT_FEATURES: readonly RichTextFeature[] = [
  'bold',
  'italic',
  'code',
  'heading',
  'bulletList',
  'orderedList',
  'link',
];

/**
 * The extension set for a given feature list — ONE definition, used by both the
 * editor and `fromHTML`.
 *
 * 🔴 WHY IT IS SHARED RATHER THAN WRITTEN TWICE. A ProseMirror document is only
 * meaningful against a schema. If the converter built its own list, a node the
 * converter accepted but the editor's schema did not would be silently dropped
 * the first time the document was opened — and the HTML a customer imported
 * would lose content between the import and the first edit, with nothing red
 * anywhere. Two lists that claim to be the same list are the drift.
 */
export function buildExtensions(
  features: readonly RichTextFeature[] = DEFAULT_FEATURES,
  placeholder?: string,
): AnyExtension[] {
  const has = (f: RichTextFeature) => features.includes(f);

  const exts: AnyExtension[] = [
    StarterKit.configure({
      heading: has('heading') ? { levels: [2, 3] } : false,
      bold: has('bold') ? {} : false,
      italic: has('italic') ? {} : false,
      code: has('code') ? {} : false,
      bulletList: has('bulletList') ? {} : false,
      orderedList: has('orderedList') ? {} : false,
      link: has('link') ? { openOnClick: false, autolink: true } : false,
      // Deliberately out of the v1 feature set:
      strike: false,
      codeBlock: false,
      blockquote: false,
      horizontalRule: false,
      underline: false,
    }) as AnyExtension,
  ];

  // Editor-only; a conversion has nothing to show a placeholder in.
  if (placeholder !== undefined) {
    exts.push(Placeholder.configure({ placeholder }));
  }

  return exts;
}
