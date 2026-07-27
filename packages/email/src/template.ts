import Handlebars from 'handlebars';
import { createBlocks, type BoundBlocks } from './blocks';
import { baseLayout } from './layout';
import {
  compileMjml,
  toPlainText,
  type CompileError,
  type CompileOptions,
} from './compile';
import { resolveEmailTheme, type EmailTheme } from './theme';

/** What a template's `build` produces: the card content and optional footer. */
export interface TemplateBody {
  content: string;
  footer?: string;
}

/** A single locale's authored content for a template. */
export interface LocaleContent {
  /** Subject line. May contain `{{placeholders}}`. */
  subject: string;
  /** Hidden inbox preview text. May contain `{{placeholders}}`. */
  preheader?: string;
  /** Compose the body from the theme-bound blocks. */
  build: (blocks: BoundBlocks, theme: EmailTheme) => TemplateBody;
  /**
   * Explicit plain-text body (may contain `{{placeholders}}`). When omitted,
   * the plain-text fallback is derived from the compiled HTML.
   */
  text?: string;
}

export interface EmailTemplate<L extends string = string> {
  /** Stable identifier, e.g. `magic-link`. Used as the CDN path segment. */
  key: string;
  /** Authored content per locale. */
  locales: Record<L, LocaleContent>;
  /** Documented send-time variables (for docs and the build manifest). */
  variables?: string[];
}

/** Identity helper that pins the locale union for inference. */
export function defineTemplate<L extends string>(
  template: EmailTemplate<L>,
): EmailTemplate<L> {
  return template;
}

export interface CompileTemplateOptions {
  /** Theme to compile against. Defaults to grundtone's light preset. */
  theme?: EmailTheme;
  /** `<html lang>`. Defaults to the locale. */
  lang?: string;
  /**
   * MJML compile options. The default `validationLevel` is `soft`, which means
   * validation errors are reported via `CompiledTemplate.errors` rather than
   * thrown — publish flows MUST either read `errors` and refuse to ship on a
   * non-empty list, or set `validationLevel: 'strict'` to throw instead. The
   * built-in `scripts/build-templates.ts` and `templates.test.ts` do both.
   */
  mjml?: CompileOptions;
}

/**
 * The publishable artifact for one template+locale: HTML and text still
 * containing `{{placeholders}}`. This is what gets versioned to the CDN and
 * fed to the send-time layer (e.g. the Go notifications service).
 *
 * Field shape is the stable contract between this package, the studio publish
 * pipeline, and the notifications service — keep `{key, locale, version,
 * subject, preheader?, variables, html, text}` synchronised when changing.
 */
export interface CompiledTemplate {
  key: string;
  locale: string;
  subject: string;
  preheader?: string;
  html: string;
  text: string;
  variables: string[];
  errors: CompileError[];
}

/**
 * Compile a template+locale to its publishable, placeholder-bearing artifact.
 * Async since mjml 5 (render returns a Promise).
 */
export async function compileTemplate<L extends string>(
  template: EmailTemplate<L>,
  locale: L,
  options: CompileTemplateOptions = {},
): Promise<CompiledTemplate> {
  const content = template.locales[locale];
  if (!content) {
    throw new Error(`Template "${template.key}" has no locale "${locale}"`);
  }
  const theme = options.theme ?? resolveEmailTheme();
  const blocks = createBlocks(theme);
  const body = content.build(blocks, theme);

  const mjml = baseLayout({
    theme,
    content: body.content,
    footer: body.footer,
    preheader: content.preheader,
    lang: options.lang ?? locale,
  });

  const { html, errors } = await compileMjml(mjml, options.mjml);
  const text = content.text ?? toPlainText(html);

  return {
    key: template.key,
    locale,
    subject: content.subject,
    preheader: content.preheader,
    html,
    text,
    variables: template.variables ?? [],
    errors,
  };
}

/** A fully rendered email ready to hand to a transport (Resend, SMTP, …). */
export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

/**
 * Fill `{{placeholders}}` in a compiled artifact with data, using Handlebars.
 *
 * HTML is rendered with escaping on, so recipient data is safe in HTML *text*
 * and quoted attribute contexts. Subject and text are rendered without escaping
 * (those media have no markup). The Go notifications service performs the
 * equivalent substitution on the published artifact — this is the JS-side path
 * for previews, tests, and direct sends from TypeScript consumers.
 *
 * Escaping does NOT validate URL schemes: a value substituted into `href="{{…}}"`
 * is still emitted verbatim, so `javascript:`/`data:` URLs survive. Callers must
 * pass trusted/validated URLs for link placeholders (the built-in templates use
 * system-generated URLs). URL-scheme allowlisting belongs at the data boundary.
 */
export function renderTemplate(
  compiled: CompiledTemplate,
  data: Record<string, unknown> = {},
): RenderedEmail {
  return {
    subject: Handlebars.compile(compiled.subject, { noEscape: true })(data),
    html: Handlebars.compile(compiled.html)(data),
    text: Handlebars.compile(compiled.text, { noEscape: true })(data),
  };
}

/** Convenience: compile then render in one step (skips the CDN artifact). */
export async function renderEmail<L extends string>(
  template: EmailTemplate<L>,
  locale: L,
  data: Record<string, unknown> = {},
  options: CompileTemplateOptions = {},
): Promise<RenderedEmail> {
  return renderTemplate(await compileTemplate(template, locale, options), data);
}
