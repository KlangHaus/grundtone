# App Shell

Application layout with a persistent sidebar, a top bar and a main content region. Below a breakpoint the sidebar moves into a modal drawer behind a menu button.

---

## Demo

<AppShellDemo />

---

## When to use

- The outer frame of an application (dashboard, admin, studio) with primary navigation in a sidebar
- When the sidebar should collapse to an icon rail on desktop and become a drawer on mobile

## When not to use

- Marketing or content pages with top navigation only
- A temporary side panel inside a page — use [Drawer](/vue/drawer) instead

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<template>
  <GTAppShell nav-label="Main navigation">
    <template #sidebar>
      <a href="/">Dashboard</a>
      <a href="/projects">Projects</a>
    </template>

    <template #topbar>
      <strong>My app</strong>
    </template>

    <h1>Dashboard</h1>
  </GTAppShell>
</template>
```

### Collapsible sidebar

The sidebar slot receives `collapsed` and `toggleCollapsed`. Persist the user's choice in the parent and seed `v-model:collapsed` from it.

```vue
<script setup>
  import { ref } from 'vue';
  const collapsed = ref(false);
</script>

<template>
  <GTAppShell v-model:collapsed="collapsed">
    <template #sidebar="{ collapsed, toggleCollapsed }">
      <button type="button" @click="toggleCollapsed">
        {{ collapsed ? 'Expand' : 'Collapse' }}
      </button>
      <a href="/">{{ collapsed ? 'D' : 'Dashboard' }}</a>
    </template>

    <h1>Dashboard</h1>
  </GTAppShell>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sidebarWidth` | `string` | `'16rem'` | Sidebar inline size when expanded |
| `railWidth` | `string` | `'4rem'` | Sidebar inline size when collapsed to an icon rail |
| `collapsed` | `boolean` | `false` | Collapsed ↔ expanded (`v-model:collapsed`). Applies only at or above `breakpoint` |
| `breakpoint` | `string` | `'48rem'` | Max-width below which the sidebar becomes a drawer |
| `navLabel` | `string` | `'Hovednavigation'` | Accessible name for the sidebar `<nav>` and the mobile drawer |
| `mainId` | `string` | `'main'` | `id` of the `<main>` region — the skip-link target |
| `toasts` | `boolean` | `true` | Render a shared [Toast](/vue/toast) container inside the shell |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:collapsed` | `boolean` | Emitted when the sidebar slot calls `toggleCollapsed` |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `sidebar` | `{ collapsed, toggleCollapsed }` | Navigation content. The same slot renders in the sidebar and in the mobile drawer (where `collapsed` is always `false`) |
| `topbar` | — | Content of the top bar, after the mobile menu button |
| `default` | — | Page content, rendered inside `<main>` |

---

## Accessibility

- A [Skip Link](/vue/skip-link) to `#mainId` is rendered first
- The sidebar is a `<nav>` landmark named by `navLabel`; on mobile the drawer wraps the same `<nav>`, so the landmark is kept
- The mobile menu button carries `aria-expanded` and `aria-controls`
- The server renders the desktop layout; the client switches to the mobile layout on mount, which avoids a hydration mismatch
