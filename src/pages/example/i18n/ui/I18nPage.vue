<!-- eslint-disable no-alert -->
<script setup lang="ts">
const { locales } = useI18n();

const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div class="p-4 flex place-items-start space-x-2">
    <NuxtLink
      v-for="locale in locales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class="p-2 bg-secondary rounded-md text-primary font-bold"
    >
      {{ locale.code }}
    </NuxtLink>
  </div>
</template>
