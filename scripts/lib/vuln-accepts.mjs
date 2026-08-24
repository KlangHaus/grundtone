import { byName } from './order.mjs';

/**
 * GHSA-id'er der ER ERKLÆRET som accepter — ikke id'er der blot NÆVNES.
 *
 * 🔴 Forskellen er ikke teoretisk: `osv-scanner.toml`s `reason`-tekst for den
 * ene accept henviser til den andens id ("samme nåbarhed som GHSA-…"). En
 * naiv "find alle GHSA-id'er"-søgning ville tælle omtalen med og dermed måle
 * prosaen OM nøglen frem for nøglen. Samme fælde som en tekstsøgning, der
 * rammer kommentaren, der advarer mod fejlen.
 *
 * Derfor ankres begge udtræk på ERKLÆRINGS-formen, linje for linje:
 *   TOML  `id = "GHSA-…"`
 *   YAML  `- GHSA-…` under `ignoreGhsas:`
 *
 * Det er bevidst ikke en fuld parser. En fuld TOML-parser ville være bedre —
 * men den findes ikke i JS uden en dependency, og en halv parser, der lader
 * som om den er hel, er værre end en eksplicit smal.
 */
export function declaredInToml(text) {
  return new Set(
    [...text.matchAll(/^[^\S\n]*id[^\S\n]*=[^\S\n]*["'](GHSA-[\w-]+)["']/gm)].map(
      m => m[1],
    ),
  );
}

export function declaredInPnpmWorkspace(text) {
  const start = text.search(/^[^\S\n]*ignoreGhsas[^\S\n]*:/m);
  if (start === -1) return new Set();
  // Kun til naeste noegle paa samme eller lavere indrykning.
  const rest = text.slice(start).split('\n').slice(1);
  const ids = new Set();
  for (const line of rest) {
    const item = /^[^\S\n]*-[^\S\n]*(GHSA-[\w-]+)/.exec(line);
    if (item) {
      ids.add(item[1]);
      continue;
    }
    if (/^[^\S\n]*#/.test(line) || line.trim() === '') continue;
    break; // en anden noegle — listen er slut
  }
  return ids;
}

/** @returns id'er der kun står ét af stederne, med hvilket. */
export function acceptDrift(tomlIds, yamlIds) {
  const only = (a, b, where) =>
    [...a].filter(id => !b.has(id)).map(id => ({ id, onlyIn: where }));
  return [...only(tomlIds, yamlIds, 'osv-scanner.toml'),
          ...only(yamlIds, tomlIds, 'pnpm-workspace.yaml')]
    .sort((x, y) => byName(x.id, y.id));
}
