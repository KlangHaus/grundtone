import mjml2html from 'mjml';
import { convert } from 'html-to-text';

interface MjmlError {
  message: string;
  formattedMessage?: string;
  line?: number;
  tagName?: string;
}

// mjml 5 renders asynchronously (returns a Promise) — the whole compile
// chain is async accordingly.
type Mjml2Html = (
  mjml: string,
  options?: Record<string, unknown>,
) => Promise<{ html: string; errors: MjmlError[] }>;
const render = mjml2html as unknown as Mjml2Html;

export interface CompileOptions {
  /** MJML validation. Defaults to `soft` (warn, don't throw). */
  validationLevel?: 'strict' | 'soft' | 'skip';
  /** Minify the HTML. Off by default — readable output, smaller diff churn. */
  minify?: boolean;
}

export interface CompileError {
  message: string;
  line?: number;
  tagName?: string;
}

export interface CompileResult {
  html: string;
  errors: CompileError[];
}

/**
 * Compile token-themed MJML to bulletproof, responsive, CSS-inlined HTML.
 * `{{placeholders}}` in the source pass through untouched for the send-time
 * templating layer. Async since mjml 5 (render returns a Promise).
 */
export async function compileMjml(
  mjml: string,
  options: CompileOptions = {},
): Promise<CompileResult> {
  const { html, errors } = await render(mjml, {
    validationLevel: options.validationLevel ?? 'soft',
    keepComments: false,
    ...(options.minify ? { minify: true } : {}),
  });
  return {
    html,
    errors: (errors ?? []).map(e => ({
      message: e.formattedMessage ?? e.message,
      line: e.line,
      tagName: e.tagName,
    })),
  };
}

export interface PlainTextOptions {
  /** Wrap column width. Defaults to 78. Pass `false` to disable wrapping. */
  wordwrap?: number | false;
}

/**
 * Derive a plain-text fallback from compiled HTML. Skips the hidden preheader
 * and images; renders links as `text [href]`. `{{placeholders}}` survive.
 */
export function toPlainText(
  html: string,
  options: PlainTextOptions = {},
): string {
  const out = convert(html, {
    wordwrap: options.wordwrap ?? 78,
    selectors: [
      { selector: '.gt-preheader', format: 'skip' },
      { selector: 'img', format: 'skip' },
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
    ],
  }).trim();
  // Word-wrap can split a `{{ ... }}` expression across lines; collapse inner
  // whitespace so the send-time layer always sees intact placeholders.
  return out.replace(/\{\{[\s\S]*?\}\}/g, m => m.replace(/\s+/g, ' '));
}
