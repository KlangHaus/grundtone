import { execFileSync } from 'node:child_process';

/**
 * Slår op hvilken version der ligger på et dist-tag.
 *
 * 🔴 Hele pointen med filen er ÉN skelnen: "findes ikke" og "kunne ikke se
 * efter" må ikke ende samme sted.
 *
 * Den første udgave svarede tom streng ved enhver fejl, og kalderen læste tom
 * streng som "aldrig udgivet — intet at være bagud for". Et registry-udfald,
 * en rate limit eller en npm-CLI-fejl gjorde altså gaten GRØN præcis i det
 * tilfælde hvor den ikke havde målt noget. Og den samme kode er den hårde
 * gate i prerelease-next.yml, umiddelbart før et publish der ikke kan gøres
 * om (npm unpublish er 72 timer og frarådet).
 *
 * npm skelner selv, så vi kan også:
 *   · pakken findes ikke              → fejl med E404 → 'unpublished'
 *   · pakken findes, tagget gør ikke  → tom linje, exit 0 → 'unpublished'
 *   · alt andet                       → vi ved det ikke → KAST
 *
 * `run` er injicérbar, så den tredje gren kan testes uden et netværk der skal
 * gå ned på kommando.
 */
export function npmView(name, tag) {
  return execFileSync('npm', ['view', name, `dist-tags.${tag}`], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

export function lookupPublished(name, tag, run = npmView) {
  let stdout;
  try {
    stdout = run(name, tag);
  } catch (err) {
    const text = `${err?.stderr ?? ''}\n${err?.message ?? ''}`;
    if (/\bE404\b|404 Not Found/.test(text)) return { state: 'unpublished' };
    throw new Error(
      `Kunne ikke slå \`${name}\` op på npm — og et opslag der ikke lykkedes ` +
        `er IKKE det samme som en pakke der ikke findes.\n` +
        `Gaten fejler bevidst her frem for at lade et registry-udfald passere ` +
        `som "aldrig udgivet".\n\nnpm sagde:\n${text.trim()}`,
      { cause: err },
    );
  }

  const version = stdout.trim();
  return version ? { state: 'published', version } : { state: 'unpublished' };
}
