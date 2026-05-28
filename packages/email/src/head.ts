import type { EmailTheme } from './theme';
import { compact } from './internal';

/**
 * Render the MJML `<mj-head>` for a theme.
 *
 * This is the single place where grundtone tokens enter the email artifact.
 * It wires token values into:
 *  - `<mj-font>` web-font registrations (with the token stack as fallback),
 *  - `<mj-attributes>` defaults so every block inherits themed type/colour/spacing,
 *  - `<mj-class>` named type styles (`h1`, `h2`, `lead`, `small`),
 *  - `<mj-style inline>` utility classes that the compiler inlines into elements.
 *
 * Blocks therefore never hand-write colours or fonts — they reference these
 * defaults/classes, and the build step turns them into inline styles.
 */
export function renderHead(theme: EmailTheme): string {
  const { colors, fonts, fontSize, fontWeight, lineHeight, spacing, radius } =
    theme;

  const fontTags = theme.webFonts
    .map(f => `<mj-font name="${f.name}" href="${f.href}" />`)
    .join('\n');

  return compact(`
<mj-head>
  ${fontTags}
  <mj-breakpoint width="480px" />
  <mj-attributes>
    <mj-all font-family="${fonts.base}" />
    <mj-section padding="0" />
    <mj-column padding="0" />
    <mj-text
      color="${colors.text}"
      font-size="${fontSize.base}"
      line-height="${lineHeight.normal}"
      padding="0 0 ${spacing.md} 0"
    />
    <mj-button
      background-color="${colors.primary}"
      color="${colors.onPrimary}"
      border-radius="${radius.md}"
      font-size="${fontSize.base}"
      font-weight="${fontWeight.semibold}"
      inner-padding="14px 28px"
      padding="${spacing.xs} 0 ${spacing.lg} 0"
      align="left"
    />
    <mj-divider
      border-color="${colors.border}"
      border-width="1px"
      padding="${spacing.sm} 0"
    />
    <mj-table
      color="${colors.text}"
      font-size="${fontSize.base}"
      line-height="${lineHeight.normal}"
      padding="0 0 ${spacing.md} 0"
    />
    <mj-class
      name="h1"
      font-family="${fonts.heading}"
      font-size="${fontSize['3xl']}"
      font-weight="${fontWeight.bold}"
      line-height="${lineHeight.tight}"
      color="${colors.text}"
      padding="0 0 ${spacing.md} 0"
    />
    <mj-class
      name="h2"
      font-family="${fonts.heading}"
      font-size="${fontSize.xl}"
      font-weight="${fontWeight.semibold}"
      line-height="${lineHeight.tight}"
      color="${colors.text}"
      padding="0 0 ${spacing.sm} 0"
    />
    <mj-class
      name="lead"
      font-size="${fontSize.lg}"
      line-height="${lineHeight.relaxed}"
      color="${colors.textSecondary}"
    />
    <mj-class
      name="small"
      font-size="${fontSize.sm}"
      line-height="${lineHeight.normal}"
      color="${colors.textSecondary}"
    />
  </mj-attributes>
  <mj-style inline="inline">
    .gt-text-secondary { color: ${colors.textSecondary}; }
    .gt-text-tertiary { color: ${colors.textTertiary}; }
    .gt-text-center { text-align: center; }
    .gt-text-right { text-align: right; }
    .gt-strong { font-weight: ${fontWeight.semibold}; }
    .gt-divider-cell { border-top: 1px solid ${colors.border}; }
  </mj-style>
  <mj-style>
    a { color: ${colors.primary}; }
    .gt-link { color: ${colors.primary}; text-decoration: underline; }
    @media only screen and (max-width: 480px) {
      .gt-hide-mobile { display: none !important; }
    }
  </mj-style>
</mj-head>`);
}
