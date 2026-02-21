/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',

    // *Enables rules and sets up the custom syntax for .vue files,
    'stylelint-config-recommended-vue',

    // *Enable rules for TailwindCSS v4+
    '@dreamsicle.io/stylelint-config-tailwindcss',
  ],
  rules: {
    // *Fallback for @dreamsicle.io/stylelint-config-tailwindcss
    'declaration-property-value-no-unknown': null,

    // *Allow kebab-case for custom properties
    'custom-property-pattern': ['^(--)?[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$'],

    // *Allow enhanced precision for value and color functions
    'number-max-precision': [
      4,
      { "insideFunctions": { "/^(oklch|oklab|lch|lab)$/": 8 } }
    ]
  },
};
