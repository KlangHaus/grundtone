<script setup lang="ts">
  import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { createFocusTrap, type FocusTrap } from '@grundtone/utils';
  import { useEditor, EditorContent, type JSONContent } from '@tiptap/vue-3';
  import { generateHTML } from '@tiptap/html';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import type { AnyExtension } from '@tiptap/core';
  import { isSafeLinkUrl } from './link';
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
  const editorId = `rich-text-${useId()}`;
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
          // ⌘/Ctrl+K opens the link popover (add or edit, depending on
          // context) — matches the prototype's trigger contract.
          handleKeyDown: (_view, event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
              event.preventDefault();
              openLinkPopover();
              return true;
            }
            return false;
          },
        },
        onUpdate: ({ editor: ed }) => {
          editorTick.value++;
          emit('update:modelValue', ed.getJSON());
          emit('update:html', ed.getHTML());
        },
        onFocus: () => emit('focus'),
        onBlur: () => emit('blur'),
        onSelectionUpdate: () => {
          editorTick.value++;
          syncLinkBubble();
        },
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

  onBeforeUnmount(() => {
    linkTrap?.deactivate();
    editor?.value?.destroy();
  });

  // TipTap transactions don't invalidate Vue computeds on their own — the
  // tick is bumped on every update/selection change so canLink + the
  // toolbar's active states re-evaluate.
  const editorTick = ref(0);

  function ed() {
    return editor?.value ?? null;
  }

  // Public escape hatch: consumers (and tests) get the underlying TipTap
  // editor for programmatic control — standard for TipTap wrappers.
  defineExpose({ editor });

  // ── Link popover + bubble (iteration 2, designer anatomy:
  //    docs/design/grundtone/prototypes/gtrichtext-link-popover.html) ────────
  //
  // Popover = the ONE deliberate focus trap in GTRichText (spec §a11y): focus
  // moves into the URL field on open, Tab cycles inside, Enter applies,
  // Escape closes and returns focus to the selection. The compact bubble
  // (caret inside an existing link) is NOT trapped — its ✎ opens the trapped
  // popover.
  const rootEl = ref<HTMLElement | null>(null);
  const popoverEl = ref<HTMLElement | null>(null);
  const urlInputEl = ref<HTMLInputElement | null>(null);

  const linkPopover = ref<{
    open: boolean;
    mode: 'add' | 'edit';
    url: string;
    text: string;
    newTab: boolean;
    showError: boolean;
  }>({
    open: false,
    mode: 'add',
    url: '',
    text: '',
    newTab: false,
    showError: false,
  });

  const bubble = ref<{ open: boolean; href: string }>({
    open: false,
    href: '',
  });
  const overlayPos = ref({ top: 0, left: 0 });
  let linkTrap: FocusTrap | null = null;

  const urlIsValid = computed(() => isSafeLinkUrl(linkPopover.value.url));

  const canLink = computed(() => {
    void editorTick.value;
    const e = ed();
    if (!e) return false;
    return e.isActive('link') || !e.state.selection.empty;
  });

  function positionOverlayAtSelection() {
    const e = ed();
    const root = rootEl.value;
    if (!e || !root) return;
    // coordsAtPos needs real layout APIs (getClientRects) — absent in
    // non-browser environments (tests/SSR hydration edge). Fall back to the
    // toolbar anchor instead of crashing the overlay open.
    try {
      const coords = e.view.coordsAtPos(e.state.selection.from);
      const rect = root.getBoundingClientRect();
      overlayPos.value = {
        top: coords.bottom - rect.top + 6,
        left: Math.max(8, coords.left - rect.left),
      };
    } catch {
      overlayPos.value = { top: 44, left: 8 };
    }
  }

  function syncLinkBubble() {
    const e = ed();
    if (!e || linkPopover.value.open) return;
    if (e.isActive('link') && e.state.selection.empty) {
      bubble.value = { open: true, href: e.getAttributes('link').href ?? '' };
      positionOverlayAtSelection();
    } else {
      bubble.value.open = false;
    }
  }

  function openLinkPopover() {
    const e = ed();
    if (!e || !canLink.value) return;
    bubble.value.open = false;
    const editing = e.isActive('link');
    const attrs = editing ? e.getAttributes('link') : {};
    linkPopover.value = {
      open: true,
      mode: editing ? 'edit' : 'add',
      url: (attrs.href as string) ?? '',
      text: '',
      newTab: attrs.target === '_blank',
      showError: false,
    };
    positionOverlayAtSelection();
    nextTick(() => {
      urlInputEl.value?.focus();
      if (popoverEl.value) {
        linkTrap = createFocusTrap(popoverEl.value);
        linkTrap.activate();
      }
    });
  }

  function closeLinkPopover() {
    linkTrap?.deactivate();
    linkTrap = null;
    linkPopover.value.open = false;
    // Escape/close returns focus to the selection (prototype focus flow).
    ed()?.commands.focus();
  }

  function applyLink() {
    const e = ed();
    if (!e) return;
    if (!urlIsValid.value) {
      linkPopover.value.showError = true;
      return;
    }
    const { url, text, newTab, mode } = linkPopover.value;
    const attrs = {
      href: url.trim(),
      target: newTab ? '_blank' : null,
      rel: newTab ? 'noopener' : null,
    };
    if (mode === 'edit') {
      e.chain().focus().extendMarkRange('link').setLink(attrs).run();
    } else if (text.trim()) {
      // Custom text replaces the selection with a linked text node.
      e.chain()
        .focus()
        .insertContent({
          type: 'text',
          text: text.trim(),
          marks: [{ type: 'link', attrs }],
        })
        .run();
    } else {
      e.chain().focus().setLink(attrs).run();
    }
    linkTrap?.deactivate();
    linkTrap = null;
    linkPopover.value.open = false;
  }

  function unlink() {
    ed()?.chain().focus().extendMarkRange('link').unsetLink().run();
    bubble.value.open = false;
  }

  function onPopoverKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      closeLinkPopover();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      applyLink();
    }
  }

  // ── Toolbar (roving tabindex: ONE tab stop, arrows move) ─────────────────
  interface ToolItem {
    feature: RichTextFeature;
    label: string;
    text: string;
    isActive: () => boolean;
    isDisabled?: () => boolean;
    run: () => void;
  }

  const tools = computed<ToolItem[]>(() => {
    void editorTick.value;
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
        isDisabled: () => !canLink.value,
        run: openLinkPopover,
      });
    return items;
  });

  const rovingIndex = ref(0);
  const toolbarEl = ref<HTMLElement | null>(null);

  function onToolbarKeydown(event: KeyboardEvent) {
    const count = tools.value.length;
    if (count === 0) return;
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (rovingIndex.value + 1) % count;
        break;
      case 'ArrowLeft':
        next = (rovingIndex.value - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    rovingIndex.value = next;
    const buttons =
      toolbarEl.value?.querySelectorAll<HTMLButtonElement>('button');
    buttons?.[next]?.focus();
  }
</script>

<template>
  <div
    ref="rootEl"
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
        ref="toolbarEl"
        :class="`${base}__toolbar`"
        role="toolbar"
        aria-label="Formatering"
        :aria-controls="editorId"
        @keydown="onToolbarKeydown"
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
          :disabled="disabled || t.isDisabled?.()"
          :tabindex="i === rovingIndex ? 0 : -1"
          @click="t.run"
          @focus="rovingIndex = i"
        >
          {{ t.text }}
        </button>
      </div>
      <EditorContent
        v-if="editor"
        :editor="editor"
        :class="`${base}__content`"
      />

      <!-- Compact bubble: caret inside an existing link (not focus-trapped;
           ✎ opens the trapped popover). -->
      <div
        v-if="bubble.open && !linkPopover.open"
        :class="`${base}__bubble`"
        :style="{ top: `${overlayPos.top}px`, left: `${overlayPos.left}px` }"
      >
        <span :class="`${base}__bubble-href`">{{ bubble.href }}</span>
        <a
          :class="`${base}__bubble-action`"
          :href="bubble.href"
          target="_blank"
          rel="noopener"
          aria-label="Åbn link i nyt faneblad"
          >↗</a
        >
        <button
          type="button"
          :class="`${base}__bubble-action`"
          aria-label="Redigér link"
          @click="openLinkPopover"
        >
          ✎
        </button>
        <button
          type="button"
          :class="`${base}__bubble-action`"
          aria-label="Fjern link"
          @click="unlink"
        >
          ⛓️‍💥
        </button>
      </div>

      <!-- Link popover: the ONE deliberate focus trap. -->
      <div
        v-if="linkPopover.open"
        ref="popoverEl"
        :class="`${base}__popover`"
        :style="{ top: `${overlayPos.top}px`, left: `${overlayPos.left}px` }"
        role="dialog"
        aria-label="Link"
        @keydown="onPopoverKeydown"
      >
        <label :class="`${base}__popover-field`">
          <span>URL</span>
          <input
            ref="urlInputEl"
            v-model="linkPopover.url"
            type="text"
            :class="`${base}__popover-input`"
            placeholder="https://…"
            :aria-invalid="
              linkPopover.showError && !urlIsValid ? 'true' : 'false'
            "
          />
        </label>
        <p
          v-if="linkPopover.showError && !urlIsValid"
          :class="`${base}__popover-error`"
          role="alert"
        >
          ⚠ Ugyldig URL — skal starte med https:// eller /
        </p>
        <label
          v-if="linkPopover.mode === 'add'"
          :class="`${base}__popover-field`"
        >
          <span>Tekst (valgfri — bruger selektionen)</span>
          <input
            v-model="linkPopover.text"
            type="text"
            :class="`${base}__popover-input`"
          />
        </label>
        <label :class="`${base}__popover-check`">
          <input v-model="linkPopover.newTab" type="checkbox" />
          <span>Åbn i nyt faneblad <small>(rel=noopener)</small></span>
        </label>
        <div :class="`${base}__popover-actions`">
          <button
            type="button"
            :class="`${base}__popover-btn`"
            @click="closeLinkPopover"
          >
            Annullér
          </button>
          <button
            type="button"
            :class="[`${base}__popover-btn`, `${base}__popover-btn--primary`]"
            @click="applyLink"
          >
            {{ linkPopover.mode === 'edit' ? 'Gem link' : 'Tilføj link' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-rich-text {
    position: relative;
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

      &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
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

    // Link bubble + popover share the anchored-overlay recipe (surface +
    // border + shadow tokens; z-index on the dropdown tier).
    &__bubble,
    &__popover {
      position: absolute;
      z-index: tokens.z-index('dropdown');
      background: tokens.color('surface-raised');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('md');
      box-shadow: tokens.shadow('lg');
    }

    &__bubble {
      display: flex;
      align-items: center;
      gap: tokens.space('xs');
      padding: tokens.space('xs') tokens.space('sm');
      font-size: tokens.font-size('sm');
    }

    &__bubble-href {
      font-family: tokens.font-family('mono');
      color: tokens.color('text-secondary');
      max-inline-size: 16rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__bubble-action {
      border: none;
      background: none;
      cursor: pointer;
      padding: 0 tokens.space('2xs');
      color: tokens.color('text');
      text-decoration: none;
      border-radius: tokens.radius('sm');

      &:hover {
        background: tokens.color('surface-alt');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus');
        outline-offset: 1px;
      }
    }

    &__popover {
      display: flex;
      flex-direction: column;
      gap: tokens.space('sm');
      padding: tokens.space('md');
      min-inline-size: 18rem;
    }

    &__popover-field {
      display: flex;
      flex-direction: column;
      gap: tokens.space('2xs');
      font-size: tokens.font-size('sm');
      font-weight: 600;
    }

    &__popover-input {
      padding: tokens.space('xs') tokens.space('sm');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('sm');
      background: tokens.color('surface');
      color: tokens.color('text');
      font-size: tokens.font-size('sm');

      // Focus recipe — identical to GT-input.
      &:focus-visible {
        outline: none;
        border-color: tokens.color('primary');
        box-shadow: 0 0 0 3px tokens.color('focus-ring');
      }

      &[aria-invalid='true'] {
        border-color: tokens.color('error');
      }
    }

    &__popover-error {
      margin: 0;
      color: tokens.color('error');
      font-size: tokens.font-size('sm');
    }

    &__popover-check {
      display: flex;
      align-items: center;
      gap: tokens.space('xs');
      font-size: tokens.font-size('sm');
    }

    &__popover-actions {
      display: flex;
      justify-content: flex-end;
      gap: tokens.space('xs');
    }

    &__popover-btn {
      padding: tokens.space('xs') tokens.space('md');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('sm');
      background: none;
      color: tokens.color('text');
      font-size: tokens.font-size('sm');
      cursor: pointer;

      &:hover {
        background: tokens.color('surface-alt');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus');
        outline-offset: 2px;
      }

      &--primary {
        background: tokens.color('primary');
        border-color: tokens.color('primary');
        color: var(--color-on-primary, #fff);
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
