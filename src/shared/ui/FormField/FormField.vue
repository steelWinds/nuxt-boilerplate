<script setup lang="ts">
import { useField } from 'vee-validate';

interface Props {
  name: string
}

const props = defineProps<Props>();

const id = computed(() => `${props.name}-${useId()}`);

const { value, errorMessage, meta } = useField<string | number>(props.name);

const isError = computed(() => !meta.valid && meta.touched);
</script>

<template>
  <slot
    :id
    :value
    :is-error
    :error-message
  />
</template>
