/**
 * Sammenligner en pakkes offentlige API mellem det UDGIVNE og det vi er ved
 * at udgive.
 *
 * 🔴 Hvorfor filen findes: version-drift-gaten asserterer at develop er
 * NYERE end npm's `latest`. Den er grøn så længe 2.24.0 > 2.23.3 — uanset hvad
 * de to versioner INDEHOLDER. Målt 2026-08-19: npm's 2.23.3 (fra main-æraen)
 * eksporterer GTFooter, GTHeader og GTMasonry, som develops 2.24.0 IKKE har.
 * Et publish fra develop ville altså fjerne tre publicerede komponenter fra
 * konsumenter og levere det som en minor bump — mens gaten sagde ja.
 *
 * Et instrument der måler rækkefølge kan ikke se et tab. Denne måler mængden.
 */

/** Udtrækker eksporterede navne fra en index.ts/d.ts-tekst. */
export function exportedNames(source) {
  const names = new Set();
  // `export { A, B as C }` og `export type { … }`
  for (const m of source.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}/g)) {
    for (const part of m[1].split(',')) {
      // `type X` og `X as Y`: vi vil have det EKSPORTEREDE navn uden
      // type-modifikatoren. Uden strip'en hedder navnet "type X", og en
      // erklæret fjernelse i .api-removals.json ville aldrig matche — gaten
      // ville blive ved med at fejle på noget der var besluttet. (Målt.)
      const name = part
        .trim()
        .split(/\s+as\s+/)
        .pop()
        ?.trim()
        .replace(/^type\s+/, '');
      if (name) names.add(name);
    }
  }
  // `export const X` / `export function X` / `export class X`
  for (const m of source.matchAll(
    /export\s+(?:declare\s+)?(?:const|function|class|interface|type)\s+([A-Za-z_$][\w$]*)/g,
  )) {
    names.add(m[1]);
  }
  return names;
}

/**
 * Hvilke offentlige navne ville forsvinde ved et publish?
 *
 * `allowedRemovals` er den bevidste udvej: en fjernelse er lovlig, men den
 * skal ERKLÆRES, ikke ske i tavshed. Det er forskellen på en beslutning og
 * et uheld.
 */
export function removedExports(
  publishedSource,
  nextSource,
  allowedRemovals = [],
) {
  const published = exportedNames(publishedSource);
  const next = exportedNames(nextSource);
  const allowed = new Set(allowedRemovals);
  return [...published].filter(n => !next.has(n) && !allowed.has(n)).sort();
}
