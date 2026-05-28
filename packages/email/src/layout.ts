import type { EmailTheme } from './theme';
import { renderHead } from './head';
import { compact } from './internal';

export interface LayoutOptions {
  theme: EmailTheme;
  /**
   * Composed content blocks (section-level MJML) shown inside the card.
   * Build this by concatenating block helpers.
   */
  content: string;
  /**
   * Hidden inbox preview text. May contain `{{placeholders}}`. Kept short —
   * clients show ~90–140 chars after the subject.
   */
  preheader?: string;
  /** Optional footer blocks rendered below the card on the body background. */
  footer?: string;
  /** `<html lang>` value. Defaults to "en". */
  lang?: string;
}

/**
 * Hidden preheader: shows in the inbox preview, invisible in the body. The
 * trailing zero-width characters stop the next visible line from bleeding in.
 */
function preheaderBlock(text: string): string {
  return `<mj-raw>
    <div class="gt-preheader" style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${text}&#8199;&#65279;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;&#847;</div>
  </mj-raw>`;
}

/**
 * Wrap composed blocks in the email-safe base document: themed `<mj-head>`, a
 * centered ~600px content card on the body background, optional preheader and
 * footer. Returns a complete MJML string ready for {@link compileMjml}.
 */
export function baseLayout(opts: LayoutOptions): string {
  const { theme, content, preheader, footer, lang = 'en' } = opts;
  const { spacing, radius, layout } = theme;

  return compact(`
<mjml lang="${lang}" owa="desktop">
  ${renderHead(theme)}
  <mj-body background-color="${layout.bodyBackground}" width="${layout.containerWidth}">
    ${preheader ? preheaderBlock(preheader) : ''}
    <mj-wrapper
      background-color="${layout.contentBackground}"
      border-radius="${radius.lg}"
      padding="${spacing.xl} ${spacing.xl}"
      css-class="gt-card"
    >
${content}
    </mj-wrapper>
    ${footer ?? ''}
  </mj-body>
</mjml>`);
}
