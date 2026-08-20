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
  // 🔴 `export * from './x'` kan denne parser ikke folde ud — den ser ingen
  // navne og ville rapportere "intet eksporteret", altså TAVS hvor den burde
  // larme. I dag kan det ikke ske: begge sider maales paa byggede .d.ts, og
  // vite-plugin-dts/tsup flader stjerner ud til navngivne eksporter
  // ([review] verificerede: nul forekomster i den genererede dist). Skulle en
  // fremtidig build holde op med at flade dem ud, skal gaten faelde det frem
  // for at blive stille.
  const star = source.match(/^\s*export\s+\*(?:\s+as\s+\w+)?\s+from\s+.*$/m);
  if (star) {
    throw new Error(
      `public-api: kan ikke folde en stjerne-eksport ud: ${star[0].trim()}. ` +
        `Maal paa en bygget .d.ts, hvor den er fladet ud — ellers ville gaten se ` +
        `faerre eksporter end der findes og tie om et reelt tab.`,
    );
  }
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

/**
 * Eksport-map-noegler er ogsaa offentligt API — og de er USYNLIGE for en
 * .d.ts-sammenligning.
 *
 * 🔴 Maalt 2026-08-19 ([backstage]s fund): den udgivne @grundtone/vue@2.23.3
 * har `./css/utilities` i sin exports-map; develop har den ikke. En forbruger
 * med `import '@grundtone/vue/css/utilities'` knaekker — og gaten sagde groent,
 * fordi den kun sammenlignede typenavne. Paastanden var "intet offentligt API
 * gaar tabt"; maalingen var "ingen .d.ts-eksport gaar tabt". Afstanden mellem
 * de to var et helt export-map.
 *
 * `.` medregnes ikke: den findes altid, og dens INDHOLD daekkes af
 * .d.ts-sammenligningen.
 */
export function removedEntryPoints(
  publishedPkg,
  nextPkg,
  allowedRemovals = [],
) {
  const keys = pkg =>
    new Set(
      Object.keys(pkg?.exports ?? {}).filter(
        k => k.startsWith('.') && k !== '.',
      ),
    );
  const allowed = new Set(allowedRemovals);
  const next = keys(nextPkg);
  return [...keys(publishedPkg)]
    .filter(k => !next.has(k) && !allowed.has(k))
    .sort();
}
