export default {
  plugins: ['stylelint-scss'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.scss', '**/*.css'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    // Basic rules
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global', 'slotted'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
    
    // SCSS specific
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    
    // Code quality
    'max-nesting-depth': 4,
    'selector-max-compound-selectors': 4,
  },
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    'coverage/**/*',
    '.turbo/**/*',
    'TEMPLATES/**/*',
  ],
};