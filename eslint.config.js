import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
  // Base JavaScript configuration
  js.configs.recommended,
  
  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        require: 'readonly',
        defineNuxtConfig: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        PointerEvent: 'readonly',
        HTMLCanvasElement: 'readonly',
        MouseEvent: 'readonly',
        Node: 'readonly',
        ResizeObserver: 'readonly',
        EventTarget: 'readonly',
        Element: 'readonly',
        CSS: 'readonly',
        getComputedStyle: 'readonly',
        requestAnimationFrame: 'readonly',
        MutationObserver: 'readonly',
        IntersectionObserver: 'readonly',
        IntersectionObserverEntry: 'readonly',
        MediaQueryList: 'readonly',
        MediaQueryListEvent: 'readonly',
        Event: 'readonly',
        CustomEvent: 'readonly',
        KeyboardEvent: 'readonly',
        NodeListOf: 'readonly',
        ParentNode: 'readonly',
        EventListener: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLButtonElement: 'readonly',
        alert: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off', // Use TypeScript version instead
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  
  // Vue files - use flat config format
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        MouseEvent: 'readonly',
        FocusEvent: 'readonly',
        KeyboardEvent: 'readonly',
        PointerEvent: 'readonly',
        Event: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        MediaQueryList: 'readonly',
        MediaQueryListEvent: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'vue/multi-word-component-names': 'off', // Allow single-word component names
    },
  },
  
  // JavaScript files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        require: 'readonly',
        module: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'error',
    },
  },
  
  // Test files
  {
    files: ['**/*.{test,spec}.{js,ts,jsx,tsx,vue}'],
    rules: {
      'no-console': 'off',
    },
  },

  // Nuxt playground auto-imports (composables + validators + globals)
  {
    files: ['apps/playground/nuxt/**/*.{vue,ts}'],
    languageOptions: {
      globals: {
        useField: 'readonly',
        useFormValidation: 'readonly',
        useTheme: 'readonly',
        required: 'readonly',
        email: 'readonly',
        phone: 'readonly',
        cpr: 'readonly',
        cvr: 'readonly',
        minLength: 'readonly',
        maxLength: 'readonly',
        pattern: 'readonly',
        url: 'readonly',
        composeValidators: 'readonly',
        defineNuxtPlugin: 'readonly',
        defineNuxtConfig: 'readonly',
      },
    },
  },

  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.nuxt/**',
      '.output/**',
      '**/.nuxt/**',
      '**/.output/**',
      'docs/.vitepress/dist/**',
      'docs/.vitepress/cache/**',
      '**/*.d.ts',
      'apps/*/dist/**',
      'packages/*/dist/**',
    ],
  },
];