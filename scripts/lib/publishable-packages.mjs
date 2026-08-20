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
export function publishablePackages(root, fs) {
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
        return pkg?.private === true || !pkg?.name || !pkg?.version
          ? null
          : { name: pkg.name, version: pkg.version, dir: e.name };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}
