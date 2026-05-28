import type { Align } from './types';
import type { EmailTheme } from '../theme';
import { attrs } from '../internal';

export interface ButtonOpts {
  /** Button label. May contain `{{placeholders}}`. */
  label: string;
  /** Destination URL. Typically a `{{actionUrl}}` placeholder. */
  href: string;
  align?: Align;
  /** `primary` (filled, default) or `secondary` (outlined). */
  variant?: 'primary' | 'secondary';
}

/** A themed, bulletproof call-to-action button. */
export function button(theme: EmailTheme, opts: ButtonOpts): string {
  const { colors } = theme;
  const variantAttrs =
    opts.variant === 'secondary'
      ? {
          'background-color': colors.surface,
          color: colors.primary,
          border: `1px solid ${colors.border}`,
        }
      : {};
  const btn = attrs({
    href: opts.href,
    align: opts.align,
    ...variantAttrs,
  });
  return `    <mj-section>
      <mj-column>
        <mj-button ${btn}>${opts.label}</mj-button>
      </mj-column>
    </mj-section>`;
}
