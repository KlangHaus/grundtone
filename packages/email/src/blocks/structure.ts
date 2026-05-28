import type { EmailTheme } from '../theme';

export type SpacerSize = keyof EmailTheme['spacing'];

export interface SpacerOpts {
  /** Spacing token to use as the gap height. Defaults to `md`. */
  size?: SpacerSize;
}

/** Vertical whitespace sized from the spacing scale. */
export function spacer(theme: EmailTheme, opts: SpacerOpts = {}): string {
  const height = theme.spacing[opts.size ?? 'md'];
  return `    <mj-section>
      <mj-column>
        <mj-spacer height="${height}" />
      </mj-column>
    </mj-section>`;
}

/** A themed horizontal rule. */
export function divider(_theme: EmailTheme): string {
  return `    <mj-section>
      <mj-column>
        <mj-divider />
      </mj-column>
    </mj-section>`;
}
