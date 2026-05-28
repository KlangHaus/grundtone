import type { EmailTheme } from '../theme';
import { header, type HeaderOpts } from './header';
import { heading, text, type HeadingOpts, type TextOpts } from './text';
import { button, type ButtonOpts } from './button';
import { divider, spacer, type SpacerOpts } from './structure';
import { infobox, type InfoboxOpts } from './infobox';
import { invoiceTable, type InvoiceTableOpts } from './invoice';
import { footer, type FooterOpts } from './footer';

export type { Align, Block } from './types';
export type { HeaderOpts } from './header';
export type { HeadingOpts, TextOpts } from './text';
export type { ButtonOpts } from './button';
export type { SpacerOpts, SpacerSize } from './structure';
export type { InfoboxOpts, InfoTone } from './infobox';
export type { InvoiceColumn, InvoiceTableOpts } from './invoice';
export type { FooterOpts } from './footer';

export {
  header,
  heading,
  text,
  button,
  divider,
  spacer,
  infobox,
  invoiceTable,
  footer,
};

/**
 * A set of block helpers pre-bound to a theme. Templates compose emails by
 * calling these and concatenating the returned MJML fragments.
 */
export interface BoundBlocks {
  header: (opts: HeaderOpts) => string;
  heading: (opts: HeadingOpts) => string;
  text: (opts: TextOpts) => string;
  button: (opts: ButtonOpts) => string;
  divider: () => string;
  spacer: (opts?: SpacerOpts) => string;
  infobox: (opts: InfoboxOpts) => string;
  invoiceTable: (opts: InvoiceTableOpts) => string;
  footer: (opts: FooterOpts) => string;
}

/** Bind every block to a theme for ergonomic composition. */
export function createBlocks(theme: EmailTheme): BoundBlocks {
  return {
    header: opts => header(theme, opts),
    heading: opts => heading(theme, opts),
    text: opts => text(theme, opts),
    button: opts => button(theme, opts),
    divider: () => divider(theme),
    spacer: opts => spacer(theme, opts),
    infobox: opts => infobox(theme, opts),
    invoiceTable: opts => invoiceTable(theme, opts),
    footer: opts => footer(theme, opts),
  };
}
