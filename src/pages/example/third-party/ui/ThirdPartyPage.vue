<script setup lang="ts">
const { onLoaded } = useScriptNpm({
  packageName: 'js-confetti',
  file: 'dist/js-confetti.browser.js',
  version: '0.12.0',
  scriptOptions: {
    use() {
      // @ts-expect-error For third-party script
      return { JSConfetti: window.JSConfetti };
    },
  },
});

onLoaded(({ JSConfetti }) => {
  const confetti = new JSConfetti();

  confetti.addConfetti({ emojis: ['⚡️'] });
});
</script>

<template>
  <div>
    Confetti!
  </div>
</template>
