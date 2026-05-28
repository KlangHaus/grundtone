import type { EmailTheme } from '../theme';
import { attrs, section } from '../internal';

export interface FooterOpts {
  /**
   * Footer lines (sender name, postal address, legal note). May contain
   * `{{placeholders}}` and inline markup. Rendered small and muted.
   */
  text: string;
  /** When set, appends an "Unsubscribe" link (label configurable). */
  unsubscribeUrl?: string;
  /** Unsubscribe link label. Defaults to "Unsubscribe". */
  unsubscribeLabel?: string;
}

/**
 * Footer rendered below the card on the body background: small, muted,
 * centered. Includes an optional unsubscribe link (required for marketing).
 */
export function footer(theme: EmailTheme, opts: FooterOpts): string {
  const { colors, spacing, fontSize, lineHeight } = theme;
  const unsub = opts.unsubscribeUrl
    ? `<br /><a href="${opts.unsubscribeUrl}" style="color:${colors.textTertiary};">${opts.unsubscribeLabel ?? 'Unsubscribe'}</a>`
    : '';
  const textAttrs = attrs({
    align: 'center',
    color: colors.textTertiary,
    'font-size': fontSize.sm,
    'line-height': lineHeight.normal,
  });
  return section(`<mj-text ${textAttrs}>${opts.text}${unsub}</mj-text>`, {
    section: `padding="${spacing.lg} ${spacing.xl}"`,
  });
}
