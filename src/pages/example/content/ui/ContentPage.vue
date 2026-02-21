<script setup lang="ts">
import { useLocaleQueryCollectionData } from '~/shared/composables/useLocaleQueryCollectionData';

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
</script>

<template>
  <div>
    {{ data?.meta }}
  </div>
</template>
