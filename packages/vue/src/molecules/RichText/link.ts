// Link-URL validation for GTRichText's link popover (iteration 2).
//
// ALLOW-LIST, not a block-list: only these shapes are accepted, so dangerous
// schemes (javascript:, data:, vbscript:, file:, …) are rejected by
// construction rather than by enumeration. Matches the designer's prototype
// rule ("skal starte med https:// eller /") plus the schemes a CMS body
// legitimately links to.
const ALLOWED = [
  /^https:\/\/[^\s]+$/i,
  /^http:\/\/[^\s]+$/i,
  /^mailto:[^\s]+$/i,
  /^\/(?!\/)[^\s]*$/, // relative path — but not protocol-relative //host
  /^#[^\s]*$/, // in-page anchor
];

export function isSafeLinkUrl(url: string): boolean {
  const value = url.trim();
  if (!value || value.length > 2000) return false;
  return ALLOWED.some(pattern => pattern.test(value));
}
