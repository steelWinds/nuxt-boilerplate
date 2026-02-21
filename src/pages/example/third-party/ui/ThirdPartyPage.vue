<!-- eslint-disable no-alert -->
<script setup lang="ts">
const pwa = usePWA();

watch(() => pwa?.offlineReady, offlineReady => offlineReady && alert('Offline Ready!'));
</script>

<template>
  <div>
    <VitePwaManifest />
    <ClientOnly>
      {{ pwa }}
    </ClientOnly>
  </div>
</template>
