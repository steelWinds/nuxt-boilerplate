<template>
  <NuxtLinkLocale class="link">
    <slot />
  </NuxtLinkLocale>
</template>

<style scoped>
.link {
  display: flex;
  place-content: center;
  padding: 12px 24px;
  font-size: var(--text-16);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-md);
  transition: all var(--default-transition-duration) var(--default-transition-timing-function);
  background: var(--color-secondary);

  &:hover {
    background: --alpha(var(--color-secondary) / 80%);
    transform: translateY(-1px);
    box-shadow: 0 6px 18px --alpha(var(--color-secondary) / 25%);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 10px --alpha(var(--color-secondary) / 20%);
  }
}
</style>
