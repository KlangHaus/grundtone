import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// ── Catalog shape ──────────────────────────────────────────────────────────
// The catalog is generated from the @grundtone/vue source (component prop
// interfaces + exports), the design-system colour defaults, and the pending
// changesets. It is the machine-readable API surface the MCP server serves so
// agents get accurate, version-locked knowledge without reading the repo.

export interface PropDoc {
  name: string;
  type: string;
  optional: boolean;
  description: string;
}

export interface ComponentDoc {
  /** Exported name, e.g. "GTDrawer". */
  name: string;
  /** atom | molecule. */
  kind: string;
  /** Import path, e.g. "@grundtone/vue". */
  importPath: string;
  /** One-line summary derived from the leading file/interface comment. */
  summary: string;
  props: PropDoc[];
}

export interface TokenGroup {
  category: string;
  tokens: Record<string, string>;
}

export interface ChangelogEntry {
  packages: string[];
  bump: string;
  summary: string;
}

export interface Catalog {
  generatedFrom: string;
  vueVersion: string;
  components: ComponentDoc[];
  tokens: TokenGroup[];
  changelog: ChangelogEntry[];
}

// ── Component extraction (TypeScript compiler API) ───────────────────────────

function jsDocText(node: ts.Node): string {
  const docs = (node as any).jsDoc as ts.JSDoc[] | undefined;
  const comment = docs?.[0]?.comment;
  if (!comment) return '';
  return typeof comment === 'string'
    ? comment.replace(/\s+/g, ' ').trim()
    : comment
        .map(c => c.text)
        .join('')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractProps(typesPath: string): {
  props: PropDoc[];
  summary: string;
} {
  if (!existsSync(typesPath)) return { props: [], summary: '' };
  const text = readFileSync(typesPath, 'utf8');
  const sf = ts.createSourceFile(typesPath, text, ts.ScriptTarget.Latest, true);
  const props: PropDoc[] = [];
  let summary = '';

  for (const stmt of sf.statements) {
    if (!ts.isInterfaceDeclaration(stmt)) continue;
    if (!stmt.name.text.endsWith('Props')) continue;
    if (!summary) summary = jsDocText(stmt);
    for (const member of stmt.members) {
      if (!ts.isPropertySignature(member) || !member.name) continue;
      props.push({
        name: member.name.getText(sf),
        type: member.type
          ? member.type.getText(sf).replace(/\s+/g, ' ')
          : 'unknown',
        optional: !!member.questionToken,
        description: jsDocText(member),
      });
    }
  }
  return { props, summary };
}

/**
 * ALLE komponenter en mappe eksporterer — ikke kun den første.
 *
 * 🔴 Målt 2026-08-23 ([backstage]s fund): `.match()` uden `/g` returnerer kun
 * første træf, og seks mapper eksporterer to komponenter hver — Accordion,
 * Carousel, Chart, SummaryList, Tabs, Toast. Kataloget tabte derfor
 * GTAccordionItem, GTCarouselSlide, GTChartLegend, GTSummaryItem, GTTabPanel og
 * GTToastContainer.
 *
 * **Fraværet så ud som "komponenten findes ikke" frem for "værktøjet så den
 * ikke".** Backstage konkluderede først, at grundtone intet masonry havde —
 * på en komponent, der lå i pakken, de havde installeret. Et opslags-værktøj,
 * der udelader, er værre end et der fejler: fejlen kan ses.
 *
 * Antagelsen bag fejlen var "én komponent pr. mappe", og den var aldrig sand.
 */
function extractExportNames(indexPath: string): string[] {
  if (!existsSync(indexPath)) return [];
  const text = readFileSync(indexPath, 'utf8');
  return [
    ...text.matchAll(/export\s*\{\s*default\s+as\s+(GT[A-Za-z0-9_]+)/g),
  ].map(m => m[1]);
}

function scanComponents(vueSrc: string, importPath: string): ComponentDoc[] {
  const out: ComponentDoc[] = [];
  for (const kind of ['atoms', 'molecules'] as const) {
    const dir = join(vueSrc, kind);
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const compDir = join(dir, entry.name);
      const names = extractExportNames(join(compDir, 'index.ts'));
      if (names.length === 0) continue; // not an exported component
      const { props, summary } = extractProps(join(compDir, 'types.ts'));
      // Props og summary er pr. MAPPE, ikke pr. komponent: en sekundaer
      // eksport deler types.ts med sin primaere. At liste den med delte props
      // er mindre forkert end at udelade den — fravaeret laeses som "findes
      // ikke", en delt beskrivelse laeses som en beskrivelse.
      for (const name of names) {
        out.push({ name, kind: kind.slice(0, -1), importPath, summary, props });
      }
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

// ── Token extraction (design-system colour defaults) ─────────────────────────

function extractScssMap(
  scssPath: string,
  mapName: string,
): Record<string, string> {
  const tokens: Record<string, string> = {};
  if (!existsSync(scssPath)) return tokens;
  const text = readFileSync(scssPath, 'utf8');
  const block = text.match(
    new RegExp(`\\$${mapName}\\s*:\\s*\\(([\\s\\S]*?)\\);`),
  );
  if (!block) return tokens;
  for (const line of block[1].split('\n')) {
    const m = line.match(/'([^']+)'\s*:\s*([^,]+),?/);
    if (m) tokens[m[1]] = m[2].trim();
  }
  return tokens;
}

function extractTokens(root: string): TokenGroup[] {
  const dsCore = join(root, 'packages/design-system/src/core');
  const groups: TokenGroup[] = [];
  const colors = extractScssMap(
    join(dsCore, '_color-defaults.scss'),
    'colors-light',
  );
  if (Object.keys(colors).length)
    groups.push({ category: 'colors', tokens: colors });
  return groups;
}

// ── Changesets ───────────────────────────────────────────────────────────────

function extractChangelog(root: string): ChangelogEntry[] {
  const dir = join(root, '.changeset');
  if (!existsSync(dir)) return [];
  const out: ChangelogEntry[] = [];
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md') || file.toUpperCase() === 'README.MD') continue;
    const text = readFileSync(join(dir, file), 'utf8');
    const fm = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fm) continue;
    const packages: string[] = [];
    let bump = '';
    for (const line of fm[1].split('\n')) {
      const m = line.match(/['"]([^'"]+)['"]\s*:\s*(\w+)/);
      if (m) {
        packages.push(m[1]);
        bump = m[2];
      }
    }
    out.push({ packages, bump, summary: fm[2].replace(/\s+/g, ' ').trim() });
  }
  return out;
}

// ── Build ────────────────────────────────────────────────────────────────────

export function buildCatalog(root: string): Catalog {
  const vueSrc = join(root, 'packages/vue/src');
  let vueVersion = 'unknown';
  try {
    vueVersion = JSON.parse(
      readFileSync(join(root, 'packages/vue/package.json'), 'utf8'),
    ).version;
  } catch {
    /* keep default */
  }
  return {
    generatedFrom: '@grundtone/vue source',
    vueVersion,
    components: scanComponents(vueSrc, '@grundtone/vue'),
    tokens: extractTokens(root),
    changelog: extractChangelog(root),
  };
}

// CLI: `node dist/catalog.js [root]` writes catalog.json next to dist/.
const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = process.argv[2] ?? join(here, '..', '..', '..');
  const catalog = buildCatalog(root);
  const outPath = join(here, '..', 'catalog.json');
  writeFileSync(outPath, JSON.stringify(catalog, null, 2));
  console.error(
    `catalog.json: ${catalog.components.length} components, ` +
      `${catalog.tokens.reduce((n, g) => n + Object.keys(g.tokens).length, 0)} tokens, ` +
      `${catalog.changelog.length} changelog entries (vue ${catalog.vueVersion})`,
  );
}
