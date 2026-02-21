<script setup lang="ts"></script>

<template>
  <span class="error-message">
    <slot />
  </span>
</template>

<style scoped>
.error-message {
  display: block;
  color: var(--color-red-800);
  text-align: start;
  overflow-wrap: anywhere;
}
</style>
