<script setup lang="ts">
  import type { NuxtError } from '#app';

  // The page Nuxt renders when a route fails — and, on this prerendered site,
  // the page that BECOMES `404.html` at build time.
  //
  // 🔴 WHY THIS FILE EXISTS (riff KH-916, measured by [infra] 2026-09-11).
  // apps/web had neither `error.vue` nor `plugins/`. Measured on the generated
  // output before this file was added: `.output/public/404.html` was 2488 bytes
  // whose only visible text was the document title — an empty `<div id="__nuxt">`
  // shell. A visitor who mistyped a path got a blank page.
  //
  // 🔴 A STATIC SITE HAS NO SERVER TO RENDER AN ERROR. `nuxi generate` renders
  // this component once and writes it to 404.html; Bunny serves that file for an
  // unknown path. So the acceptance criterion is a property of the BUILD OUTPUT,
  // not of a running server, and scripts/lib/error-page.mjs asserts it there.
  const props = defineProps<{ error: NuxtError }>();

  const statusCode = computed(() => Number(props.error?.statusCode) || 404);

  // English, because the site's global lang is `en` (nuxt.config) and only
  // /studio overrides it. GTErrorPage's own defaults are Danish, so the copy is
  // passed explicitly rather than inherited — inheriting would render Danish
  // text under an `en` document, which is the exact mismatch /studio's
  // `htmlAttrs.lang` exists to avoid.
  const COPY: Record<number, { title: string; description: string }> = {
    404: {
      title: 'This page is off the staff',
      description:
        'The page you asked for does not exist. It may have moved, or the address may be mistyped.',
    },
    500: {
      title: 'Something went out of tune',
      description:
        'An unexpected error occurred while loading this page. Try again in a moment.',
    },
  };

  const copy = computed(
    () =>
      COPY[statusCode.value] ?? {
        title: 'Something went out of tune',
        description:
          'An unexpected error occurred while loading this page. Try again in a moment.',
      },
  );

  // 🔴 NEVER IN THE PRERENDERED HTML. `debug` renders the url, status, message
  // and stack. This component is rendered at BUILD time and the result is a
  // public static file, so anything passed here would be served to every
  // visitor forever, not shown to one developer. import.meta.dev is false
  // during `nuxi generate`, which is what makes this safe — and it is spelled
  // out because the prop's own doc comment says "only render in dev", and on a
  // prerendered site "dev" is not a runtime state a visitor can be in.
  const debug = computed(() =>
    import.meta.dev
      ? {
          url: props.error?.url,
          statusCode: statusCode.value,
          message: props.error?.message,
          stack: props.error?.stack,
        }
      : undefined,
  );

  useHead({
    title: `${statusCode.value} — grundtone`,
    // An error page must not be indexed under its own url.
    meta: [{ name: 'robots', content: 'noindex' }],
  });
</script>

<template>
  <NuxtLayout>
    <GTErrorPage
      :code="statusCode"
      :title="copy.title"
      :description="copy.description"
      :debug="debug"
      home-href="/"
      home-label="Back to the front page"
    />
  </NuxtLayout>
</template>
