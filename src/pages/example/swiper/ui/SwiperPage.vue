<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { Swiper } from '~/shared/ui/Swiper';
</script>

<template>
  <div>
    <Swiper
      :options="{
        autoplay: {
          delay: 500,
        },
        spaceBetween: 24,
        slidesPerView: 3,
        loop: true,
      }"
      class="container mx-auto bg-primary p-8"
    >
      <swiper-slide v-for="i of 10" :key="i" class="bg-secondary">
        {{ i }}
      </swiper-slide>
    </Swiper>
  </div>
</template>
