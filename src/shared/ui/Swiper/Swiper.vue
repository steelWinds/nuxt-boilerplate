<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types';

defineProps<{
  options?: Omit<SwiperOptions, 'modules'>
}>();

const containerRef = useTemplateRef<any>('swiper');

onMounted(() => {
  // eslint-disable-next-line no-alert
  alert(containerRef);
});
</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" v-bind="options">
      <slot />
    </swiper-container>
  </ClientOnly>
</template>

<style lang="css">
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-xl);
  height: 20vh;
}
</style>
