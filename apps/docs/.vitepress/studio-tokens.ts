// Shared by config.ts (Node, emits the <link>) and the theme (browser, moves it
// last in <head>), so the id cannot drift between the two.
export const STUDIO_TOKENS_LINK_ID = 'grundtone-studio-tokens';

const ENV_NAME = 'GRUNDTONE_STUDIO_TOKENS_URL';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

/**
 * Validate the Studio tokens URL before the published site loads CSS from it.
 * Unset or blank → '' (no link). Accepted: https://, or http:// on a local
 * host (Tilt). Anything else throws so the build fails with the variable named,
 * instead of shipping a stylesheet from an arbitrary origin.
 */
export function resolveStudioTokensUrl(raw: string | undefined): string {
  const value = raw?.trim() ?? '';
  if (!value) return '';
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${ENV_NAME} is not a valid URL: ${value}`);
  }
  const ok =
    url.protocol === 'https:' ||
    (url.protocol === 'http:' && LOCAL_HOSTS.has(url.hostname));
  if (!ok) {
    throw new Error(
      `${ENV_NAME} must be https:// (or http:// on localhost), got: ${value}`,
    );
  }
  return url.href;
}
