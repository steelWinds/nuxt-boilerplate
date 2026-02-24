<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types';

defineProps<{
  options?: Omit<SwiperOptions, 'modules'>
}>();
</script>

<template>
  <ClientOnly>
    <swiper-container v-bind="options">
      <slot />
    </swiper-container>
  </ClientOnly>
</template>

<style>
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-xl);
  height: 20vh;
}
</style>
