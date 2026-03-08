<script setup>
const [isVisible, toggleVisible] = useToggle(true);
</script>

<template>
  <div class="container mx-auto">
    <div class="flex space-x-2 w-65 h-25 items-center">
      <TransitionFade>
        <div
          v-if="isVisible"
          class="box"
        />
      </TransitionFade>

      <TransitionSlide>
        <div
          v-if="isVisible"
          class="box"
        />
      </TransitionSlide>

      <TransitionExpand>
        <div
          v-if="isVisible"
          class="box"
        />
      </TransitionExpand>

      <TransitionScale>
        <div
          v-if="isVisible"
          class="box"
        />
      </TransitionScale>
    </div>

    <button class="button" @click="toggleVisible()">
      Toggle visible
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box {
  width: 100px;
  height: 100px;
  background-color: var(--color-secondary);
  border-radius: 6px;
}

.button {
  margin: 40px;
  padding: 8px 16px;
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border-radius: 6px;
}
</style>
