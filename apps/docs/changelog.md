---

## 1.0.18
### Patch Changes

- Updated dependencies [7e77c0b]
  - @grundtone/design-system@2.14.0
  - @grundtone/vue@2.14.0
outline: [2, 3]
---

## 1.0.17

### Patch Changes

- Updated dependencies [dbd9c2c]
  - @grundtone/design-system@2.13.0
  - @grundtone/vue@2.13.0

## 1.0.16

### Patch Changes

- Updated dependencies
  [[`fc456bf`](https://github.com/grundtone/grundtone/commit/fc456bfc25e1263f3fc19140f8108698072c269d)]:
  - @grundtone/design-system@2.12.0
  - @grundtone/vue@2.12.0
  - @grundtone/utils@2.12.0
  - @grundtone/icons@2.2.0

## 1.0.15

### Patch Changes

- Updated dependencies
  [[`c37762e`](https://github.com/grundtone/grundtone/commit/c37762e4ae7944dffc13d04de43a5b0ba83fcf32)]:
  - @grundtone/design-system@2.11.0
  - @grundtone/vue@2.11.0

## 1.0.14

### Patch Changes

- Updated dependencies
  [[`200846b`](https://github.com/grundtone/grundtone/commit/200846b19a450ca48fc97919cf858989483c4318)]:
  - @grundtone/design-system@2.10.0
  - @grundtone/vue@2.10.0

## 1.0.13

### Patch Changes

- Updated dependencies
  [[`009ab18`](https://github.com/grundtone/grundtone/commit/009ab18cbff1652f5b42665bfcc7bc37a4e310b7)]:
  - @grundtone/vue@2.9.1
  - @grundtone/icons@2.1.2

## 1.0.12

### Patch Changes

- Updated dependencies
  [[`efee6cf`](https://github.com/grundtone/grundtone/commit/efee6cfe57c2ec6f038bd2ddc7bd7004a71e2a67)]:
  - @grundtone/design-system@2.9.0
  - @grundtone/vue@2.9.0
  - @grundtone/icons@2.1.1

## 1.0.11

### Patch Changes

- Updated dependencies
  [[`ccb6a4e`](https://github.com/grundtone/grundtone/commit/ccb6a4e5833b18115cf520ef625c802ed55c42ba),
  [`8fc757a`](https://github.com/grundtone/grundtone/commit/8fc757a37e5cb862f4d6c48b8a1271088535ff6d),
  [`9cf5217`](https://github.com/grundtone/grundtone/commit/9cf52174c298cab51259a2ca948523eef26a1516)]:
  - @grundtone/design-system@2.8.0
  - @grundtone/vue@2.8.0
  - @grundtone/utils@2.8.0 outline: [2, 3]

---

## 1.0.10

### Patch Changes

- Updated dependencies
  [[`f41cfa6`](https://github.com/grundtone/grundtone/commit/f41cfa697d66f842719621865c8ddafe96cf3b25)]:
  - @grundtone/design-system@2.7.1

## 1.0.9

### Patch Changes

- Updated dependencies
  [[`98a30f3`](https://github.com/grundtone/grundtone/commit/98a30f3c7786ac7425b5249740cb22e351874f16)]:
  - @grundtone/design-system@2.7.0

## 1.0.8

### Patch Changes

- Updated dependencies
  [[`fd7b9e7`](https://github.com/grundtone/grundtone/commit/fd7b9e736af8c3b2964a8bb9089c55583c18f1ae)]:
  - @grundtone/design-system@2.6.1

<script setup>
import { data } from './changelog.data'

const bumpColor = {
  major: '#dc3545',
  minor: '#198754',
  patch: '#6c757d',
}

const bumpLabel = {
  major: 'Major',
  minor: 'Minor',
  patch: 'Patch',
}

function renderMarkdown(text) {
  return text
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n{2,}/g, '<br><br>')
}
</script>

# Changelog

All notable changes to Grundtone are documented here. This page is generated automatically from
[changesets](https://github.com/changesets/changesets).

---

<div v-if="data.pending.length">

## Unreleased

Changes that are merged and will be included in the next version.

<div v-for="entry in data.pending" :key="entry.id" class="changeset-entry">

<div class="changeset-badges">
  <span
    v-for="pkg in entry.packages"
    :key="pkg.name"
    class="changeset-badge"
    :style="{ '--badge-color': bumpColor[pkg.bump] }"
  >
    {{ pkg.bump }}
  </span>
</div>

<div class="changeset-summary" v-html="renderMarkdown(entry.summary)" />

<details class="changeset-packages">
  <summary>Affected packages</summary>
  <ul>
    <li v-for="pkg in entry.packages" :key="pkg.name">
      <code>{{ pkg.name }}</code>
      <span class="changeset-bump" :style="{ color: bumpColor[pkg.bump] }">{{ bumpLabel[pkg.bump] }}</span>
    </li>
  </ul>
</details>

</div>

</div>

<div v-if="data.released.length">

## Released

<div v-for="(release, i) in data.released" :key="release.version" class="changelog-release">

<details :open="i === 0 || undefined" class="details details--card">
  <summary class="details__summary">
    <span class="details__arrow" aria-hidden="true"></span>
    <strong>{{ release.version }}</strong>
    <span v-if="release.date" class="release-date">{{ release.date }}</span>
  </summary>
  <div class="details__content">
    <div class="details__body" v-html="renderMarkdown(release.content)" />
  </div>
</details>

</div>

</div>

<div v-if="!data.pending.length && !data.released.length" class="changelog-empty">

_No changes recorded yet._

</div>

<style>
.changeset-entry {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.changeset-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.changeset-badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 4px;
  color: white;
  background: var(--badge-color);
}

.changeset-summary {
  font-size: 0.9375rem;
  line-height: 1.6;
}

.changeset-summary h4 {
  margin: 0.75rem 0 0.25rem;
  font-size: 0.9375rem;
}

.changeset-summary ul {
  margin: 0.25rem 0;
  padding-left: 1.25rem;
}

.changeset-summary li {
  margin: 0.125rem 0;
}

.changeset-summary code {
  font-size: 0.8125rem;
  padding: 0.125rem 0.375rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
}

.changeset-packages {
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.changeset-packages summary {
  cursor: pointer;
}

.changeset-packages ul {
  margin: 0.25rem 0;
  padding-left: 1.25rem;
}

.changeset-packages li {
  margin: 0.125rem 0;
}

.changeset-bump {
  margin-left: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.changelog-release {
  margin: 1.5rem 0;
}

.release-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-weight: 400;
}

.changelog-empty {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
