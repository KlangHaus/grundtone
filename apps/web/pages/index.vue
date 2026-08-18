<script setup lang="ts">
  // grundtone.com — OSS home (Sentry model: OSS IS the identity).
  // Rebuilt 2026-08-04 from [designer]'s approved forlæg
  // (docs/design/grundtone/prototypes/landing-page-v2.html, verified by
  // cmo+grundtone+jura) on Allan's direct order. English is canonical copy
  // (cmo brief §"Engelsk hero-copy", 46b3447).
  //
  // The hero is the REAL GTHero (#128). The theme switcher is the REAL
  // mechanism: createTheme() resolves partial sets over defaults exactly like
  // published CDN tokens do, and applyThemeToDOM() re-themes the whole page —
  // this page doesn't demo the product, it runs it.
  import { createTheme, type Theme } from '@grundtone/core';
  import { applyThemeToDOM } from '@grundtone/vue';

  useHead({
    title: 'grundtone — change your brand in one place, see it live everywhere',
  });

  // ── Whole-page theme switcher ([klanghaus-ideas] #1) ──────────────────────
  // Only REAL palettes get a pill. "KlangHaus Blog" is the published v2 set
  // (docs/design/klanghaus-blog/grundtone-tokens.json — live on CDN, consumed
  // by the running blog). Studio/Etude/Resonans deliberately have NO pill:
  // they are neutral-by-design and inherit grundtone verbatim, so a switch
  // would show nothing (cmo brand-afklaring 33b73bd). Future pills must be
  // "real AND demonstrably different" — diversity over count.
  const stock = createTheme({});
  const blog = createTheme({
    light: {
      primary: '#e94560',
      primaryLight: '#f27a8c',
      primaryDark: '#cf2f49',
      onPrimary: '#ffffff',
      secondary: '#c4a35a',
      warning: '#e0a800',
      info: '#4dabf7',
      background: '#fbfaf8',
      surface: '#f4f2ee',
      surfaceRaised: '#ffffff',
      text: '#1a1a2e',
      textSecondary: '#6b6b78',
      textTertiary: '#70707d',
    },
  });

  type ThemeKey = 'light' | 'dark' | 'blog';
  const themes: Record<ThemeKey, { label: string; theme: Theme }> = {
    light: { label: 'grundtone light', theme: stock.light },
    dark: { label: 'grundtone dark', theme: stock.dark },
    blog: { label: 'KlangHaus Blog', theme: blog.light },
  };

  const activeTheme = ref<ThemeKey>('light');
  const switchCount = ref(0);
  const lastSwitch = ref('00:00:00');

  const activePrimary = computed(
    () => themes[activeTheme.value].theme.colors.primary,
  );

  function selectTheme(key: ThemeKey) {
    activeTheme.value = key;
    applyThemeToDOM(themes[key].theme);
    switchCount.value++;
    lastSwitch.value = new Date().toTimeString().slice(0, 8);
  }

  // ── Framework showcase ────────────────────────────────────────────────────
  const activeTab = ref('vue');
  const showcaseTabs = [
    { id: 'vue', label: 'Vue/Nuxt' },
    { id: 'react-native', label: 'React Native (experimental)' },
    { id: 'email', label: 'Email' },
  ];

  const snippets: Record<string, string> = {
    vue: `<script setup>
  import { GTButton } from '@grundtone/vue';
${'<'}/script>

<template>
  <!-- Follows theme.primary — live, no rebuild -->
  <GTButton variant="primary">Buy ticket</GTButton>
</template>`,
    'react-native': `import { GTButton } from '@grundtone/react-native';

// Same token set, native styling — experimental
export const Checkout = () => (
  <GTButton variant="primary">Buy ticket</GTButton>
);`,
    email: `import { createBlocks, resolveEmailTheme } from '@grundtone/email';

// Same tokens — compiled to bulletproof inlined HTML
const b = createBlocks(resolveEmailTheme());
b.button({ label: 'Buy ticket', href: '{{url}}' });`,
  };

  // ── Rollback micro-demo ([klanghaus-ideas] #4) ───────────────────────────
  const rolledBack = ref(false);
</script>

<template>
  <div>
    <GTHero title="" background="dot-grid" align="center">
      <template #eyebrow>
        <GTBadge variant="neutral">MIT license</GTBadge>
        <GTBadge variant="neutral">npm · @grundtone/vue</GTBadge>
        <!-- "40+" i stedet for et eksakt tal: 48 var sandt da forlægget blev målt,
             50 da PR-reviewet blev kørt — eksakte tal drifter for hver release.
             Eksakt build-genereret tal kræver `import *` af hele pakken (dræber
             tree-shaking på en statisk side). cmo kan overstyre formen. -->
        <GTBadge variant="success" dot>40+ components</GTBadge>
      </template>
      <template #title>
        Change your brand <mark>in one place</mark>.<br />
        See it live everywhere — no rebuild.
      </template>
      <template #subtitle>
        Open source design system, Vue/Nuxt-first. The same tokens also theme
        your email templates — React Native support is experimental.
        Token-native. Framework-agnostic.
      </template>
      <template #actions>
        <GTButton
          as="a"
          href="https://github.com/KlangHaus/grundtone"
          variant="primary"
          size="lg"
        >
          View on GitHub →
        </GTButton>
        <GTButton
          as="a"
          href="https://docs.grundtone.com"
          variant="outlined"
          size="lg"
        >
          Read the docs
        </GTButton>
      </template>
      <template #visual>
        <div class="themesw">
          <div
            class="themesw__row"
            role="group"
            aria-label="Switch brand theme"
          >
            <button
              v-for="(entry, key) in themes"
              :key="key"
              type="button"
              class="themesw__pill"
              :class="{ 'themesw__pill--on': activeTheme === key }"
              @click="selectTheme(key as ThemeKey)"
            >
              {{ entry.label }}
            </button>
            <button
              type="button"
              class="themesw__pill themesw__pill--soon"
              disabled
              title="Awaiting a published token set — a per-tenant brand SHOULD look different, that's the point"
            >
              explainers (tenant) · coming soon
            </button>
            <button
              type="button"
              class="themesw__pill themesw__pill--soon"
              disabled
              title="Awaiting a published token set — its own per-product theme"
            >
              Backstage · coming soon
            </button>
          </div>
          <div class="themesw__status" aria-live="polite">
            themed {{ lastSwitch }} · 0 builds · 0 deploys · switch #{{
              switchCount
            }}
          </div>
          <p class="themesw__caption">
            The whole page — header, buttons, badges, cards, code block — reads
            from <code>applyThemeToDOM()</code>. This isn't a demo of the
            mechanism. It IS the mechanism.
          </p>
        </div>
      </template>
    </GTHero>

    <section class="section" aria-labelledby="showcase-heading">
      <p class="section__eyebrow">One source, every surface</p>
      <h2 id="showcase-heading">Does it work in my stack?</h2>
      <p class="section__lead">
        One token set. Change one value — everything updates, no rebuild.
      </p>
      <div class="showcase">
        <pre
          class="showcase__tokens"
        ><code>import { applyThemeToDOM } from '@grundtone/vue';

applyThemeToDOM(theme.{{ activeTheme }});
// ← one call. No rebuild, no deploy.
// active primary: {{ activePrimary }}</code></pre>
        <div class="showcase__frameworks">
          <GTTabs
            v-model="activeTab"
            :tabs="showcaseTabs"
            variant="underline"
            aria-label="Framework examples"
          >
            <GTTabPanel v-for="tab in showcaseTabs" :id="tab.id" :key="tab.id">
              <pre><code>{{ snippets[tab.id] }}</code></pre>
            </GTTabPanel>
          </GTTabs>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="why-heading">
      <p class="section__eyebrow">What makes grundtone different</p>
      <h2 id="why-heading">What do I get?</h2>
      <div class="cards">
        <GTCard title="Runtime tokens, not build-time">
          Publish a token set via CDN (versioned, immutable paths) and running
          apps update without a new deploy. shadcn/Radix/Chakra can't do that.
        </GTCard>
        <GTCard title="One chain, designer to prod">
          Non-developers edit tokens visually in Studio; developers consume via
          SDK/CDN. shadcn is copy-paste for developers — this is an end-to-end
          chain.
        </GTCard>
        <GTCard title="Self-hosted, EU-first">
          Fonts are always self-hosted — never a Google Fonts CDN.
          Infrastructure in the EU. A real difference after the Fashion-ID
          ruling, not just a checkbox.
        </GTCard>
        <GTCard title="Accessibility built in">
          Focus management, roving tabindex and screen-reader attributes as
          shared utilities across the components — not patched on afterwards.
        </GTCard>
      </div>
    </section>

    <section class="section" aria-labelledby="tokenarch-heading">
      <p class="section__eyebrow">Token architecture</p>
      <h2 id="tokenarch-heading">Three things nobody else has</h2>
      <div class="cards">
        <GTCard title="Font licensing with an audit trail">
          Curated OFL fonts self-hosted, or your own — with a license
          attestation per file. We can document WHO vouched for the license.
        </GTCard>
        <GTCard title="Light/dark per project">
          Both theme sets publish together and switch at runtime — no bespoke
          media-query hacks.
        </GTCard>
        <GTCard title="Rollback is moving a pointer">
          Every publish is an immutable version — <code>current</code> points at
          the active one. Undo a brand by moving the pointer, not by
          re-deploying.
          <div class="rollback">
            <code class="rollback__state">
              current → {{ rolledBack ? 'v2' : 'v3' }}
            </code>
            <button
              type="button"
              class="themesw__pill"
              @click="rolledBack = !rolledBack"
            >
              {{ rolledBack ? 'Undo, back to v3 →' : 'Roll back to v2 →' }}
            </button>
          </div>
        </GTCard>
      </div>
    </section>

    <section class="section section--pricing" aria-labelledby="pricing-heading">
      <p class="section__eyebrow">Pricing principle</p>
      <h2 id="pricing-heading">Pricing</h2>
      <div class="pricing-oss">
        <GTBadge variant="success" dot ariaLabel="Free" />
        <span>
          <strong>grundtone open source is 100% free, forever</strong> — MIT
          license, no credit card. Studio (the optional no-code layer) has its
          own tiers.
        </span>
      </div>
      <p class="section__statement">
        We price <em>per active brand</em> — not per user, not per seat.
      </p>
      <div class="tierrow">
        <GTTag label="Free" />
        <GTTag label="Solo" />
        <GTTag label="Studio" />
        <GTTag label="Scale" />
        <GTTag label="Enterprise" />
      </div>
      <p class="pricing-link">
        5 tiers, all priced per brand.
        <a href="https://studio.grundtone.com/plans">See current pricing →</a>
        <span class="pricing-link__note"
          >(that page governs — not this one)</span
        >
      </p>
    </section>

    <section class="section" aria-labelledby="proof-heading">
      <p class="section__eyebrow">In production</p>
      <h2 id="proof-heading">Who uses it?</h2>
      <p class="section__lead">
        Built and battle-tested in production by KlangHaus — across Backstage,
        Etude, Studio and transactional email. Not many logos yet.
      </p>
      <div class="logostrip">
        <span>Studio</span><span>Etude</span><span>Backstage</span>
        <span>Resonans</span><span>mdHaus</span>
      </div>
    </section>
  </div>
</template>
