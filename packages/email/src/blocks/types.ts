import type { EmailTheme } from '../theme';

export type Align = 'left' | 'center' | 'right';

/** A block is a pure function: theme + options in, section-level MJML out. */
export type Block<Opts> = (theme: EmailTheme, opts: Opts) => string;
