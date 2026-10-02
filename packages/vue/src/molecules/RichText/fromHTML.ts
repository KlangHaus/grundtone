import { generateJSON } from '@tiptap/html';
import type { JSONContent } from '@tiptap/vue-3';

import { buildExtensions, DEFAULT_FEATURES } from './extensions';
import type { RichTextFeature } from './types';

/**
 * Convert existing HTML into the `JSONContent` GTRichText takes as its
 * `modelValue`.
 *
 * For migrating a store that holds HTML today: convert ONCE on load and own the
 * JSON afterwards. GTRichText deliberately has no `html` prop — two inputs to
 * the same state would have to decide which wins when both are set, and that
 * decision is a future bug report rather than a feature.
 *
 * 🔴 THIS IS NOT A SANITIZER, AND MUST NOT BE USED AS ONE.
 *
 * It is a PARSER against a schema. Anything with no place in the extension set
 * has no place in the resulting document and therefore does not survive — so
 * the effect LOOKS like an allowlist, but the mechanism is "unknown node is not
 * in the schema", not "dangerous attribute is removed".
 *
 * The consequence, stated here because this is where someone stands when they
 * are about to rely on it: EXTEND THE EXTENSION SET WITH ANYTHING THAT ACCEPTS
 * ARBITRARY ATTRIBUTES AND THIS PROPERTY CHANGES. Do not remove a sanitizer
 * behind this function with the argument that "the converter cleans it".
 *
 * WHAT WAS MEASURED (2026-10-02), so a reader knows the size of the claim:
 * four inputs against the default feature set — ordinary markup, an unknown tag
 * (`<marquee>` normalises to a paragraph), an XSS attempt (`<img onerror>` and
 * `<script>` both gone), and inline `style`/`onclick` (both gone). That is the
 * whole viewport. No broader XSS corpus was run, and no claim is made about one.
 *
 * @param html the source markup
 * @param features the same feature list the GTRichText instance will use —
 *   pass it when it differs from the default, or the document may carry nodes
 *   that editor's schema drops on first open.
 */
export function fromHTML(
  html: string,
  features: readonly RichTextFeature[] = DEFAULT_FEATURES,
): JSONContent {
  return generateJSON(html, buildExtensions(features)) as JSONContent;
}
