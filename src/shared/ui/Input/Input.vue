<script setup lang="ts">
import type { MaskInputOptions } from 'maska';
import { vMaska } from 'maska/vue';
import { ErrorMessage } from '~/shared/ui/ErrorMessage';

interface Props {
  id: string
  maskOptions?: MaskInputOptions
  placeholder?: string
  label?: string
  isError?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  label: '',
  isError: false,
  errorMessage: '',
});

const model = defineModel<string>();

const computedMaskaOptions = reactive<MaskInputOptions>({
  ...(props.maskOptions ?? {}),
  eager: true,
  onMaska(detail) {
    model.value = detail.unmasked;
  },
});
</script>

<template>
  <div class="input">
    <label class="input-wrapper" :for="id">
      <input
        :id="id"
        v-maska="computedMaskaOptions"
        :placeholder
        :value="model"
        type="text"
        class="input-el"
      >

      <span class="input-label">
        {{ label }}
      </span>
    </label>

    <ErrorMessage v-show="isError">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>
