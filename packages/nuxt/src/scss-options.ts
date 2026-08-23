/** What Vite accepts for `css.preprocessorOptions.scss.additionalData`. */
export type AdditionalData =
  | string
  | ((source: string, filename: string) => string | Promise<string>)
  | undefined;

/**
 * Puts the token `@use` in front of whatever the consumer already had.
 *
 * 🔴 Prepending rather than replacing is the whole point. A consumer may have
 * their own `additionalData`, and a module that silently dropped it would be a
 * second bug of the same kind as the missing token namespace this fixes — the
 * kind you only notice when a build that used to work stops working.
 *
 * Vite accepts both a string and a function, so both forms have to survive.
 */
export function composeAdditionalData(
  tokenImport: string,
  existing: AdditionalData,
): Exclude<AdditionalData, undefined> {
  if (typeof existing === 'function') {
    return async (source: string, filename: string) =>
      `${tokenImport}\n${await existing(source, filename)}`;
  }
  if (typeof existing === 'string') {
    return `${tokenImport}\n${existing}`;
  }
  return tokenImport;
}
