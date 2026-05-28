import type { Align } from './types';
import type { EmailTheme } from '../theme';
import { attrs } from '../internal';

export interface HeadingOpts {
  /** Heading content. May contain `{{placeholders}}` and inline markup. */
  text: string;
  /** 1 → display heading (h1 type style), 2 → section heading (h2). */
  level?: 1 | 2;
  align?: Align;
}

/** A themed heading using the `h1`/`h2` named type styles from the head. */
export function heading(_theme: EmailTheme, opts: HeadingOpts): string {
  const mjClass = opts.level === 2 ? 'h2' : 'h1';
  return `    <mj-section>
      <mj-column>
        <mj-text ${attrs({ 'mj-class': mjClass, align: opts.align })}>${opts.text}</mj-text>
      </mj-column>
    </mj-section>`;
}

export interface TextOpts {
  /** Paragraph content. May contain `{{placeholders}}` and inline markup. */
  text: string;
  align?: Align;
  /** `base` body copy (default), `lead` for intros, `small` for fine print. */
  size?: 'base' | 'lead' | 'small';
  /** Render in the secondary text colour. */
  muted?: boolean;
}

/** A themed paragraph of body copy. */
export function text(theme: EmailTheme, opts: TextOpts): string {
  const mjClass =
    opts.size === 'lead' ? 'lead' : opts.size === 'small' ? 'small' : undefined;
  const color = opts.muted ? theme.colors.textSecondary : undefined;
  return `    <mj-section>
      <mj-column>
        <mj-text ${attrs({ 'mj-class': mjClass, align: opts.align, color })}>${opts.text}</mj-text>
      </mj-column>
    </mj-section>`;
}
