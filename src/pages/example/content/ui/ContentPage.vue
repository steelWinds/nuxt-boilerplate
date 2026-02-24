<script setup lang="ts">
import { useLocaleQueryCollectionData } from '~/shared/composables';

const { locale, defaultLocale, locales } = useI18n();

const switchLocalePath = useSwitchLocalePath();

const { data } = await useAsyncData(
  async () => useLocaleQueryCollectionData(
    'static',
    ({ builder, path }) => builder.where('stem', '=', `${path}/example`).first(),
    locale.value,
    defaultLocale,
  ),
  { watch: [locale], server: false },
);

const json = computed(() => JSON.stringify(data?.value?.meta ?? {}, null, 2));
</script>

<template>
  <div class="p-2">
    <div class="flex space-x-2 items-center">
      <NuxtLink
        v-for="currentLocale in locales"
        :key="currentLocale.code"
        :to="switchLocalePath(currentLocale.code)"
        class="p-2 px-6 bg-secondary rounded-md text-primary font-bold inline-flex"
      >
        {{ currentLocale.code }}
      </NuxtLink>
    </div>

    <pre>
      {{ json }}
    </pre>
  </div>
</template>
