// Theme — the single coupling point to grundtone tokens.
export {
  resolveEmailTheme,
  IBM_PLEX_SANS,
  type EmailTheme,
  type EmailWebFont,
  type ResolveEmailThemeOptions,
} from './theme';

// Head + layout.
export { renderHead } from './head';
export { baseLayout, type LayoutOptions } from './layout';

// Blocks (includes createBlocks + all block helpers and their option types).
export * from './blocks';

// Compile pipeline.
export {
  compileMjml,
  toPlainText,
  type CompileOptions,
  type CompileResult,
  type CompileError,
  type PlainTextOptions,
} from './compile';

// Template authoring + rendering.
export {
  defineTemplate,
  compileTemplate,
  renderTemplate,
  renderEmail,
  type EmailTemplate,
  type LocaleContent,
  type TemplateBody,
  type CompileTemplateOptions,
  type CompiledTemplate,
  type RenderedEmail,
} from './template';
