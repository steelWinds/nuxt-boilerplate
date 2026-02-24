import process from 'node:process';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { locales } from './src/shared/i18n/locales';

// *We detect our own sw.ts file, if it is included in the .env file, then we change the configuration Vite PWA Plugin
const OWN_SW_ENABLED = process.env.OWN_SW === 'true';

const POSTCSS_PX_TO_REM_ROOT_VALUE = 16;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /* =======================
    Nuxt settings
  ======================= */

  compatibilityDate: '2026-02-20',

  devtools: { enabled: true },

  /* =======================
    App settings
  ======================= */

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },

        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      ],
    },
  },

  routeRules: {
    '/': {
      redirect: '/examples/welcome',
    },
    '/examples': {
      redirect: '/examples/welcome',
    },
    '/examples/welcome': {
      swr: 86400, // * SWR with update in 1 day (24 hours)
    },
    '/api/v1/**': {
      cors: true,
      headers: {
        'access-control-allow-methods': 'GET, POST, PUT, DELETE',
      },
    },
  },

  /* =======================
    CSS settings
  ======================= */

  css: [
    './assets/css/tailwind.css',
    // *The preflight styles are imported separately because they would otherwise conflict with our styles.
    './assets/css/preflight.css',
  ],

  postcss: {
    plugins: {
      'postcss-preset-env': {
        stage: 2,
        features: {
          'nesting-rules': true,
          'color-mix': {
            preserve: true,
          },
          'oklab-function': {
            preserve: true,
          },
        },
      },
      // *postcss-pxtorem is required for fluid typography
      'postcss-pxtorem': {
        rootValue: POSTCSS_PX_TO_REM_ROOT_VALUE,
        propList: ['*'],
      },
    },
  },

  vite: {
    plugins: [
      // @ts-expect-error FIX: Vite version mismatch between @nuxt/schema and @tailwindcss/vite
      tailwindcss(),
    ],
  },

  /* =======================
    FSD structure settings
  ======================= */

  alias: {
    '~': fileURLToPath(new URL('./src', import.meta.url)),
    '~server': fileURLToPath(new URL('./server', import.meta.url)),
  },

  srcDir: './src',

  serverDir: './server',

  dir: {
    assets: './app/assets',
    layouts: './app/layouts',
    middleware: './app/middleware',
    modules: './app/modules',
    pages: './app/routes',
    plugins: './app/plugins',
    shared: './shared',
  },

  /* =======================
    Modules settings
  ======================= */

  modules: [
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-swiper',
    'reka-ui/nuxt',
    'motion-v/nuxt',
    [
      '@vee-validate/nuxt',
      {
        autoImports: false,
      },
    ],
  ],

  robots: {
    mergeWithRobotsTxtPath: 'public/_robots.txt',
    robotsTxt: true,
  },

  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
      styles: ['normal', 'italic', 'oblique'],
    },
    providers: {
      // !Fix by https://github.com/nuxt/ui/issues/5547
      fontsource: false,
    },
  },

  // *Disabling the default config for forwarding @antfu/eslint-config
  eslint: {
    config: {
      standalone: false,
    },
  },

  image: {
    format: ['webp'],
  },

  sitemap: {
    sources: [
      '/api/v1/__sitemap__/urls',
    ],
  },

  i18n: {
    locales,
    restructureDir: './src/shared/i18n',
    langDir: './locales',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
  },

  pwa: {
    strategies: OWN_SW_ENABLED ? 'injectManifest' : 'generateSW',
    srcDir: OWN_SW_ENABLED ? './app/service-worker' : undefined,
    filename: OWN_SW_ENABLED ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      start_url: '/examples/pwa',
      name: 'Nuxt-Boilerplate',
      short_name: 'Nuxt-Boilerplate',
      theme_color: '#00DC82',
      display: 'standalone',
      icons: [
        {
          src: 'pwa/pwa-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa/pwa-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa/pwa-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },

    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
    },

    experimental: {
      enableWorkboxPayloadQueryParams: true,
    },

    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },

    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
});
