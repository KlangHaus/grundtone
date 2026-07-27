export interface CodeBlockProps {
  /** The code / text to display. */
  code: string;
  /** Optional language label shown in the header (e.g. "bash", "json"). */
  language?: string;
  /** Optional caption in the header (e.g. "Install", "tokens.json"). */
  label?: string;
  /** Show a copy-to-clipboard button (default true). */
  copyable?: boolean;
}
