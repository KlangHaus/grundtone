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

/**
 * Alle pakkenavne i workspacet — bade `packages/` og `apps/`.
 *
 * Bruges til at bevise, at hvert navn i changesets' `ignore` faktisk PEGER paa
 * noget. En tastefejl dér er ikke harmloes: gaten ville blive strengere (den
 * ignorerer intet og fejler larmende), men CHANGESETS ville versionere pakken
 * alligevel — og saa udgiver vi netop det, undtagelsen skulle holde ude. Fejlen
 * er altsaa usynlig i den ene retning og farlig i den anden.
 */
/** Pakkenavnet i en mappe, eller null hvis den ikke har en laesbar manifest. */
function packageNameIn(dir, fs) {
  try {
    return (
      JSON.parse(fs.readFileSync(join(dir, 'package.json'), 'utf8'))?.name ??
      null
    );
  } catch {
    return null;
  }
}

/** Mapper direkte under `area`, eller tom liste hvis den ikke findes. */
function subdirectories(root, area, fs) {
  try {
    return fs
      .readdirSync(join(root, area), { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => join(root, area, e.name));
  } catch {
    return [];
  }
}

export function workspacePackageNames(root, fs) {
  const names = new Set();
  for (const area of ['packages', 'apps']) {
    for (const dir of subdirectories(root, area, fs)) {
      // Ét niveau dybere ogsaa: apps/playground/<x> ligger der.
      for (const candidate of [dir, ...subdirectories(dir, '', fs)]) {
        const name = packageNameIn(candidate, fs);
        if (name) names.add(name);
      }
    }
  }
  return names;
}
