---
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
