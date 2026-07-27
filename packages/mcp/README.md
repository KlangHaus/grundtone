# @grundtone/mcp

MCP server that gives agents **direct, version-locked knowledge of the Grundtone design system** —
component APIs, design tokens, and recent changes — so UI work across projects (studio, etude,
resonans, backstage) reuses the right components and tokens instead of guessing or reading the
source.

## Why

Building against a design system, an agent needs to know: which components exist, their exact
props/types, the token values, and what changed recently. This server serves a catalog **generated
from the `@grundtone/vue` source** (prop interfaces, exports, colour defaults, changesets), so it's
always accurate and matches the installed version.

## Tools

| Tool                          | Purpose                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| `grundtone_list_components`   | Every component + one-line summary (discover before building). |
| `grundtone_get_component`     | Full API of one component: props, types, docs, import path.    |
| `grundtone_search_components` | Find by keyword (name / summary / prop), e.g. "modal", "nav".  |
| `grundtone_list_tokens`       | Design-token values by category (colours).                     |
| `grundtone_whats_new`         | Pending changesets — new components, breaking changes.         |

## Build

```sh
pnpm --filter @grundtone/mcp build   # tsc → dist/, then generates catalog.json
```

`build` compiles `src/` and regenerates `catalog.json` from the monorepo source. The published
package ships `catalog.json`, version-locked to the `@grundtone/vue` it was built against.

## Use it from an agent (Claude Code / MCP client)

Add to the client's MCP config:

```jsonc
{
  "mcpServers": {
    "grundtone": { "command": "npx", "args": ["-y", "@grundtone/mcp"] },
  },
}
```

For local monorepo dev (build catalog live from a checkout instead of the bundled one), set
`GRUNDTONE_ROOT` to the repo root and run `pnpm --filter @grundtone/mcp dev`.

## How the catalog is generated

`src/catalog.ts` parses:

- `packages/vue/src/{atoms,molecules}/*/` — `index.ts` for the exported `GT*` name + `types.ts` for
  the `*Props` interface (via the TypeScript compiler API), keeping prop names, types, optionality,
  and JSDoc.
- `packages/design-system/src/core/_color-defaults.scss` — the light-theme colour map.
- `.changeset/*.md` — pending changes.

Regenerate whenever the design system changes (runs as part of `build`).
