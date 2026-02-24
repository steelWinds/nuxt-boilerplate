<script setup lang="ts">
import type { MaskInputOptions } from 'maska';
import type { InputTypeHTMLAttribute } from 'vue';
import { vMaska } from 'maska/vue';
import { useField } from 'vee-validate';
import { ErrorMessage } from '~/shared/ui/ErrorMessage';

interface Props {
  name: string
  maskOptions?: MaskInputOptions
  placeholder?: string
  label?: string
  isError?: boolean
  errorMessage?: string
  type?: InputTypeHTMLAttribute
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  label: '',
  isError: false,
  errorMessage: '',
  type: 'text',
});

const fieldId = computed(() => `${props.name}-${useId()}`);

const { value, errorMessage, meta, handleChange } = useField<string | number>(props.name);

const isError = computed(() => !meta.valid && meta.touched);

const computedMaskaOptions = reactive<MaskInputOptions>({
  ...(props.maskOptions ?? {}),
  eager: true,
  onMaska(detail) {
    handleChange(detail.unmasked);
  },
});
</script>

<template>
  <div class="inline-flex flex-col">
    <label class="w-full flex space-x-2" :for="fieldId">
      <span v-show="label">
        {{ label }}:
      </span>

      <input
        :id="fieldId"
        v-maska="computedMaskaOptions"
        :placeholder
        :value
        :type
        class="border-2"
      >
    </label>

    <ErrorMessage v-show="isError" class="mt-2">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>
