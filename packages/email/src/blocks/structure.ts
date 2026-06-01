import type { EmailTheme } from '../theme';
import { section } from '../internal';

export type SpacerSize = keyof EmailTheme['spacing'];

export interface SpacerOpts {
  /** Spacing token to use as the gap height. Defaults to `md`. */
  size?: SpacerSize;
}

/** Vertical whitespace sized from the spacing scale. */
export function spacer(theme: EmailTheme, opts: SpacerOpts = {}): string {
  const height = theme.spacing[opts.size ?? 'md'];
  return section(`<mj-spacer height="${height}" />`);
}

/** A themed horizontal rule. */
export function divider(_theme: EmailTheme): string {
  return section('<mj-divider />');
}
