#!/usr/bin/env node
/**
 * grundtone-mcp-server
 *
 * Serves a machine-readable catalog of the @grundtone/vue design system —
 * component APIs (props/types/docs), design tokens, and recent changes — so
 * agents building UIs across projects get accurate, version-locked knowledge
 * without reading the grundtone source. The catalog is generated from source
 * (see catalog.ts) at build time and read here at runtime.
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { buildCatalog, type Catalog, type ComponentDoc } from './catalog.js';

const CHARACTER_LIMIT = 25000;

// Prefer the pre-generated catalog (ships with the package, version-locked to
// the installed @grundtone/vue). Fall back to building live from a repo root
// (GRUNDTONE_ROOT) for local dev inside the monorepo.
function loadCatalog(): Catalog {
  const here = dirname(fileURLToPath(import.meta.url));
  const bundled = join(here, '..', 'catalog.json');
  if (existsSync(bundled)) {
    return JSON.parse(readFileSync(bundled, 'utf8')) as Catalog;
  }
  const root = process.env.GRUNDTONE_ROOT ?? join(here, '..', '..', '..');
  return buildCatalog(root);
}

const catalog = loadCatalog();
const byName = new Map(catalog.components.map(c => [c.name.toLowerCase(), c]));

function componentMarkdown(c: ComponentDoc): string {
  const lines = [
    `# ${c.name} (${c.kind})`,
    c.summary ? `\n${c.summary}` : '',
    `\n\`import { ${c.name} } from '${c.importPath}'\``,
    '\n## Props',
  ];
  if (!c.props.length) lines.push('_No documented props._');
  for (const p of c.props) {
    lines.push(
      `- **${p.name}**${p.optional ? '?' : ''}: \`${p.type}\`${p.description ? ` — ${p.description}` : ''}`,
    );
  }
  return lines.filter(Boolean).join('\n');
}

function capText(text: string): string {
  if (text.length <= CHARACTER_LIMIT) return text;
  return `${text.slice(0, CHARACTER_LIMIT)}\n\n…truncated. Narrow your query or request a specific component.`;
}

const server = new McpServer({
  name: 'grundtone-mcp-server',
  version: '0.1.0',
});

server.registerTool(
  'grundtone_list_components',
  {
    title: 'List Grundtone components',
    description:
      'List every @grundtone/vue component (atoms + molecules) with its kind and one-line summary. Use this first to discover what the design system offers before building UI, so you reuse existing components instead of reinventing them.',
    inputSchema: {},
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async () => {
    const output = {
      vueVersion: catalog.vueVersion,
      count: catalog.components.length,
      components: catalog.components.map(c => ({
        name: c.name,
        kind: c.kind,
        summary: c.summary,
      })),
    };
    const md = [
      `# Grundtone components (@grundtone/vue ${catalog.vueVersion}) — ${output.count}`,
      '',
      ...catalog.components.map(
        c => `- **${c.name}** (${c.kind})${c.summary ? ` — ${c.summary}` : ''}`,
      ),
    ].join('\n');
    return {
      content: [{ type: 'text', text: capText(md) }],
      structuredContent: output,
    };
  },
);

server.registerTool(
  'grundtone_get_component',
  {
    title: 'Get a Grundtone component API',
    description:
      'Return the full API of one @grundtone/vue component: every prop with its TypeScript type, optionality, and doc description, plus the import path. Use before writing markup so you pass correct prop names/types. Case-insensitive; accepts "GTButton" or "button".',
    inputSchema: {
      name: z
        .string()
        .min(1)
        .describe('Component name, e.g. "GTDrawer" or "drawer".'),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async ({ name }: { name: string }) => {
    const key = name.toLowerCase().startsWith('gt')
      ? name.toLowerCase()
      : `gt${name.toLowerCase()}`;
    const comp = byName.get(name.toLowerCase()) ?? byName.get(key);
    if (!comp) {
      const suggestions = catalog.components
        .filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
        .map(c => c.name);
      return {
        content: [
          {
            type: 'text',
            text: `No component named "${name}". ${suggestions.length ? `Did you mean: ${suggestions.join(', ')}?` : 'Use grundtone_list_components to see all.'}`,
          },
        ],
      };
    }
    return {
      content: [{ type: 'text', text: componentMarkdown(comp) }],
      structuredContent: { ...comp },
    };
  },
);

server.registerTool(
  'grundtone_search_components',
  {
    title: 'Search Grundtone components',
    description:
      'Find components by keyword matched against name, summary, and prop names — e.g. "modal", "overlay", "date", "nav". Use when you know the UI need but not the component name, so you pick an existing component over building a new one.',
    inputSchema: {
      query: z
        .string()
        .min(2)
        .describe('Keyword to match, e.g. "modal" or "sidebar".'),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async ({ query }: { query: string }) => {
    const q = query.toLowerCase();
    const hits = catalog.components.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.props.some(p => p.name.toLowerCase().includes(q)),
    );
    const output = {
      query,
      count: hits.length,
      components: hits.map(c => ({
        name: c.name,
        kind: c.kind,
        summary: c.summary,
      })),
    };
    const md = hits.length
      ? [
          `# Matches for "${query}" — ${hits.length}`,
          '',
          ...hits.map(
            c =>
              `- **${c.name}** (${c.kind})${c.summary ? ` — ${c.summary}` : ''}`,
          ),
        ].join('\n')
      : `No components match "${query}". Try a broader term or grundtone_list_components.`;
    return {
      content: [{ type: 'text', text: capText(md) }],
      structuredContent: output,
    };
  },
);

server.registerTool(
  'grundtone_list_tokens',
  {
    title: 'List Grundtone design tokens',
    description:
      'Return the design-system token values (light theme) by category — e.g. colours. Use these instead of hardcoding hex/spacing values; reference them as CSS vars (`var(--color-primary)`) or component props. Optionally filter to one category.',
    inputSchema: {
      category: z
        .string()
        .optional()
        .describe('Optional category filter, e.g. "colors".'),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async ({ category }: { category?: string }) => {
    const groups = category
      ? catalog.tokens.filter(g => g.category === category)
      : catalog.tokens;
    const output = { categories: groups.map(g => g.category), tokens: groups };
    const md = groups.length
      ? groups
          .map(g =>
            [
              `## ${g.category}`,
              ...Object.entries(g.tokens).map(
                ([k, v]) =>
                  `- \`${k}\`: ${v} (→ \`var(--${g.category === 'colors' ? 'color-' : ''}${k})\`)`,
              ),
            ].join('\n'),
          )
          .join('\n\n')
      : `No token category "${category ?? ''}". Available: ${catalog.tokens.map(g => g.category).join(', ') || '(none)'}.`;
    return {
      content: [{ type: 'text', text: capText(md) }],
      structuredContent: output,
    };
  },
);

server.registerTool(
  'grundtone_whats_new',
  {
    title: "What's new in Grundtone",
    description:
      'Return the pending changesets — new components, features, and breaking changes not yet released. Use to learn what changed recently (e.g. newly added components) before assuming the design system is unchanged.',
    inputSchema: {},
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async () => {
    const output = {
      count: catalog.changelog.length,
      entries: catalog.changelog,
    };
    const md = catalog.changelog.length
      ? [
          '# Pending changes',
          '',
          ...catalog.changelog.map(
            e => `- **${e.packages.join(', ')}** (${e.bump}): ${e.summary}`,
          ),
        ].join('\n')
      : 'No pending changesets.';
    return {
      content: [{ type: 'text', text: capText(md) }],
      structuredContent: output,
    };
  },
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(
    `grundtone-mcp-server running (vue ${catalog.vueVersion}, ${catalog.components.length} components)`,
  );
}

main().catch(error => {
  console.error('Server error:', error);
  process.exit(1);
});
