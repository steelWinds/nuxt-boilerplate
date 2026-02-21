<script setup lang="ts" generic="T extends ObjectSchema<any, any>">
import type { InferInput, ObjectSchema } from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';
import { useForm } from 'vee-validate';

interface Props {
  validationSchema: T
  initialValues?: Partial<InferInput<T>>
}

interface Emit {
  submit: [InferInput<T>]
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(props.validationSchema),
  initialValues: props.initialValues as any,
});

const onSubmit = handleSubmit(values => emit('submit', values));
</script>

<template>
  <form @submit="onSubmit">
    <slot />
  </form>
</template>
