---

## 1.0.1
### Patch Changes



- [`bf15400`](https://github.com/grundtone/grundtone/commit/bf15400cccba212c91fe41a378dde9d6aa9a158a) Thanks [@allanasp](https://github.com/allanasp)! - Redistribute color/theme documentation across sections.
  
  - Trim theme-configuration.md to concept only (semantic tokens, createTheme API, platform
    comparison)
  - Move web-specific theming (Vue, Nuxt, Plain Web, SCSS, breakpoints) to web/colors.md
  - Add "Changing the Default Colors (Self-Hosting)" section to theme-configuration
  - Add Self-Hosting feature card to landing page
  - Update sidebar label to "Colors & Theming"
- Updated dependencies [[`4279eed`](https://github.com/grundtone/grundtone/commit/4279eed1b1395ab676ad20a7e443ccdabab57c61), [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26), [`51ecd83`](https://github.com/grundtone/grundtone/commit/51ecd8308f5da2f9b161424b81dee9e7dcf3118f), [`43ad018`](https://github.com/grundtone/grundtone/commit/43ad018020e8c7a7156d1a99a323f156966feff9), [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26), [`cd4c165`](https://github.com/grundtone/grundtone/commit/cd4c1659c34d925d5744502f01b8d8eb97d128c0), [`6a885a9`](https://github.com/grundtone/grundtone/commit/6a885a9d0ac1a0ee15647529b9bc998db7b5863f), [`765408b`](https://github.com/grundtone/grundtone/commit/765408b1334d695924e10d4f476ac85be9ee9530), [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60), [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60), [`8e5f24b`](https://github.com/grundtone/grundtone/commit/8e5f24b04c6bf8807069caa8ebc941584f165c31), [`434dbb6`](https://github.com/grundtone/grundtone/commit/434dbb6db98a36b64448b1a6064b8c86cd2e39c5), [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60), [`995f630`](https://github.com/grundtone/grundtone/commit/995f63062cd9dbb030b148d6d9a5f8b6e026fd20), [`dc5c1df`](https://github.com/grundtone/grundtone/commit/dc5c1df068373bd455d2a857874f366f28aacb2a), [`73b3572`](https://github.com/grundtone/grundtone/commit/73b3572d4b278c7972213f8d6a6f0e98c8516c85), [`9df8418`](https://github.com/grundtone/grundtone/commit/9df8418fbc5f4ec9637d67ba823f4709d0e0f587), [`7ed86fa`](https://github.com/grundtone/grundtone/commit/7ed86facc17a308f5532ff235fad5d94a37b044c), [`27c611f`](https://github.com/grundtone/grundtone/commit/27c611f19752d39182178a4e44d8942c090a18e7), [`611ce6e`](https://github.com/grundtone/grundtone/commit/611ce6e80d8588fd3c525061a2bc74e1ff585389), [`b538711`](https://github.com/grundtone/grundtone/commit/b538711d025c26a6eaaf7f56e2abdb3e003def1c)]:
  - @grundtone/design-tokens@2.0.0
  - @grundtone/core@2.0.0
outline: [2, 3]
---

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

<div v-for="release in data.released" :key="release.version" class="changelog-release">

### {{ release.version }} <span v-if="release.date" class="release-date">{{ release.date }}</span>

<div v-html="renderMarkdown(release.content)" />

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
