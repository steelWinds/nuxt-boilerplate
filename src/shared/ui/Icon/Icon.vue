<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  filled?: boolean
}>(), { filled: false });

const icon = ref<string | Record<string, any>>('');

let hasStroke = false;

async function getIcon() {
  try {
    const iconsImport = import.meta.glob('@/app/assets/icons/**/**.svg', {
      eager: false,
      query: '?raw',
      import: 'default',
    });

    const rawIcon = await iconsImport[`/app/assets/icons/${props.name}.svg`]!() as any;

    if (rawIcon.includes('stroke')) {
      hasStroke = true;
    }

    icon.value = rawIcon;
  }
  catch {
    console.error(
      `Icon '${props.name}' doesn't exist in '@/app/assets/icons'`,
    );
  }
}

await getIcon();

watchEffect(getIcon);
</script>

<template>
  <span
    class="icon"
    :class="{ 'icon--fill': !filled, 'icon--stroke': hasStroke && !filled }"
    v-html="icon"
  />
</template>

<style scoped>
.icon {
  :deep(svg) {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    margin: 0;
  }
}

.icon.icon--fill {
  fill: currentcolor !important;

  :deep(*) {
    fill: currentcolor !important;
  }
}

.icon.icon--stroke {
  stroke: currentcolor !important;

  :deep(*) {
    stroke: currentcolor !important;
  }
}
</style>
