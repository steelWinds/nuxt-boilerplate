<!-- eslint-disable no-alert -->
<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <div>
    {{ config.public }}
  </div>
</template>
