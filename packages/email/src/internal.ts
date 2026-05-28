/**
 * Internal helpers shared across blocks and the head renderer.
 * Not part of the public API.
 */

/**
 * Convert a rem/px/unitless length token to a px string.
 *
 * Email clients — Outlook in particular — are unreliable with `rem`, so the
 * grundtone tokens (authored in rem) are converted to px for the email medium.
 * The *value* still comes from tokens; only the unit is adapted.
 */
export function remToPx(value: string, base = 16): string {
  const v = value.trim();
  const rem = /^(-?\d*\.?\d+)rem$/.exec(v);
  if (rem) return `${Math.round(parseFloat(rem[1]) * base)}px`;
  const em = /^(-?\d*\.?\d+)em$/.exec(v);
  if (em) return `${Math.round(parseFloat(em[1]) * base)}px`;
  return v;
}

/**
 * Render an attribute map to a string, dropping `undefined`/`null` entries.
 * Values are emitted verbatim — callers pass already-trusted token values or
 * author-controlled MJML source, never raw recipient input.
 */
export function attrs(
  map: Record<string, string | number | undefined | null>,
): string {
  return Object.entries(map)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
}

/**
 * Wrap column-level MJML (mj-text, mj-button, mj-image, …) in the standard
 * section → column scaffold every block shares. Pass already-rendered
 * attribute strings (e.g. from {@link attrs}) for the section/column when a
 * block needs them.
 */
export function section(
  inner: string,
  opts: { section?: string; column?: string } = {},
): string {
  const s = opts.section ? ` ${opts.section}` : '';
  const c = opts.column ? ` ${opts.column}` : '';
  return `    <mj-section${s}>
      <mj-column${c}>
        ${inner}
      </mj-column>
    </mj-section>`;
}

/** Drop blank lines and normalise indentation noise in composed MJML fragments. */
export function compact(mjml: string): string {
  return mjml
    .split('\n')
    .map(l => l.replace(/\s+$/, ''))
    .filter(l => l.trim() !== '')
    .join('\n');
}
