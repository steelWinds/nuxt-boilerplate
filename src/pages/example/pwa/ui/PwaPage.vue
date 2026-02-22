<!-- eslint-disable no-alert -->
<script setup lang="ts">
const pwa = usePWA();
</script>

<template>
  <div>
    <VitePwaManifest />
    <ClientOnly>
      {{ pwa }}
    </ClientOnly>
  </div>
</template>
