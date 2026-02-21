import antfu from '@antfu/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  antfu(
    {
      basePath: '/',
      type: 'app',
      typescript: true,
      vue: {
        a11y: true,
      },
    },
    {
      rules: {
        'style/semi': ['error', 'always'],
        'vue-a11y/label-has-for': 'off',
      },
    },
  ),
);
