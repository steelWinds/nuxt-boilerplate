<script setup lang="ts">
import { useLocaleQueryCollectionData } from '~/shared/composables';
import DecryptedText from './DecryptedText.vue';
import Link from './Link.vue';
import LogoLoop from './LogoLoop.vue';

const { locale, defaultLocale } = useI18n();

const { data } = await useAsyncData(
  async () => useLocaleQueryCollectionData(
    'static',
    ({ builder, path }) => builder.where('stem', '=', `${path}/example`).first(),
    locale.value,
    defaultLocale,
  ),
  { watch: [locale], server: false },
);

const logosImages = computed(() => data?.value?.meta?.plugged_modules ?? []);
</script>

<template>
  <div>
    <ClientOnly>
      <div class="relative w-full h-screen bg-primary grid content-start">
        <div class="w-full h-full overflow-auto relative z-1">
          <div class="grid justify-items-center w-full max-w-100 p-6 mx-auto">
            <NuxtImg
              class="welcome-page-logo cursor-target"
              src="/images/logo.png"
            />

            <div class="w-full relative overflow-hidden mt-12 rounded-md cursor-target">
              <LogoLoop
                :logos="logosImages"
                :speed="50"
                :logo-height="46"
                :gap="20"
                :pause-on-hover="false"
                :scale-on-hover="true"
                fade-out
                fade-out-color="#0f172b"
                aria-label="Plugged Modules"
              />
            </div>

            <DecryptedText
              text="Nuxt Boilerplate"
              :speed="80"
              :max-iterations="25"
              :sequential="true"
              reveal-direction="center"
              characters="01"
              animate-on="view"
              class="cursor-target mt-4 text-24 text-center w-62 overflow-hidden"
              class-name="text-white !whitespace-nowrap"
              encrypted-class-name="text-secondary"
            />

            <ul class="flex flex-wrap justify-center mt-4">
              <li v-for="{ title, href } of data?.meta?.examples_links" :key="title">
                <Link :to="href" class="cursor-target mr-2 mb-2">
                  {{ title }}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.welcome-page-logo {
  width: 100%;
  max-width: 264px;
  object-fit: cover;
  aspect-ratio: 16 / 9;

  @media (--breakpoint-xl) {
    max-width: 100%;
  }
}
</style>
