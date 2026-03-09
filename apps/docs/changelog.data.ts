import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { resolve, basename } from 'path';

export interface ChangesetEntry {
  id: string;
  packages: { name: string; bump: string }[];
  summary: string;
}

export interface ChangelogRelease {
  version: string;
  date: string;
  content: string;
}

export interface ChangelogData {
  pending: ChangesetEntry[];
  released: ChangelogRelease[];
}

/** Parse a single .changeset/*.md file into structured data */
function parseChangeset(filepath: string): ChangesetEntry | null {
  const raw = readFileSync(filepath, 'utf-8');
  const id = basename(filepath, '.md');

  // Split on --- fences
  const parts = raw.split('---');
  if (parts.length < 3) return null;

  const frontmatter = parts[1].trim();
  const summary = parts.slice(2).join('---').trim();
  if (!summary) return null;

  // Parse YAML-like frontmatter: 'package': bump
  const packages: { name: string; bump: string }[] = [];
  for (const line of frontmatter.split('\n')) {
    const match = line.match(/^'([^']+)':\s*(major|minor|patch)/);
    if (match) {
      packages.push({ name: match[1], bump: match[2] });
    }
  }

  if (packages.length === 0) return null;
  return { id, packages, summary };
}

/** Parse a generated CHANGELOG.md into version sections */
function parseChangelog(filepath: string): ChangelogRelease[] {
  if (!existsSync(filepath)) return [];

  const raw = readFileSync(filepath, 'utf-8');
  const releases: ChangelogRelease[] = [];

  // Split on ## version headers
  const sections = raw.split(/^## /m).slice(1);
  for (const section of sections) {
    const lines = section.split('\n');
    const header = lines[0].trim();

    // Header format: "1.2.3" or "1.2.3 - 2026-01-29"
    const versionMatch = header.match(
      /^(\d+\.\d+\.\d+(?:-[^\s]+)?)\s*(?:-\s*(.+))?/,
    );
    if (!versionMatch) continue;

    releases.push({
      version: versionMatch[1],
      date: versionMatch[2]?.trim() || '',
      content: lines.slice(1).join('\n').trim(),
    });
  }

  return releases;
}

export default {
  watch: ['../../.changeset/*.md', '../../packages/*/CHANGELOG.md'],
  load(): ChangelogData {
    const root = resolve(__dirname, '../..');

    // 1. Pending changesets
    const changesetDir = resolve(root, '.changeset');
    const pending: ChangesetEntry[] = [];

    if (existsSync(changesetDir)) {
      const files = readdirSync(changesetDir)
        .filter(f => f.endsWith('.md') && f !== 'README.md')
        .sort((a, b) => {
          // Newest first by file modification time
          const mtimeA = statSync(resolve(changesetDir, a)).mtimeMs;
          const mtimeB = statSync(resolve(changesetDir, b)).mtimeMs;
          return mtimeB - mtimeA;
        });

      for (const file of files) {
        const entry = parseChangeset(resolve(changesetDir, file));
        if (entry) pending.push(entry);
      }
    }

    // 2. Released versions — read from design-system (primary package)
    const released = parseChangelog(
      resolve(root, 'packages/design-system/CHANGELOG.md'),
    );

    return { pending, released };
  },
};
