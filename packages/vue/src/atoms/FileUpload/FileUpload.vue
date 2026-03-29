<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import { GTIcon } from '../Icon';
  import type { FileUploadProps, SelectedFile } from './types';

  const props = withDefaults(defineProps<FileUploadProps>(), {
    label: undefined,
    helpText: undefined,
    errorText: undefined,
    accept: undefined,
    maxSize: undefined,
    multiple: false,
    disabled: false,
    required: false,
    id: undefined,
  });

  const emit = defineEmits<{
    change: [files: File[]];
    error: [message: string];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-file-upload`);
  const inputBase = computed(() => `${p.value}-input`);
  const inputId = computed(() => props.id ?? generateId('file'));
  const descId = computed(() =>
    props.errorText || props.helpText ? `${inputId.value}-desc` : undefined,
  );

  const files = ref<SelectedFile[]>([]);
  const dragover = ref(false);
  const inputRef = ref<HTMLInputElement | null>(null);

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;

    for (const file of Array.from(fileList)) {
      if (props.maxSize && file.size > props.maxSize) {
        emit(
          'error',
          `${file.name} er for stor (maks ${formatSize(props.maxSize)})`,
        );
        continue;
      }
      files.value.push({ file, id: generateId('f') });
    }

    if (!props.multiple && files.value.length > 1) {
      files.value = [files.value[files.value.length - 1]];
    }

    emit(
      'change',
      files.value.map(f => f.file),
    );
  }

  function removeFile(id: string) {
    files.value = files.value.filter(f => f.id !== id);
    emit(
      'change',
      files.value.map(f => f.file),
    );
  }

  function onDrop(e: Event) {
    const de = e as DragEvent;
    de.preventDefault();
    dragover.value = false;
    if (props.disabled) return;
    addFiles(de.dataTransfer?.files ?? null);
  }

  function onDragOver(e: Event) {
    e.preventDefault();
    if (!props.disabled) dragover.value = true;
  }

  function onDragLeave() {
    dragover.value = false;
  }

  function onClick() {
    if (!props.disabled) inputRef.value?.click();
  }

  function onInputChange(e: Event) {
    addFiles((e.target as HTMLInputElement).files);
    if (inputRef.value) inputRef.value.value = '';
  }
</script>

<template>
  <div :class="`${inputBase}-field`">
    <label v-if="label" :for="inputId" :class="`${inputBase}-label`">
      {{ label }}
    </label>

    <p v-if="helpText && !errorText" :id="descId" :class="`${inputBase}-hint`">
      {{ helpText }}
    </p>
    <p v-if="errorText" :id="descId" :class="`${inputBase}-error`" role="alert">
      {{ errorText }}
    </p>

    <div
      :class="[
        `${base}__dropzone`,
        {
          [`${base}__dropzone--dragover`]: dragover,
          [`${base}__dropzone--error`]: !!errorText,
          [`${base}__dropzone--disabled`]: disabled,
        },
      ]"
      @click="onClick"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <GTIcon name="upload" size="xl" :class="`${base}__icon`" />
      <p :class="`${base}__text`">
        Træk filer hertil eller <span>klik for at vælge</span>
      </p>
      <p v-if="accept || maxSize" :class="`${base}__hint`">
        <template v-if="maxSize">Maks {{ formatSize(maxSize) }}</template>
        <template v-if="accept && maxSize"> · </template>
        <template v-if="accept">{{ accept }}</template>
      </p>

      <input
        :id="inputId"
        ref="inputRef"
        :class="`${base}__input`"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        :required="required && files.length === 0"
        :aria-describedby="descId"
        @change="onInputChange"
      />
    </div>

    <ul v-if="files.length > 0" :class="`${base}__files`">
      <li v-for="f in files" :key="f.id" :class="`${base}__file`">
        <GTIcon name="file" size="sm" :class="`${base}__file-icon`" />
        <span :class="`${base}__filename`">{{ f.file.name }}</span>
        <span :class="`${base}__filesize`">{{ formatSize(f.file.size) }}</span>
        <button
          type="button"
          :class="`${base}__remove`"
          :aria-label="`Fjern ${f.file.name}`"
          @click="removeFile(f.id)"
        >
          &times;
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-file-upload {
    &__dropzone {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: tokens.space('sm');
      padding: tokens.space('2xl') tokens.space('lg');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('lg');
      background: tokens.color('surface-alt');
      cursor: pointer;
      text-align: center;
      transition:
        border-color tokens.duration('fast') tokens.ease('ease'),
        background-color tokens.duration('fast') tokens.ease('ease'),
        box-shadow tokens.duration('fast') tokens.ease('ease');

      &:hover {
        border-color: tokens.color('primary');
        box-shadow: 0 0 0 3px
          color-mix(in srgb, #{tokens.color('primary')} 10%, transparent);
      }

      &--dragover {
        border-color: tokens.color('primary');
        background: color-mix(
          in srgb,
          #{tokens.color('primary')} 6%,
          #{tokens.color('surface-alt')}
        );
        box-shadow: 0 0 0 3px
          color-mix(in srgb, #{tokens.color('primary')} 15%, transparent);
      }

      &--error {
        border-color: tokens.color('error');
      }

      &--disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
    }

    &__icon {
      color: tokens.color('text-secondary');
      opacity: 0.5;
    }

    &__text {
      font-size: tokens.font-size('sm');
      font-weight: tokens.font-weight('medium');
      color: tokens.color('text');

      span {
        color: tokens.color('primary');
        text-decoration: underline;
      }
    }

    &__hint {
      font-size: tokens.font-size('xs');
      color: tokens.color('text-secondary');
    }

    &__input {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      overflow: hidden;
    }

    &__files {
      display: flex;
      flex-direction: column;
      gap: tokens.space('xs');
      margin-top: tokens.space('sm');
      list-style: none !important;
      padding: 0 !important;
    }

    &__file {
      display: flex;
      align-items: center;
      gap: tokens.space('sm');
      padding: tokens.space('sm') tokens.space('md');
      background: tokens.color('surface');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('md');
      font-size: tokens.font-size('sm');
      list-style: none;
      margin: 0;
      transition: background-color tokens.duration('fast') tokens.ease('ease');

      &::before,
      &::marker {
        content: none;
      }

      &:hover {
        background: tokens.color('surface-alt');
      }
    }

    &__file-icon {
      color: tokens.color('success');
      flex-shrink: 0;
    }

    &__filename {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: tokens.color('text');
      font-weight: tokens.font-weight('medium');
    }

    &__filesize {
      color: tokens.color('text-secondary');
      font-size: tokens.font-size('xs');
      white-space: nowrap;
    }

    &__remove {
      background: none;
      border: none;
      cursor: pointer;
      color: tokens.color('text-secondary');
      font-size: tokens.font-size('sm');
      padding: tokens.space('xs');
      border-radius: tokens.radius('sm');
      line-height: 1;
      transition: color tokens.duration('fast') tokens.ease('ease');

      &:hover {
        color: tokens.color('error');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
      }
    }
  }
</style>
