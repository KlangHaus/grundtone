# @haspen/composables

Vue 3 composables for HäspenUI designsystemet. En samling af genbrugelige kompositionsfunktioner
bygget med Vue Composition API.

## Installation

```bash
npm install @haspen/composables
# eller
yarn add @haspen/composables
# eller
pnpm add @haspen/composables
```

## Brug

```vue
<template>
  <div>
    <button @click="toggle">
      {{ isOpen ? 'Luk' : 'Åbn' }}
    </button>
    <div v-if="isOpen">Indhold</div>
  </div>
</template>

<script setup lang="ts">
  import { useToggle } from '@haspen/composables';

  const { isOpen, toggle } = useToggle();
</script>
```

## Tilgængelige Composables

### useToggle

En simpel toggle-funktion til at håndtere boolean tilstande.

```typescript
interface UseToggleOptions {
  initialValue?: boolean;
}

interface UseToggleReturn {
  isOpen: Readonly<boolean>;
  toggle: () => void;
  open: () => void;
  close: () => void;
}
```

#### Eksempel

```typescript
const { isOpen, toggle, open, close } = useToggle({ initialValue: false });
```

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

### Navngivning

- Brug `use` prefix for alle composables
- Brug camelCase for funktionsnavne
- Brug PascalCase for interface navne

### TypeScript

- Definer interfaces for options og return værdier
- Eksporter typer når de kan være nyttige for brugeren
- Brug generics når det giver mening

### Testing

- Skriv tests for alle composables
- Test edge cases og fejlhåndtering
- Brug Vitest for testing

### Dokumentation

- Dokumenter alle parametre og return værdier
- Inkluder brugseksempler
- Beskriv eventuelle begrænsninger eller kendte problemer

## Licens

MIT

## TypeScript-konfiguration

Denne pakke bruger en specifik `tsconfig.json`, som udvider rodens `tsconfig.build.json`.
Konfigurationen sikrer at kildekoden i `src/` og types i `types/` bliver korrekt transpileret og at
types genereres i `dist/types`.

- outDir: `dist`
- rootDir: `src`
- Types genereres automatisk ved build

Byg pakken med:

```sh
pnpm build
```
