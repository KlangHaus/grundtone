import type { Align } from './types';
import type { EmailTheme } from '../theme';
import { attrs } from '../internal';

export interface HeaderOpts {
  /** Absolute URL to the logo image. */
  logoUrl: string;
  /** Alt text — also the fallback when images are blocked. */
  logoAlt: string;
  /** Logo display width, e.g. "140px". Defaults to "140px". */
  logoWidth?: string;
  /** Optional link wrapping the logo (usually the marketing site). */
  href?: string;
  align?: Align;
}

/** Brand header: a centered (by default) logo image. */
export function header(theme: EmailTheme, opts: HeaderOpts): string {
  const imgAttrs = attrs({
    src: opts.logoUrl,
    alt: opts.logoAlt,
    width: opts.logoWidth ?? '140px',
    href: opts.href,
    align: opts.align ?? 'center',
    padding: `0 0 ${theme.spacing.lg} 0`,
  });
  return `    <mj-section>
      <mj-column>
        <mj-image ${imgAttrs} />
      </mj-column>
    </mj-section>`;
}
