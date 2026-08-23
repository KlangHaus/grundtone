import { join } from 'node:path';

/**
 * Finder de pakker under packages/, som faktisk kan udgives.
 *
 * 🔴 Listen OPDAGES med vilje frem for at blive vedligeholdt. De to gange vi
 * er blevet ramt af versionsproblemer, var det pakker, der stod uden for en
 * håndholdt liste: react-native faldt ti versioner bagud, fordi den bevidst
 * var uden for `next`-kanalen, og "uden for den kanal" blev stiltiende læst
 * som "uden for versionskontrol overhovedet". En liste kan kun beskytte det,
 * nogen huskede at skrive på den.
 *
 * `private: true` er den eneste undtagelse, og den er selv-håndhævende: npm
 * nægter at udgive sådan en pakke, så gaten og virkeligheden kan ikke komme
 * ud af trit.
 */
export function publishablePackages(root, fs, { ignore = [] } = {}) {
  const ignored = new Set(ignore);
  const dir = join(root, 'packages');
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter(e => e.isDirectory())
    .map(e => {
      try {
        const pkg = JSON.parse(
          fs.readFileSync(join(dir, e.name, 'package.json'), 'utf8'),
        );
        if (pkg?.private === true || !pkg?.name || !pkg?.version) return null;
        // En pakke, changesets har faaet besked paa ALDRIG at versionere, er
        // ikke en del af en udgivelse — saa der er intet publish at beskytte
        // mod. Gaten spurgte foer: "kan nogen pakke i repoet gaa baglaens";
        // spoergsmaalet er "kan noget i DENNE udgivelse gaa baglaens".
        return ignored.has(pkg.name)
          ? { name: pkg.name, version: pkg.version, dir: e.name, ignored: true }
          : { name: pkg.name, version: pkg.version, dir: e.name };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Pakker som changesets har faaet besked paa aldrig at versionere.
 *
 * Laeses fra changesets' EGEN config frem for en liste her: to lister over det
 * samme kan blive uenige, og uenigheden ville foerst vise sig ved en udgivelse.
 */
export function changesetIgnored(root, fs) {
  try {
    const cfg = JSON.parse(
      fs.readFileSync(join(root, '.changeset', 'config.json'), 'utf8'),
    );
    return Array.isArray(cfg?.ignore) ? cfg.ignore : [];
  } catch {
    return [];
  }
}
