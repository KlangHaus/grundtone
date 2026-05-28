import type { Align } from './types';
import type { EmailTheme } from '../theme';
import { section } from '../internal';

export interface InvoiceColumn {
  /** Header label. May contain `{{placeholders}}`. */
  header: string;
  /**
   * Cell expression evaluated per item by the send-time templating layer,
   * e.g. `{{this.description}}` or `{{description}}`.
   */
  cell: string;
  align?: Align;
}

export interface InvoiceTableOpts {
  columns: InvoiceColumn[];
  /** Handlebars iterable to loop over. Defaults to `items`. */
  each?: string;
  /** Optional totals row rendered after the loop. */
  total?: { label: string; value: string };
}

/**
 * A line-items table (faktura) with a Handlebars `{{#each}}` loop left intact
 * for the send-time layer to expand. Cell styling is interpolated from theme
 * tokens — `mj-table` is raw HTML, so the package inlines those styles here
 * (which is exactly the job: token-derived inlined CSS in the output).
 */
export function invoiceTable(
  theme: EmailTheme,
  opts: InvoiceTableOpts,
): string {
  const { colors, spacing, fontWeight, fontSize } = theme;
  const each = opts.each ?? 'items';
  const cellPad = `${spacing.sm} ${spacing.sm}`;

  const headCell = (col: InvoiceColumn): string =>
    `<th style="text-align:${col.align ?? 'left'};padding:${cellPad};border-bottom:2px solid ${colors.border};color:${colors.textSecondary};font-weight:${fontWeight.semibold};font-size:${fontSize.sm};text-transform:uppercase;letter-spacing:0.04em;">${col.header}</th>`;

  const bodyCell = (col: InvoiceColumn): string =>
    `<td style="text-align:${col.align ?? 'left'};padding:${cellPad};border-bottom:1px solid ${colors.border};color:${colors.text};">${col.cell}</td>`;

  const headRow = `<tr>${opts.columns.map(headCell).join('')}</tr>`;
  const bodyRows = `{{#each ${each}}}<tr>${opts.columns.map(bodyCell).join('')}</tr>{{/each}}`;

  const labelColspan = Math.max(1, opts.columns.length - 1);
  const totalRow = opts.total
    ? `<tr><td colspan="${labelColspan}" style="text-align:right;padding:${cellPad};border-top:2px solid ${colors.border};color:${colors.textSecondary};font-weight:${fontWeight.semibold};">${opts.total.label}</td><td style="text-align:right;padding:${cellPad};border-top:2px solid ${colors.border};color:${colors.text};font-weight:${fontWeight.bold};">${opts.total.value}</td></tr>`
    : '';

  return section(`<mj-table cellpadding="0" cellspacing="0" width="100%">
          ${headRow}
          ${bodyRows}
          ${totalRow}
        </mj-table>`);
}
