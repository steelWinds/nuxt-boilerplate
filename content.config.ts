import { defineCollection, defineContentConfig } from '@nuxt/content';
import { z } from 'zod';

export default defineContentConfig({
  collections: {
    static_ru: defineCollection({
      type: 'data',
      source: 'static/ru/**/*.json',
      schema: z.object({
        meta: z.object({
          hello_world: z.string(),
          plugged_modules: z.array(z.object({
            src: z.string(),
            alt: z.string(),
            href: z.string(),
          })),
          examples_links: z.array(z.object({
            title: z.string(),
            href: z.string(),
          })),
        }),
      }),
    }),
    static_en: defineCollection({
      type: 'data',
      source: 'static/en/**/*.json',
      schema: z.object({
        meta: z.object({
          hello_world: z.string(),
          plugged_modules: z.array(z.object({
            src: z.string(),
            alt: z.string(),
            href: z.string(),
          })),
          examples_links: z.array(z.object({
            title: z.string(),
            href: z.string(),
          })),
        }),
      }),
    }),
  },
});
