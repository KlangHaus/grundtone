import type { EmailTheme } from '../theme';
import { attrs } from '../internal';

export type InfoTone = 'info' | 'success' | 'warning' | 'error';

export interface InfoboxOpts {
  tone: InfoTone;
  /** Body content. May contain `{{placeholders}}` and inline markup. */
  text: string;
  /** Optional bold title line above the body. */
  title?: string;
}

interface TonePalette {
  bg: string;
  border: string;
  fg: string;
}

function palette(theme: EmailTheme, tone: InfoTone): TonePalette {
  const c = theme.colors;
  switch (tone) {
    case 'success':
      return { bg: c.successLight, border: c.success, fg: c.successDark };
    case 'warning':
      return { bg: c.warningLight, border: c.warning, fg: c.warningDark };
    case 'error':
      return { bg: c.errorLight, border: c.error, fg: c.errorDark };
    case 'info':
    default:
      return { bg: c.infoLight, border: c.info, fg: c.infoDark };
  }
}

/**
 * A tinted callout box themed from the status tokens (info/success/warning/
 * error). Colours come straight from the theme — nothing is hand-picked.
 */
export function infobox(theme: EmailTheme, opts: InfoboxOpts): string {
  const p = palette(theme, opts.tone);
  const { spacing, radius } = theme;
  const column = attrs({
    'background-color': p.bg,
    'border-left': `4px solid ${p.border}`,
    'border-radius': radius.md,
    padding: spacing.md,
  });
  const titleRow = opts.title
    ? `<mj-text ${attrs({ color: p.fg, 'font-weight': theme.fontWeight.semibold, padding: `0 0 ${spacing.xs} 0` })}>${opts.title}</mj-text>`
    : '';
  return `    <mj-section padding="0 0 ${spacing.md} 0">
      <mj-column ${column}>
        ${titleRow}
        <mj-text ${attrs({ color: p.fg, padding: '0' })}>${opts.text}</mj-text>
      </mj-column>
    </mj-section>`;
}
