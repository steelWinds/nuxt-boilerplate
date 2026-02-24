<script setup lang="ts">
import { useCounterStore } from '~/entities/example/store/counter.store';

const counterStore = useCounterStore();
</script>

<template>
  <div class="container flex flex-col items-center mx-auto space-y-4 p-2">
    <div class="px-2 text-primary bg-secondary rounded-md text-2xl w-25 text-center">
      {{ counterStore.counter }}
    </div>

    <button class="p-2 px-6 bg-secondary rounded-md text-primary font-bold" @click="counterStore.increaseCounter()">
      Increase
    </button>

    <button class="p-2 px-6 bg-secondary rounded-md text-primary font-bold" @click="counterStore.decreaseCounter()">
      Decrease
    </button>
  </div>
</template>
