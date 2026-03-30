import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettierConfig from 'eslint-config-prettier';

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
        ...globals.browser,
        ...globals.node,
        defineNuxtConfig: 'readonly',
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
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-undef': 'off',
    },
  },

  // Vue files
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
        ...globals.browser,
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
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'vue/multi-word-component-names': 'off',
      'no-undef': 'off',
    },
  },

  // JavaScript files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
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

  // Scripts (Node.js utilities)
  {
    files: ['**/scripts/**/*.{js,ts,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Nuxt playground auto-imports
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

  // Disable ESLint rules that conflict with Prettier
  prettierConfig,

  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.nuxt/**',
      '.output/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.vitepress/dist/**',
      '**/.vitepress/cache/**',
      '**/*.d.ts',
      'apps/*/dist/**',
      'packages/*/dist/**',
      'packages/design-system/apps/**',
      'apps/playground/*/dist/**',
      'packages/vue/test-*.mjs',
    ],
  },
];
