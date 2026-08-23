import { byName } from './order.mjs';

/**
 * Finder environments, som en workflow refererer, men som ikke beskytter noget.
 *
 * 🔴 Målt 2026-08-23 i grundtone-studio: `build.yml` erklærer `environment:` på
 * to jobs, og begge environments har `protection_rules: []`. Et environment
 * uden regler venter ikke på nogen — deployment koerer igennem med det samme.
 *
 * **Nøglen i workflowen ser ud som en gate og er det ikke.** Den bliver
 * derefter refereret som et værn i beslutninger og statusmeldinger, og ingen
 * opdager forskellen, fordi den eneste forskel er en tom liste i et
 * API-svar, ingen kigger i.
 *
 * Samme klasse som et rødt check der ikke er required: noget der ligner en
 * blokering uden at blokere.
 */

/** Environment-navne en workflow-tekst refererer. */
export function referencedEnvironments(workflow) {
  const names = new Set();
  // 🔴 `[^\S\n]` og ikke `\s`: `\s` matcher OGSAA newline, saa
  // `environment:\n  name: staging` blev fanget som vaerdien "name: staging".
  // Fanget af den positive kontrol mod studios workflow — en parser der kun
  // proeves mod input uden traeffere, er ikke proevet.
  for (const m of workflow.matchAll(/^[^\S\n]*environment:[^\S\n]*(.+)$/gm)) {
    const value = m[1].trim();
    // `environment: name` — den korte form. Objektformen har navnet paa
    // naeste linje som `name: x`.
    if (value && !value.startsWith('#')) {
      names.add(value.replace(/^['"]|['"]$/g, ''));
    }
  }
  for (const m of workflow.matchAll(
    /^[^\S\n]*environment:[^\S\n]*\n[^\S\n]*name:[^\S\n]*(.+)$/gm,
  )) {
    names.add(m[1].trim().replace(/^['"]|['"]$/g, ''));
  }
  return names;
}

/**
 * @param {Map<string, Array>} protectionByName environment -> protection_rules
 * @returns liste over referencer der ikke beskytter noget. Et environment vi
 *   ikke kunne slaa op ender HER, ikke i "ok": vi kan ikke se at det gater, og
 *   fravaer af svar maa ikke laese som bekraeftelse.
 */
export function unprotectedReferences(referenced, protectionByName) {
  return [...referenced]
    .map(name => {
      if (!protectionByName.has(name)) {
        return { name, reason: 'kunne ikke slås op' };
      }
      const rules = protectionByName.get(name);
      return rules.length === 0
        ? { name, reason: 'protection_rules er tom — venter ikke på nogen' }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => byName(a.name, b.name));
}
