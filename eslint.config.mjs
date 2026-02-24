import antfu from '@antfu/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  antfu(
    {
      type: 'app',
      typescript: true,
      gitignore: true,
      vue: {
        version: 3,
        a11y: true,
      },
      formatters: {
        css: true,
        html: true,
        markdown: 'prettier',
      },
    },
    {
      rules: {
        'style/indent': ['error', 2],
        'style/quotes': ['error', 'single', { avoidEscape: true }],
        'style/semi': ['error', 'always'],
        'style/comma-dangle': ['error', 'always-multiline'],
        'style/object-curly-spacing': ['error', 'always'],
        'style/array-bracket-spacing': ['error', 'never'],
        'style/space-in-parens': ['error', 'never'],
        'style/keyword-spacing': ['error', { before: true, after: true }],
        'style/arrow-spacing': ['error', { before: true, after: true }],
        'style/eol-last': ['error', 'always'],
        'style/no-trailing-spaces': 'error',

        'no-console': 'warn',
        'no-debugger': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'object-shorthand': ['error', 'always'],

        'vue-a11y/label-has-for': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.css', '**/*.vue', '**/*.html'],
      rules: {
        'style/max-len': [
          'error',
          {
            code: 120,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
          },
        ],
      },
    },
  ),
);
