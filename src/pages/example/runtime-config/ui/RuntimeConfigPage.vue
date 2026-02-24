<!-- eslint-disable no-alert -->
<script setup lang="ts">
const config = useRuntimeConfig();

const json = computed(() => JSON.stringify(config.public ?? {}, null, 2));
</script>

<template>
  <div>
    <pre>
      {{ json }}
    </pre>
  </div>
</template>
