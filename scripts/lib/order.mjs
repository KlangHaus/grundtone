/**
 * Deterministisk, locale-UAFHÆNGIG strengorden.
 *
 * 🔴 Ikke `localeCompare`, selvom Sonars S2871 foreslår den: den er
 * ICU-afhængig, så det samme input kan sortere forskelligt på forskellige
 * runnere. I en gate er DETERMINISME kravet, ikke menneske-alfabetisk
 * korrekthed — output skal kunne sammenlignes mellem kørsler. S2871 sigter
 * reelt mod tal-arrays, hvor default-`.sort()` er forkert (`[1, 10, 2]`).
 *
 * Egen fil, fordi den bruges af to gates og skal have ÉN definition.
 */
export function byName(a, b) {
  if (a < b) return -1;
  return a > b ? 1 : 0;
}
