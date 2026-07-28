<script setup lang="ts">
  import { computed, watch, onBeforeUnmount } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import { useEditor, EditorContent, type JSONContent } from '@tiptap/vue-3';
  import { generateHTML } from '@tiptap/html';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import type { AnyExtension } from '@tiptap/core';
  import type { RichTextProps, RichTextFeature } from './types';

  const props = withDefaults(defineProps<RichTextProps>(), {
    modelValue: null,
    placeholder: '',
    readonly: false,
    disabled: false,
    error: false,
    ariaLabel: undefined,
    features: () => [
      'bold',
      'italic',
      'code',
      'heading',
      'bulletList',
      'orderedList',
      'link',
    ],
  });

  const emit = defineEmits<{
    'update:modelValue': [value: JSONContent];
    'update:html': [value: string];
    focus: [];
    blur: [];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-rich-text`);
  const editorId = generateId('rich-text');
  const has = (f: RichTextFeature) => props.features.includes(f);

  // The extension set IS the schema — and the schema IS the paste allow-list.
  // Anything not enabled here can neither be typed nor pasted in. StarterKit
  // nodes/marks outside our feature set are explicitly disabled.
  const extensions = computed<AnyExtension[]>(() => [
    StarterKit.configure({
      heading: has('heading') ? { levels: [2, 3] } : false,
      bold: has('bold') ? {} : false,
      italic: has('italic') ? {} : false,
      code: has('code') ? {} : false,
      bulletList: has('bulletList') ? {} : false,
      orderedList: has('orderedList') ? {} : false,
      link: has('link') ? { openOnClick: false, autolink: true } : false,
      // Deliberately out of the v1 feature set:
      strike: false,
      codeBlock: false,
      blockquote: false,
      horizontalRule: false,
      underline: false,
    }) as AnyExtension,
    Placeholder.configure({ placeholder: props.placeholder }),
  ]);

  const isInvalid = computed(
    () => props.error !== false && props.error !== undefined,
  );
  const describedById = computed(() =>
    typeof props.error === 'string' ? props.error : undefined,
  );

  // Readonly renders as pure static HTML from the JSON — no editor, no client
  // JS needed, SSR-clean (the CMS/blog display path). generateHTML runs the
  // same schema, so output matches what the editor would produce.
  const staticHtml = computed(() =>
    props.modelValue ? generateHTML(props.modelValue, extensions.value) : '',
  );

  // The live editor is only created for the editable path (client-side).
  const editor = props.readonly
    ? null
    : useEditor({
        content: props.modelValue ?? undefined,
        editable: !props.disabled,
        extensions: extensions.value,
        editorProps: {
          attributes: {
            role: 'textbox',
            'aria-multiline': 'true',
            'aria-label': props.ariaLabel ?? '',
            'aria-invalid': isInvalid.value ? 'true' : 'false',
            ...(describedById.value
              ? { 'aria-describedby': describedById.value }
              : {}),
            id: editorId,
            class: `${base.value}__editor`,
          },
        },
        onUpdate: ({ editor: ed }) => {
          emit('update:modelValue', ed.getJSON());
          emit('update:html', ed.getHTML());
        },
        onFocus: () => emit('focus'),
        onBlur: () => emit('blur'),
      });

  // External model changes → sync into the editor without emitting a loop.
  watch(
    () => props.modelValue,
    value => {
      const ed = editor?.value;
      if (!ed) return;
      if (JSON.stringify(ed.getJSON()) !== JSON.stringify(value ?? {})) {
        ed.commands.setContent(value ?? '', { emitUpdate: false });
      }
    },
  );

  watch(
    () => props.disabled,
    d => editor?.value?.setEditable(!d),
  );

  onBeforeUnmount(() => editor?.value?.destroy());

  // ── Toolbar ────────────────────────────────────────────────────────────────
  interface ToolItem {
    feature: RichTextFeature;
    label: string;
    text: string;
    isActive: () => boolean;
    run: () => void;
  }

  function ed() {
    return editor?.value ?? null;
  }

  function promptLink() {
    const e = ed();
    if (!e) return;
    if (e.isActive('link')) {
      e.chain().focus().unsetLink().run();
      return;
    }
    // v1 interim — a proper GT link-popover (focus-trapped) is the follow-up.
    const url = window.prompt('Link-URL');
    if (url) e.chain().focus().setLink({ href: url }).run();
  }

  const tools = computed<ToolItem[]>(() => {
    const e = ed();
    const items: ToolItem[] = [];
    if (has('bold'))
      items.push({
        feature: 'bold',
        label: 'Fed',
        text: 'B',
        isActive: () => !!e?.isActive('bold'),
        run: () => e?.chain().focus().toggleBold().run(),
      });
    if (has('italic'))
      items.push({
        feature: 'italic',
        label: 'Kursiv',
        text: 'I',
        isActive: () => !!e?.isActive('italic'),
        run: () => e?.chain().focus().toggleItalic().run(),
      });
    if (has('code'))
      items.push({
        feature: 'code',
        label: 'Kode',
        text: '<>',
        isActive: () => !!e?.isActive('code'),
        run: () => e?.chain().focus().toggleCode().run(),
      });
    if (has('heading')) {
      items.push({
        feature: 'heading',
        label: 'Overskrift 2',
        text: 'H2',
        isActive: () => !!e?.isActive('heading', { level: 2 }),
        run: () => e?.chain().focus().toggleHeading({ level: 2 }).run(),
      });
      items.push({
        feature: 'heading',
        label: 'Overskrift 3',
        text: 'H3',
        isActive: () => !!e?.isActive('heading', { level: 3 }),
        run: () => e?.chain().focus().toggleHeading({ level: 3 }).run(),
      });
    }
    if (has('bulletList'))
      items.push({
        feature: 'bulletList',
        label: 'Punktliste',
        text: '•',
        isActive: () => !!e?.isActive('bulletList'),
        run: () => e?.chain().focus().toggleBulletList().run(),
      });
    if (has('orderedList'))
      items.push({
        feature: 'orderedList',
        label: 'Nummereret liste',
        text: '1.',
        isActive: () => !!e?.isActive('orderedList'),
        run: () => e?.chain().focus().toggleOrderedList().run(),
      });
    if (has('link'))
      items.push({
        feature: 'link',
        label: 'Link',
        text: '🔗',
        isActive: () => !!e?.isActive('link'),
        run: promptLink,
      });
    return items;
  });
</script>

<template>
  <div
    :class="[
      base,
      {
        [`${base}--readonly`]: readonly,
        [`${base}--disabled`]: !readonly && disabled,
        [`${base}--error`]: !readonly && isInvalid,
      },
    ]"
  >
    <!-- Readonly / SSR: pure static HTML, no editor. -->
    <div v-if="readonly" :class="`${base}__readonly`" v-html="staticHtml" />

    <!-- Editable: toolbar + live editor. -->
    <template v-else>
      <div
        :class="`${base}__toolbar`"
        role="toolbar"
        aria-label="Formatering"
        :aria-controls="editorId"
      >
        <button
          v-for="(t, i) in tools"
          :key="`${t.feature}-${i}`"
          type="button"
          :class="[
            `${base}__tool`,
            { [`${base}__tool--active`]: t.isActive() },
          ]"
          :aria-label="t.label"
          :aria-pressed="t.isActive() ? 'true' : 'false'"
          :disabled="disabled"
          @click="t.run"
        >
          {{ t.text }}
        </button>
      </div>
      <EditorContent
        v-if="editor"
        :editor="editor"
        :class="`${base}__content`"
      />
    </template>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-rich-text {
    border: 1px solid tokens.color('border-medium');
    border-radius: tokens.radius('md');
    background: tokens.color('surface-raised');

    &__toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: tokens.space('xs');
      padding: tokens.space('xs');
      border-block-end: 1px solid tokens.color('border-light');
    }

    &__tool {
      min-inline-size: 2rem;
      block-size: 2rem;
      padding: 0 tokens.space('xs');
      border: 1px solid transparent;
      border-radius: tokens.radius('sm');
      background: none;
      color: tokens.color('text');
      font-family: tokens.font-family('mono');
      font-size: tokens.font-size('sm');
      cursor: pointer;

      &:hover {
        background: tokens.color('surface-alt');
      }

      &--active {
        background: color-mix(
          in srgb,
          tokens.color('primary') 14%,
          transparent
        );
        color: tokens.color('primary');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus');
        outline-offset: 2px;
      }
    }

    &__content,
    &__readonly {
      padding: tokens.space('md');
      color: tokens.color('text');
    }

    &__content .ProseMirror {
      outline: none;
      min-block-size: 6rem;

      // Placeholder for the empty document.
      p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        color: tokens.color('text-tertiary');
        float: inline-start;
        block-size: 0;
        pointer-events: none;
      }
    }

    // Focus recipe — identical to GT-input (2px primary + 3px focus-ring).
    &:focus-within {
      border-color: tokens.color('primary');
      box-shadow: 0 0 0 3px tokens.color('focus-ring');
    }

    &--error {
      border-color: tokens.color('error');
    }

    &--disabled {
      opacity: 0.55;
      pointer-events: none;
    }
  }
</style>
