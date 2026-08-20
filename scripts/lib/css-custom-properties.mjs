/**
 * Finder custom properties, der BRUGES uden at være DEFINERET og uden fallback.
 *
 * 🔴 Hvorfor uden fallback er den farlige form: `var(--findes-ikke, ease-in)`
 * virker fint — fallbacken træder til. `var(--findes-ikke)` er derimod
 * ugyldig ved computed-value time, og browseren smider **hele deklarationen**
 * væk. Deklarationen står stadig i den byggede CSS, så den ser rigtig ud i en
 * diff og i en søgning; den gør bare ingenting.
 *
 * Det er derfor målingen skal ske på den BYGGEDE CSS og ikke på kilden: kilden
 * fortæller, hvad nogen skrev, ikke hvad der endte med at være defineret.
 */
export function undefinedCustomProperties(css, { allow = [] } = {}) {
  const defined = new Set(
    [...css.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)].map(m => m[1]),
  );
  const allowed = new Set(allow);
  const counts = new Map();

  // Kun var(--x) UDEN komma. Har den fallback, er den gyldig CSS.
  for (const m of css.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)\s*\)/g)) {
    const name = m[1];
    if (defined.has(name) || allowed.has(name)) continue;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, occurrences]) => ({ name, occurrences }))
    .sort((a, b) => b.occurrences - a.occurrences || a.name.localeCompare(b.name));
}
