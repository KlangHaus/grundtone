# @haspen/components

Vue 3 komponenter for HäspenUI designsystemet, bygget med Atomic Design principper.

## Installation

```bash
npm install @haspen/components
# eller
yarn add @haspen/components
# eller
pnpm add @haspen/components
```

## Brug

```vue
<template>
  <Button variant="primary" size="md"> Click me </Button>
</template>

<script setup>
  import { Button } from '@haspen/components';
</script>
```

## Atomic Design Struktur

Komponenterne er organiseret efter Atomic Design principper:

### Atoms

Grundlæggende byggeblokke som:

- Button
- Input
- Icon
- Typography

### Molecules

Kombinationer af atomer som:

- InputGroup
- FormField
- Card
- Alert

### Organisms

Komplekse UI-komponenter som:

- Header
- Footer
- Modal
- Navigation

### Templates

Sidelayout-strukturer og skabeloner:

- DefaultLayout
- AuthLayout
- DashboardLayout

### Pages

Komplette sideskabeloner:

- HomePage
- LoginPage
- DashboardPage

## Udvikling

1. Installer dependencies:

```bash
pnpm install
```

2. Start udviklingsserver:

```bash
pnpm dev
```

3. Byg pakken:

```bash
pnpm build
```

## Konventioner

### Komponentstruktur

Hver komponent skal følge denne struktur:

```
ComponentName/
  ├── ComponentName.vue    # Komponent-implementation
  ├── ComponentName.scss   # Styling
  ├── index.ts            # Export
  └── ComponentName.test.ts # Tests
```

### SCSS Konventioner

- Brug BEM metodologi
- Hold styling i separate SCSS-filer
- Brug CSS variabler fra @haspen/core

### TypeScript

- Brug TypeScript for alle komponenter
- Definer props interfaces
- Eksporter typer når nødvendigt

## TypeScript-konfiguration

Denne pakke bruger en specifik `tsconfig.json`, som udvider rodens `tsconfig.build.json`.
Konfigurationen er tilpasset til Vue 3 og understøtter:

- outDir: `dist`
- rootDir: `src`
- Types genereres automatisk ved build
- JSX support (`jsx: preserve`, `jsxImportSource: vue`)
- Vue template compiler options

Dette sikrer korrekt typesætning og udvikling med både SFC og JSX i Vue 3.

Byg pakken med:

```sh
pnpm build
```

## Licens

MIT
